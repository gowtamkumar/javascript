Okay boss 👍 here is the **exact step-by-step guide to connect your VPS with Google Drive** using `rclone` (Step 2 in detail):

---

## 🔹 Step 1: Install `rclone` on VPS

```bash
sudo apt update
sudo apt install -y rclone
```

---

## 🔹 Step 2: Start Configuration

Run:

```bash
rclone config
```

You’ll see a menu like this:

```
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
```

Type:

```
n
```

---

## 🔹 Step 3: Name the Remote

It will ask for a name → type:

```
gdrive
```

---

## 🔹 Step 4: Choose Storage Type

It will show a long list. Type:

```
drive
```

(for Google Drive)

---

## 🔹 Step 5: Client ID & Secret

- Leave empty (just press **Enter**)
- Or, if you want higher API quota, create your own in Google Cloud Console (optional).

---

## 🔹 Step 6: Choose Scope

It will ask:

```
Scope that rclone should use:
  1) Full access
  2) Read-only
  3) Access to files created by rclone only
```

Type:

```
1
```

---

## 🔹 Step 7: Root Folder / Team Drive

- Just press **Enter** (blank) if you don’t use Team Drive.
- If you want to back up into a specific shared drive, paste its ID.

---

## 🔹 Step 8: Authentication

If VPS has no browser → type:

```
n
```

It will show a link like:

```
https://accounts.google.com/o/oauth2/auth?client_id=.....
```

👉 Copy this link, open it in your **local PC browser**, log into your Google account, allow permissions, and you’ll get a **verification code**.

Paste that code into your VPS terminal.

---

## 🔹 Step 9: Confirm & Save

You’ll see:

```
Remote config
--------------------
[gdrive]
type = drive
scope = drive
token = {"access_token":"..."}
```

Type:

```
y
```

to save.

---

## 🔹 Step 10: Test the Connection

Run:

```bash
rclone ls gdrive:
```

If it lists your Google Drive files → ✅ VPS is connected to Google Drive.

---

👉 Do you want me to prepare a **ready-to-use bash script** that automatically does database dump + uploads it to your `gdrive` remote?

Got it boss ✅ That error means the **Google Drive remote is connected**, but rclone is trying to list the **root folder (`gdrive:`)** and doesn’t see anything (or misconfigured the root folder ID).

Let’s fix step by step:

---

## 🔹 1. Test with a Subdirectory

Try listing like this:

```bash
rclone lsd gdrive:
```

This shows only **folders** (not files).
If you see nothing, try creating a folder in your Google Drive manually (like `vps-database-backups`) and run:

```bash
rclone lsd gdrive:
```

---

Ah boss 👍 yes, you **can use your Google token from your local machine on your VPS**, but there are a few important points:

---

## 🔹 1. Where rclone stores the token

Rclone stores Google Drive credentials in a **config file**:

```
~/.config/rclone/rclone.conf
```

- On your local machine, it’s under your user folder, e.g., `/home/username/.config/rclone/rclone.conf`
- On VPS, it looks for `/root/.config/rclone/rclone.conf` if you run scripts as root.

---

## 🔹 2. Copy the config to VPS

You can copy the whole config file from your local machine to your VPS:

```bash
# On VPS:
mkdir -p ~/.config/rclone
# Then use scp from local:
scp /path/to/local/rclone.conf user@your_vps_ip:~/.config/rclone/rclone.conf
```

- If you run as root on VPS, put it in `/root/.config/rclone/rclone.conf` instead:

```bash
sudo mkdir -p /root/.config/rclone
sudo cp /home/gowtam/rclone.conf /root/.config/rclone/rclone.conf
sudo chown -R root:root /root/.config/rclone
```

---

## 🔹 3. Test the token

On VPS, run:

```bash
rclone ls gdrive:
```

- If it lists files → ✅ token works
- If it asks to re-authenticate → token expired or misconfigured

---

