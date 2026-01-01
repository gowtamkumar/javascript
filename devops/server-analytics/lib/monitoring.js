const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Execute command either via SSH or locally
 * @param {Object|null} ssh - SSH connection object (null for local mode)
 * @param {string} command - Command to execute
 * @returns {Promise<{stdout: string, stderr: string}>}
 */
async function execCommand(ssh, command) {
  if (ssh) {
    // Remote mode via SSH
    const result = await ssh.execCommand(command);
    return { stdout: result.stdout, stderr: result.stderr };
  } else {
    // Local mode
    return await execPromise(command);
  }
}

/**
 * Get CPU usage percentage
 */
async function getCPUUsage(ssh) {
  try {
    const result = await execCommand(ssh, "top -b -n1 | grep 'Cpu(s)'");
    const cpuMatch = result.stdout.match(/(\d+\.\d+)%id/);
    const cpuUsage = cpuMatch ? 100 - parseFloat(cpuMatch[1]) : null;
    return cpuUsage !== null ? cpuUsage.toFixed(2) + "%" : "N/A";
  } catch (err) {
    return "Error: " + err.message;
  }
}

/**
 * Get memory usage
 */
async function getMemoryUsage(ssh) {
  try {
    const result = await execCommand(ssh, "free -m");
    const memLines = result.stdout.split("\n");
    const memParts = memLines[1].split(/\s+/);
    return {
      total: parseInt(memParts[1]) + "MB",
      used: parseInt(memParts[2]) + "MB",
      free: parseInt(memParts[3]) + "MB",
      available: memParts[6] ? parseInt(memParts[6]) + "MB" : "N/A"
    };
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Get disk usage
 */
async function getDiskUsage(ssh) {
  try {
    const result = await execCommand(ssh, "df -h --output=source,size,used,avail,pcent,target -x tmpfs -x devtmpfs");
    const diskLines = result.stdout.split("\n").slice(1).filter(line => line.trim());
    return diskLines.map(line => {
      const parts = line.split(/\s+/);
      return {
        filesystem: parts[0],
        size: parts[1],
        used: parts[2],
        available: parts[3],
        usage: parts[4],
        mount: parts[5]
      };
    });
  } catch (err) {
    return [{ error: err.message }];
  }
}

/**
 * Get Docker container statistics
 */
async function getDockerStats(ssh) {
  try {
    const result = await execCommand(ssh, "docker stats --no-stream --format '{{.Name}}: {{.CPUPerc}} {{.MemUsage}}'");
    if (!result.stdout) return [];

    return result.stdout.split("\n").filter(line => line.trim()).map(line => {
      const [name, cpu, mem] = line.split(/: | /).filter(Boolean);
      return { name, cpu, mem };
    });
  } catch (err) {
    return [];
  }
}

/**
 * Get all Docker containers (running and stopped)
 */
async function getAllContainers(ssh) {
  try {
    const result = await execCommand(ssh, "docker ps -a --format '{{.Names}} || {{.Status}} || {{.Image}}'");
    if (!result.stdout) return [];

    return result.stdout.split("\n").filter(line => line.trim()).map(line => {
      const [name, status, image] = line.split(" || ");
      return { name, status, image };
    });
  } catch (err) {
    return [];
  }
}

/**
 * Get Docker container internal processes
 */
async function getContainerProcesses(ssh, containerName) {
  try {
    const result = await execCommand(ssh, `docker top ${containerName}`);
    return result.stdout;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

/**
 * Get Docker container logs
 */
async function getContainerLogs(ssh, containerName, lines = 50) {
  try {
    const result = await execCommand(ssh, `docker logs --tail ${lines} ${containerName} 2>&1`);
    return result.stdout || result.stderr;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

/**
 * Get PM2 processes
 */
async function getPM2Processes(ssh) {
  try {
    const result = await execCommand(ssh, "bash -l -c 'pm2 jlist'");
    if (!result.stdout) return [];

    const processes = JSON.parse(result.stdout);
    return processes.map(proc => ({
      name: proc.name,
      id: proc.pm_id,
      status: proc.pm2_env.status,
      cpu: proc.monit.cpu + "%",
      memory: (proc.monit.memory / 1024 / 1024).toFixed(1) + "MB",
      uptime: Math.floor((new Date().getTime() - proc.pm2_env.pm_uptime) / 1000) + "s"
    }));
  } catch (err) {
    return [];
  }
}

/**
 * Get top processes by CPU/Memory
 */
async function getTopProcesses(ssh, count = 10) {
  try {
    const result = await execCommand(ssh, `ps -eo pid,user,%cpu,%mem,command --sort=-%cpu | head -n ${count + 1}`);
    const lines = result.stdout.split("\n").slice(1).filter(line => line.trim());

    return lines.map(line => {
      const parts = line.trim().split(/\s+/);
      return {
        pid: parts[0],
        user: parts[1],
        cpu: parts[2] + "%",
        mem: parts[3] + "%",
        command: parts.slice(4).join(" ")
      };
    });
  } catch (err) {
    return [];
  }
}

/**
 * Get service status (NGINX, Docker, PHP-FPM, etc.)
 */
async function getServiceStatus(ssh, services = ['nginx', 'docker']) {
  const statuses = {};

  for (const service of services) {
    try {
      const result = await execCommand(ssh, `systemctl is-active ${service}`);
      statuses[service] = result.stdout.trim() === 'active' ? 'active' : 'inactive';
    } catch (err) {
      statuses[service] = 'not found';
    }
  }

  return statuses;
}

/**
 * Get network statistics (vnstat)
 */
async function getNetworkStats(ssh) {
  try {
    const result = await execCommand(ssh, "vnstat --json");
    if (!result.stdout) return "vnstat not installed or no data";

    const data = JSON.parse(result.stdout);
    return {
      interface: data.interfaces?.[0]?.name || "N/A",
      total_rx: data.interfaces?.[0]?.traffic?.total?.rx || 0,
      total_tx: data.interfaces?.[0]?.traffic?.total?.tx || 0
    };
  } catch (err) {
    return "vnstat not installed or no data";
  }
}

/**
 * Get live bandwidth (iftop) - returns top bandwidth consumers
 */
async function getLiveBandwidth(ssh) {
  try {
    // iftop requires root, run for 5 seconds and parse output
    const result = await execCommand(ssh, "timeout 5 iftop -t -s 5 -n -P 2>&1 | tail -n 20");

    if (result.stdout.includes("requires root") || result.stdout.includes("permission denied")) {
      return "iftop requires root privileges";
    }

    return result.stdout || "No bandwidth data available";
  } catch (err) {
    return "iftop not installed or error: " + err.message;
  }
}

/**
 * Get network speed via nload (alternative)
 */
async function getNetworkSpeed(ssh) {
  try {
    // nload doesn't work well non-interactively, use alternative
    const result = await execCommand(ssh, "cat /proc/net/dev");
    return result.stdout;
  } catch (err) {
    return "Error: " + err.message;
  }
}

/**
 * Get disk I/O statistics
 */
async function getDiskIO(ssh) {
  try {
    const result = await execCommand(ssh, "iostat -d -x 1 1");
    if (!result.stdout) return "sysstat (iostat) not installed";

    const lines = result.stdout.split("\n");
    const startIdx = lines.findIndex(l => l.startsWith("Device"));

    if (startIdx === -1) return "No disk I/O data";

    return lines.slice(startIdx + 1).filter(l => l.trim()).map(l => {
      const parts = l.split(/\s+/);
      return {
        device: parts[0],
        tps: parts[1],
        util: parts[parts.length - 1] + "%"
      };
    });
  } catch (err) {
    return "sysstat (iostat) not installed";
  }
}

/**
 * Get system logs
 */
async function getSystemLogs(ssh, lines = 20) {
  try {
    const result = await execCommand(ssh, `tail -n ${lines} /var/log/syslog 2>/dev/null || journalctl -n ${lines}`);
    return result.stdout;
  } catch (err) {
    return "Error accessing logs: " + err.message;
  }
}

/**
 * Get all metrics - main function
 */
async function getAllMetrics(ssh, config) {
  const metrics = {
    timestamp: new Date().toISOString(),
    mode: config.mode || (ssh ? 'remote' : 'local'),
    ip: config.vps?.host || 'localhost'
  };

  // Gather all metrics in parallel for better performance
  const [
    cpu,
    memory,
    disks,
    dockerStats,
    allContainers,
    pm2Processes,
    topProcesses,
    services,
    networkStats,
    diskIO,
    logs
  ] = await Promise.all([
    getCPUUsage(ssh),
    getMemoryUsage(ssh),
    getDiskUsage(ssh),
    getDockerStats(ssh),
    getAllContainers(ssh),
    getPM2Processes(ssh),
    getTopProcesses(ssh, config.monitoring?.topProcessCount || 10),
    getServiceStatus(ssh, config.monitoring?.services || ['nginx', 'docker']),
    getNetworkStats(ssh),
    getDiskIO(ssh),
    getSystemLogs(ssh, 20)
  ]);

  metrics.cpu = cpu;
  metrics.memory = memory;
  metrics.disks = disks;
  metrics.docker = dockerStats;
  metrics.all_containers = allContainers;
  metrics.pm2 = pm2Processes;
  metrics.top_processes = topProcesses;
  metrics.services = services;
  metrics.network = networkStats;
  metrics.disk_io = diskIO;
  metrics.logs = logs;

  // Optional: Get bandwidth if enabled
  if (config.monitoring?.enableBandwidthMonitoring) {
    metrics.bandwidth = await getLiveBandwidth(ssh);
  }

  // Optional: Get container logs for high CPU containers
  if (config.monitoring?.enableContainerLogs && dockerStats.length > 0) {
    metrics.container_logs = {};
    for (const container of dockerStats) {
      if (container.cpu && parseFloat(container.cpu) > 50) {
        metrics.container_logs[container.name] = await getContainerLogs(
          ssh,
          container.name,
          config.monitoring?.containerLogLines || 50
        );
      }
    }
  }

  return metrics;
}

module.exports = {
  execCommand,
  getCPUUsage,
  getMemoryUsage,
  getDiskUsage,
  getDockerStats,
  getAllContainers,
  getContainerProcesses,
  getContainerLogs,
  getPM2Processes,
  getTopProcesses,
  getServiceStatus,
  getNetworkStats,
  getLiveBandwidth,
  getNetworkSpeed,
  getDiskIO,
  getSystemLogs,
  getAllMetrics
};
