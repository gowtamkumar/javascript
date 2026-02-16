learn ci/cd
single project : runs-on: self-hosted
then you can run insite project
same server multiple project run: self-hosted na
git action runner with repository config then clone /var/www/product1 and pull then run
then nginx config

## CI/CD integration | Build and push images in pipeline

Perfect boss 😎🔥 this is called **Auto Deploy to VPS using CI/CD**.

Your goal:

> First time: clone project in VPS
> Then: when you push to GitHub → VPS automatically
> → pull latest code
> → build
> → test
> → deploy

We’ll use:

- **GitHub Actions**
- **Docker**
- Your VPS (Ubuntu assumed)

This is real production setup 💪

---

# 🎯 FINAL ARCHITECTURE

```
You push code
      ↓
GitHub Actions runs
      ↓
SSH into VPS
      ↓
git pull
docker compose build
run tests
docker compose up -d
```

No manual login needed after setup.

---

# 🧱 STEP 1 — First Time Setup on VPS

SSH into VPS:

```bash
ssh root@your-vps-ip
```

Install Docker + Compose (if not installed):

```bash
sudo apt update
sudo apt install docker.io docker-compose -y
```

Clone your project:

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

Test manually once:

```bash
docker compose up -d --build
```

If working → ready for automation.

---

# 🧱 STEP 2 — Setup SSH Access for GitHub

On your VPS:

```bash
ssh-keygen -t ed25519 -C "github-deploy"
```

Press Enter (no password).

Then:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy this public key.

---

### Now in GitHub:

Go to:

```
Repo → Settings → Secrets and variables → Actions → New repository secret
```

Add:

```
Name: VPS_SSH_KEY
Value: (paste your PRIVATE key from ~/.ssh/id_ed25519)
```

⚠ Important:
Paste PRIVATE key (`id_ed25519`), not `.pub`.

Also add:

```
VPS_HOST = your_vps_ip
VPS_USER = root
```

---

# 🧱 STEP 3 — Create GitHub Actions Deploy Workflow

Create:

```
.github/workflows/deploy.yml
```

Add this 👇

```yaml
name: Test and Deploy
on:
  push:
    branches:
      - main

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: "DEPLOY: Push to VPS"
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /root/products/inventory-management-system

            # Authenticate Git with Token
            git remote set-url origin https://${{ secrets.GHA_PAT }}@github.com/semicolonitofficial/inventory-management-system.git

            git pull origin main

            echo "Starting deployment..."
            docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

            echo "Waiting for containers to stabilize (15s)..."
            sleep 15

            echo "Running health checks..."
            # Check if all containers defined in compose are running
            container_statuses=$(docker compose -f docker-compose.prod.yml ps --format "{{.Status}}")
            echo "Current statuses:"
            echo "$container_statuses"

            if echo "$container_statuses" | grep -qv "Up"; then
              echo "ERROR: One or more containers failed to start correctly!"
              docker compose -f docker-compose.prod.yml ps
              exit 1
            fi

            echo "Cleaning up old images..."
            docker image prune -f
            echo "Deployment successful!"
```

# 🧠 What This Does

When you push:

```bash
git push origin main
```

GitHub:

1️⃣ Connects to VPS via SSH
2️⃣ Goes to project folder
3️⃣ Pulls latest code
4️⃣ Rebuilds containers
5️⃣ Restarts app

🔥 Fully automatic deploy.

---

# 🧪 STEP 4 — Add Testing Before Deploy (Better Version)

Inside script section:

```yaml
script: |
  cd /root/yourrepo
  git pull origin main
  docker compose build
  docker compose run app npm test
  docker compose up -d
```

If test fails → deployment stops.

---

# 🚀 Production Safer Version (Recommended)

Instead of stopping first:

```bash
docker compose pull
docker compose up -d --build
```

Less downtime.

---

# 🧨 Important Security Notes

✅ Use non-root user for production
✅ Disable password SSH login
✅ Use SSH key only
✅ Use firewall (ufw)

---

# 🎯 FINAL FLOW

```
Local Dev
   ↓
git push
   ↓
GitHub Actions
   ↓
SSH into VPS
   ↓
git pull
docker compose build
run test
docker compose up -d
```

You now have real CI/CD 😎🔥

---

# 💪 Next Level (When You Ready)

We can upgrade to:

- Zero downtime deploy
- Blue-Green deployment
- Rollback on failure
- Separate staging + production
- Auto SSL with NGINX
- Multi-server auto deploy

---

Boss tell me:

Do you want:

A) Simple & stable production deploy
B) Zero-downtime professional SaaS deploy
C) Enterprise-grade scalable CI/CD

I guide you step-by-step 😎🔥
