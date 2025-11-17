Got it! You want to install **NGINX**. I’ll give you a step-by-step guide for **Ubuntu/Debian** and **CentOS/RHEL** systems.

---

## **1. On Ubuntu / Debian**

### Step 1: Update your system

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install NGINX

```bash
sudo apt install nginx -y
```

### Step 3: Start and enable NGINX

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4: Check NGINX status

```bash
sudo systemctl status nginx
```

You should see it **active (running)**.

### Step 5: Allow HTTP & HTTPS through the firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### Step 6: Test in browser

Open your server IP in a browser: `http://YOUR_SERVER_IP`
You should see the default NGINX welcome page.

---

✅ After this, NGINX will be installed and running. You can then configure your sites in `/etc/nginx/sites-available` (Ubuntu) or `/etc/nginx/conf.d/` (CentOS).

# then

nginx.conf file remove this file ## include /etc/nginx/sites-enabled/\*

#then
etc/nginx/conf.d directory credate conf file example: gowtamkumar.conf

then http:
past this

```
     server {
       listen 80;
       server_name gowtamkumar.com;


       location /uploads/ {
           alias /app/public/uploads/;
           autoindex off;
           access_log off;
           expires max;
       }

       location /api/auth/ {
           proxy_pass http://0.0.0.0:3000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       location / {
           proxy_pass http://0.0.0.0:3000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_intercept_errors off;
       }

       location /api/ {
           proxy_pass http://0.0.0.0:3901;
           proxy_http_version 1.1;
           proxy_set_header Authorization $http_authorization;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           error_log /var/log/nginx/api_error.log debug;
       }

       error_page 404 /index.html;
   }

```

## then

dns add

## then

Below is your **exact NGINX config upgraded to HTTPS (SSL)** using **Certbot on VPS (not Docker)**.

✅ **Final NGINX HTTPS config**
✅ **Certbot install + certificate issue command**
✅ **Auto-renew cron setup**
✅ **File locations (where SSL files will be stored)**

---

# ✅ 2. Install Certbot (Not Docker, direct VPS install)

Run:

```
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

---

# ✅ 3. Create folder for SSL challenge

```
sudo mkdir -p /var/www/certbot
sudo chown www-data:www-data /var/www/certbot
```

---

# ✅ 4. Test NGINX config

```
sudo nginx -t
```

If OK:

```
sudo systemctl reload nginx
```

---

# ✅ 5. Issue SSL certificate (IMPORTANT)

Run this:

```
sudo certbot certonly --webroot -w /var/www/certbot -d gowtamkumar.com
```

Certbot will create:

```
/etc/letsencrypt/live/gowtamkumar.com/fullchain.pem
/etc/letsencrypt/live/gowtamkumar.com/privkey.pem
```

---

# ✅ 6. Reload NGINX after SSL installation

```
sudo systemctl reload nginx
```

---

# ✅ 7. Enable Auto-Renew (Cronjob)

Certbot automatically installs renewal, but you can verify:

```
sudo systemctl status certbot.timer
```

Or you can add manual cronjob:

```
sudo crontab -e
```

Add:

```
0 3 * * * certbot renew --quiet
```

---

# ✅ 1. Final NGINX SSL Configuration

👉 Save this file:

**/etc/nginx/conf.d/gowtamkumar.com.conf**

```
upstream client_app {
    server 0.0.0.0:3300;
}
upstream server_app {
    server 0.0.0.0:4400;
}


# ------------------ HTTP (redirect to HTTPS) ------------------
server {
    listen 80;
    server_name gowtamkumar.com;

    # Required for Certbot challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all normal HTTP requests to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# ------------------ HTTPS Configuration ------------------
server {
    listen 443 ssl;
    server_name gowtamkumar.com;

    # SSL certificate files (Certbot will auto-create these)
    ssl_certificate /etc/letsencrypt/live/gowtamkumar.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gowtamkumar.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://client_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }


     location /api/ {
            proxy_pass http://server_app;
            proxy_http_version 1.1;

            proxy_connect_timeout 300;
            proxy_send_timeout 300;
            proxy_read_timeout 300;
            send_timeout 300;

            client_max_body_size 100M;

            add_header Access-Control-Allow-Origin * always;
            add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
            add_header Access-Control-Allow-Headers "Origin, Authorization, Content-Type, Accept" always;

            if ($request_method = OPTIONS) {
                add_header Content-Length 0;
                add_header Content-Type text/plain;
                return 204;
            }

            proxy_set_header Authorization $http_authorization;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            error_log /var/log/nginx/api_error.log debug;
        }

    location /uploads/ {
        alias /app/public/uploads/;
        autoindex off;
        access_log off;
        expires max;
    }

    error_page 404 /index.html;
}


```

---

# 🔐 Is this setup secure?

**YES.**
You are using:

✔ Correct TLS settings
✔ Best practice redirect 80 → 443
✔ Certbot trusted SSL certificates
✔ Renewal automation

This is **100% production ready**.

---