## 🔹 4. Important Notes

1. **Token expiration:** Google OAuth tokens can expire, but rclone uses the **refresh token** to get new access automatically.
2. **User vs Root:** Make sure your config is in the correct user folder matching how you run your scripts (normal user vs root).
3. **Security:** Keep the config safe — it allows full access to your Google Drive.

---

Boss, if you want, I can **prepare your VPS-ready rclone config using your local token** so your backup script works immediately without re-authenticating.

Do you want me to do that?

## 🔹 2. Verify Config

Open your config:

```bash
nano ~/.config/rclone/rclone.conf
```

You should see something like:

```ini
[gdrive]
type = drive
scope = drive
token = {"access_token":"...","refresh_token":"...","expiry":"..."}
```

👉 If you see a `root_folder_id = ...` line with a wrong value → remove it (or replace with correct Google Drive folder ID).

---

## 🔹 3. Test by Uploading a File

Create a dummy file:

```bash
echo "hello boss" > test.txt
```

Upload it:

```bash
rclone copy test.txt gdrive:/ --progress
```

Then check:

```bash
rclone ls gdrive:
```

Now you should see `test.txt` listed.

---

## 🔹 4. If Still Error → Reconfigure

Sometimes config is corrupted. Run:

```bash
rclone config
```

- Select your remote (`gdrive`)
- Choose **`e` Edit existing remote**
- Make sure `scope = drive`
- If broken, delete and recreate (`d` then `n`)

---

✅ After this, your VPS will fully connect to Google Drive.

👉 Boss, do you want me to make a **clean ready-made backup script** that dumps your **PostgreSQL/MySQL database → uploads to Google Drive** so you just run one command?

Ahh, boss 👍 now it’s clear.
That **`Error 404: File not found: .`** means your `gdrive` remote is misconfigured. Most likely rclone stored a wrong **root folder ID** during setup.

Let’s fix it step by step:

---

## 🔹 Step 1: Check the Config File

Open:

```bash
nano ~/.config/rclone/rclone.conf
```

You should see something like:

```ini
[gdrive]
type = drive
scope = drive
token = {"access_token":"...","refresh_token":"...","expiry":"..."}
```

👉 If you see a line like:

```
root_folder_id = .
```

or some random ID → **remove that line** (or correct it with your actual Google Drive folder ID).

Save and exit (`CTRL+O`, `CTRL+X`).

---

## 🔹 Step 2: Re-authenticate if Needed

If you’re unsure, it’s easiest to **delete and recreate** the config.

Run:

```bash
rclone config
```

- Select your remote (`gdrive`)
- Choose **`e` Edit existing remote** OR **`d` Delete** and **`n` New remote**
- Name it `gdrive` again
- Type = `drive`
- Scope = `1` (Full access)
- Don’t enter any root folder ID → just press Enter
- When asked about auto config → choose **`n`** (if no browser on VPS)
- Copy the link, open in your **local PC browser**, log in, copy the auth code, paste into VPS

---

## 🔹 Step 3: Test Upload

Make a dummy file:

```bash
echo "backup test" > test.txt
```

Upload:

```bash
rclone copy test.txt gdrive:/ --progress
```

Now check:

```bash
rclone ls gdrive:
```

👉 You should see `test.txt`.

Ah boss 👍 you want to **delete a file from Google Drive** using rclone. Here’s how:

---

## 🔹 1. List files in your remote folder

```bash
rclone ls gdrive:
```

Example output:

```
12345 all_databases_2025-09-08-1205.sql.gz
67890 all_databases_2025-09-07-1205.sql.gz
```

---

## 🔹 2. Delete a specific file

```bash
rclone delete gdrive:/all_databases_2025-09-07-1205.sql.gz
```

- Replace the filename with the exact one from `rclone ls`
- This **permanently deletes** the file from Google Drive

---

## 🔹 3. Delete all files in a folder (if needed)

