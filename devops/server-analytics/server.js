const express = require('express');
const cors = require('cors');
const { NodeSSH } = require('node-ssh');
const config = require('./config');
const monitoring = require('./lib/monitoring');

const app = express();
const ssh = new NodeSSH();

// Fix MaxListenersExceededWarning
ssh.connection?.setMaxListeners?.(20);

// Middleware
app.use(express.json());
if (config.api.enableCors) {
  app.use(cors());
}

// API Key authentication middleware (optional)
const authenticateApiKey = (req, res, next) => {
  if (!config.api.apiKey) {
    return next(); // No API key required
  }

  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (apiKey === config.api.apiKey) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
};

// Cache for metrics
let cachedMetrics = null;
let lastFetch = 0;

/**
 * Get or fetch metrics with caching
 */
async function getMetrics(forceRefresh = false) {
  const now = Date.now();

  // Return cached data if still fresh
  if (!forceRefresh && cachedMetrics && (now - lastFetch < config.api.refreshInterval)) {
    return cachedMetrics;
  }

  try {
    let sshConnection = null;

    // Connect via SSH if in remote mode
    if (config.mode === 'remote') {
      if (!config.vps.host || !config.vps.username) {
        throw new Error('VPS credentials not configured for remote mode');
      }
      await ssh.connect(config.vps);
      sshConnection = ssh;
    }

    // Fetch all metrics
    const metrics = await monitoring.getAllMetrics(sshConnection, config);

    // Disconnect SSH if used
    if (sshConnection) {
      ssh.dispose();
    }

    // Update cache
    cachedMetrics = metrics;
    lastFetch = now;

    return metrics;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
}

// Routes

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: config.mode,
    timestamp: new Date().toISOString()
  });
});

/**
 * Get all metrics
 */
app.get('/api/metrics', authenticateApiKey, async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const metrics = await getMetrics(forceRefresh);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get CPU metrics only
 */
app.get('/api/metrics/cpu', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      cpu: metrics.cpu,
      top_processes: metrics.top_processes,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get memory metrics only
 */
app.get('/api/metrics/memory', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      memory: metrics.memory,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get disk metrics only
 */
app.get('/api/metrics/disk', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      disks: metrics.disks,
      disk_io: metrics.disk_io,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Docker metrics only
 */
app.get('/api/metrics/docker', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      docker: metrics.docker,
      all_containers: metrics.all_containers,
      container_logs: metrics.container_logs || {},
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get network metrics only
 */
app.get('/api/metrics/network', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      network: metrics.network,
      bandwidth: metrics.bandwidth || null,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get services status only
 */
app.get('/api/metrics/services', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      services: metrics.services,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get PM2 processes only
 */
app.get('/api/metrics/pm2', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      pm2: metrics.pm2,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get logs
 */
app.get('/api/metrics/logs', authenticateApiKey, async (req, res) => {
  try {
    const metrics = await getMetrics();
    res.json({
      logs: metrics.logs,
      timestamp: metrics.timestamp
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Simple web dashboard (optional)
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VPS Monitoring Dashboard</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
          color: #333;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          color: white;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h2 {
          color: #667eea;
          margin-bottom: 15px;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        .endpoint {
          background: #f8f9fa;
          padding: 10px 15px;
          margin: 10px 0;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        .endpoint code {
          color: #764ba2;
          font-weight: bold;
        }
        .status {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          background: #28a745;
          color: white;
          font-weight: bold;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .info-item {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
        }
        .info-item strong {
          color: #667eea;
          display: block;
          margin-bottom: 5px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 5px;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #764ba2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🖥️ VPS Monitoring Dashboard</h1>
        
        <div class="card">
          <h2>System Status</h2>
          <p><span class="status">Online</span></p>
          <div class="info-grid">
            <div class="info-item">
              <strong>Mode</strong>
              <span>${config.mode}</span>
            </div>
            <div class="info-item">
              <strong>Server</strong>
              <span>${config.mode === 'remote' ? config.vps.host : 'localhost'}</span>
            </div>
            <div class="info-item">
              <strong>API Port</strong>
              <span>${config.api.port}</span>
            </div>
            <div class="info-item">
              <strong>Refresh Interval</strong>
              <span>${config.api.refreshInterval / 1000}s</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h2>API Endpoints</h2>
          <p>Access real-time monitoring data via these endpoints:</p>
          
          <div class="endpoint">
            <code>GET /api/metrics</code> - All metrics
            <a href="/api/metrics" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/cpu</code> - CPU usage
            <a href="/api/metrics/cpu" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/memory</code> - Memory usage
            <a href="/api/metrics/memory" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/disk</code> - Disk usage
            <a href="/api/metrics/disk" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/docker</code> - Docker containers
            <a href="/api/metrics/docker" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/network</code> - Network stats
            <a href="/api/metrics/network" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/services</code> - Service status
            <a href="/api/metrics/services" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /api/metrics/pm2</code> - PM2 processes
            <a href="/api/metrics/pm2" class="btn" target="_blank">View</a>
          </div>
          
          <div class="endpoint">
            <code>GET /health</code> - Health check
            <a href="/health" class="btn" target="_blank">View</a>
          </div>
        </div>

        <div class="card">
          <h2>Quick Actions</h2>
          <a href="/api/metrics?refresh=true" class="btn">🔄 Force Refresh Metrics</a>
          <a href="/api/metrics/docker" class="btn">🐳 View Docker Stats</a>
          <a href="/api/metrics/services" class="btn">⚙️ Check Services</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start server
const PORT = config.api.port;
app.listen(PORT, () => {
  console.log(`🚀 VPS Monitoring API Server running on http://localhost:${PORT}`);
  console.log(`📊 Mode: ${config.mode}`);
  console.log(`🌐 Server: ${config.mode === 'remote' ? config.vps.host : 'localhost'}`);
  console.log(`📡 Dashboard: http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${config.api.apiKey ? 'Enabled' : 'Disabled'}`);
  console.log(`\n📖 API Documentation: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  ssh.dispose();
  process.exit(0);
});