⚠️ Warning: this will delete **everything inside the folder**:

```bash
rclone purge gdrive:/office_db_backup
```

- Use carefully!

---

## 🔹 4. Optional: Dry-run first

To check what will be deleted without actually removing:

```bash
rclone delete gdrive:/all_databases_2025-09-07-1205.sql.gz --dry-run
```

---

Boss, if you want, I can also **modify your backup script** to **auto-delete Google Drive backups older than 30 days** so you never have to manually remove them.

Do you want me to do that?

---

✅ Once this works, we can script your **database backup → Google Drive**.

---

Boss, are you using **MySQL** or **PostgreSQL** for your database? I’ll prepare a ready-made backup script for you.

Perfect boss 👍 You’re on **PostgreSQL**.
Here’s a ready-made backup script for your VPS that will **dump your database and upload it to Google Drive**.

---

## 🔹 Step 1: Create Backup Script

Create a file:

```bash
nano /root/pg_backup.sh
```

Paste this:

```bash
#!/bin/bash
# PostgreSQL All Databases to Google Drive Backup Script (Compressed)

# === CONFIG ===
DB_USER="postgres"
BACKUP_DIR="/root/db_backups"
DATE=$(date +%F-%H%M)
FILENAME="all_databases_$DATE.sql"
COMPRESSED_FILENAME="$FILENAME.gz"
RCLONE_REMOTE="gdrive:/"

# === STEP 1: Create local backup directory if not exists ===
mkdir -p $BACKUP_DIR

# === STEP 2: Dump all PostgreSQL databases ===
sudo -u $DB_USER pg_dumpall > $BACKUP_DIR/$FILENAME

# === STEP 3: Compress the SQL file ===
gzip -f $BACKUP_DIR/$FILENAME

# === STEP 4: Upload compressed file to Google Drive ===
rclone copy $BACKUP_DIR/$COMPRESSED_FILENAME $RCLONE_REMOTE --progress

# === STEP 5: Delete local backups older than 7 days ===
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -exec rm {} \;

echo "[$(date)] Backup $COMPRESSED_FILENAME uploaded to Google Drive" >> /root/pg_backup.log

```

Save (`CTRL+O`, `Enter`, `CTRL+X`).

---

## 🔹 Step 2: Make Executable

```bash
chmod +x /root/pg_backup.sh
```

---

## 🔹 Step 3: Test It

Run manually:

```bash
/root/pg_backup.sh
```

Ah boss 👍 that explains it. You ran `sudo crontab -l` but it says “no crontab for root” — that’s normal if root hasn’t had any cron jobs yet.

We need to **create a root cron job** (not gowtam’s) because your script uses `/root/pg_backup.sh`.

---

### Step 1: Open root’s crontab

```bash
sudo crontab -e
```

- If it asks for editor → type `1` → Enter (nano).

---

### Step 2: Add the cron job

Paste this line in the empty file:

```bash
0 2 * * * /root/pg_backup.sh >> /root/pg_backup.log 2>&1
```

- Runs daily at 2:00 AM
- Executes your backup script
- Logs output to `/root/pg_backup.log`

---

### Step 3: Save and exit

- Press `CTRL+O` → Enter → saves the file
- Press `CTRL+X` → exits nano

---

### Step 4: Verify

```bash
sudo crontab -l
```

You should now see:

```
0 2 * * * /root/pg_backup.sh >> /root/pg_backup.log 2>&1
```

✅ Boss, your VPS is now scheduled to **backup PostgreSQL to Google Drive daily at 2 AM**.

Do you want me to **also automatically delete old Google Drive backups older than 30 days**?

### this script single database backup

```
#!/bin/bash
# PostgreSQL to Google Drive Backup Script (Compressed)

# === CONFIG ===
DB_NAME="radit_mechinery"
DB_USER="postgres"
BACKUP_DIR="/root/db_backups"
DATE=$(date +%F)
FILENAME="$DB_NAME-$DATE.sql"
COMPRESSED_FILENAME="$FILENAME.gz"
RCLONE_REMOTE="gdrive:/"

# === STEP 1: Create local backup directory if not exists ===
mkdir -p $BACKUP_DIR

# === STEP 2: Dump PostgreSQL database ===
sudo -u $DB_USER pg_dump $DB_NAME > $BACKUP_DIR/$FILENAME

# === STEP 3: Compress the SQL file ===
gzip -f $BACKUP_DIR/$FILENAME

# === STEP 4: Upload compressed file to Google Drive ===
rclone copy $BACKUP_DIR/$COMPRESSED_FILENAME $RCLONE_REMOTE --progress

# === STEP 5: Delete local backups older than 7 days ===
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -exec rm {} \;

echo "[$(date)] Backup $COMPRESSED_FILENAME uploaded to Google Drive" >> /root/pg_backup.log


```

### For Dcoker all database

```

#!/bin/bash
# PostgreSQL All Databases to Google Drive Backup Script (Compressed)

# === CONFIG ===
DB_USER="semicolonitinventery"
DB_PASSWORD="semicolonit@"   # Add password if needed
BACKUP_DIR="/root/db_backups"
DATE=$(date +%F-%H%M)
FILENAME="sas_all_databases_$DATE.sql"
COMPRESSED_FILENAME="$FILENAME.gz"
CONTAINER_NAME="postgres_db"
RCLONE_REMOTE="gdrive:/"

mkdir -p $BACKUP_DIR

# Dump all PostgreSQL databases
docker exec -e PGPASSWORD=$DB_PASSWORD $CONTAINER_NAME pg_dumpall -U $DB_USER > $BACKUP_DIR/$FILENAME

# Compress
gzip -f $BACKUP_DIR/$FILENAME

# Upload to Google Drive
rclone copy $BACKUP_DIR/$COMPRESSED_FILENAME $RCLONE_REMOTE --progress

# Delete local backups older than 7 days
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -exec rm {} \;

echo "[$(date)] Backup $COMPRESSED_FILENAME uploaded to Google Drive" >> /root/pg_backup.log

```

### for docker single database

```
#!/bin/bash
# PostgreSQL Single Database to Google Drive Backup Script (Compressed)

# === CONFIG ===
DB_NAME="inventory_sas"              # The database you want to backup
DB_USER="semicolonitinventery"
DB_PASSWORD="semicolonit@"           # PostgreSQL password
BACKUP_DIR="/root/db_backups"
DATE=$(date +%F-%H%M)
FILENAME="${DB_NAME}_backup_$DATE.sql"
COMPRESSED_FILENAME="$FILENAME.gz"
CONTAINER_NAME="postgres_db"
RCLONE_REMOTE="gdrive:/"

# === STEP 1: Create local backup directory if not exists ===
mkdir -p $BACKUP_DIR

# === STEP 2: Dump the single PostgreSQL database ===
docker exec -e PGPASSWORD=$DB_PASSWORD $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/$FILENAME

# === STEP 3: Compress the SQL file ===
gzip -f $BACKUP_DIR/$FILENAME

# === STEP 4: Upload compressed file to Google Drive ===
rclone copy $BACKUP_DIR/$COMPRESSED_FILENAME $RCLONE_REMOTE --progress

# === STEP 5: Delete local backups older than 7 days ===
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -exec rm {} \;

echo "[$(date)] Backup $COMPRESSED_FILENAME uploaded to Google Drive" >> /root/pg_backup.log

```

### Restore all databases without docker

```
sudo -u postgres psql < /root/all_databases_2025-09-08-1205.sql

```

### Restore all databases done then single database backup and then docker container insert database

```
cat ~/Downloads/inventory_sas_databases_2025-09-08-1058.sql | docker exec -i docker_container psql -U docker_db_user -d inventory_sas
```
