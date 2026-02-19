Perfect boss 👑
Now I give you **complete GitHub Actions workflow keywords explained clearly** (from top to bottom).

This is the full structure used in GitHub Actions.

---

# 🔷 FULL WORKFLOW STRUCTURE

```yaml
name:
run-name:
on:
permissions:
env:
defaults:
concurrency:

jobs:
  job_id:
    name:
    runs-on:
    needs:
    if:
    environment:
    strategy:
    timeout-minutes:
    continue-on-error:
    permissions:
    env:
    defaults:

    steps:
      - name:
        id:
        if:
        uses:
        run:
        with:
        env:
        working-directory:
        shell:
        timeout-minutes:
        continue-on-error:
```

Now I explain every keyword 👇

---

# 🔹 TOP LEVEL KEYWORDS

---

## 1️⃣ `name`

Workflow display name in GitHub UI.

```yaml
name: Node CI
```

Optional but recommended.

---

## 2️⃣ `run-name`

Dynamic name shown when workflow runs.

```yaml
run-name: Deploy by ${{ github.actor }}
```

---

## 3️⃣ `on`

Trigger events.

```yaml
on:
  push:
    branches: [main]
  pull_request:
```

Controls when workflow runs.

---

## 4️⃣ `permissions`

Controls GitHub token permissions.

```yaml
permissions:
  contents: read
  issues: write
```

Important for security.

---

## 5️⃣ `env`

Global environment variables.

```yaml
env:
  NODE_ENV: production
```

Available to all jobs.

---

## 6️⃣ `defaults`

Set default shell or working directory.

```yaml
defaults:
  run:
    shell: bash
```

---

## 7️⃣ `concurrency`

Prevents multiple workflow runs at same time.

```yaml
concurrency:
  group: production-deploy
  cancel-in-progress: true
```

Used in production deploys.

---

# 🔷 JOB LEVEL KEYWORDS

Inside `jobs:`

---

## 8️⃣ `jobs`

Defines all jobs.

```yaml
jobs:
  build:
```

---

## 9️⃣ `job_id`

Unique identifier for job.

```yaml
jobs:
  build:
```

`build` = job ID.

---

## 🔟 `name` (inside job)

Display name for job.

```yaml
name: Build Application
```

---

## 1️⃣1️⃣ `runs-on`

Runner type.

```yaml
runs-on: ubuntu-latest
```

---

## 1️⃣2️⃣ `needs`

Makes job depend on another job.

```yaml
needs: build
```

---

## 1️⃣3️⃣ `if`

Conditional execution.

```yaml
if: github.ref == 'refs/heads/main'
```

---

## 1️⃣4️⃣ `environment`

Attach GitHub environment.

```yaml
environment: production
```

Used for protected deploys.

---

## 1️⃣5️⃣ `strategy`

Used for matrix builds.

```yaml
strategy:
  matrix:
    node-version: [18, 20]
```

Runs job multiple times.

---

## 1️⃣6️⃣ `timeout-minutes`

Max time job can run.

```yaml
timeout-minutes: 10
```

---

## 1️⃣7️⃣ `continue-on-error`

Allows job to fail without failing workflow.

```yaml
continue-on-error: true
```

---

## 1️⃣8️⃣ `permissions` (job-level)

Override global permissions.

---

## 1️⃣9️⃣ `env` (job-level)

Environment variables only for that job.

---

## 2️⃣0️⃣ `defaults` (job-level)

Override global defaults.

---

# 🔷 STEP LEVEL KEYWORDS

Inside `steps:`

---

## 2️⃣1️⃣ `steps`

List of steps.

```yaml
steps:
  - run: echo Hello
```

---

## 2️⃣2️⃣ `name` (step name)

Human-readable name.

```yaml
- name: Install Dependencies
```

---

## 2️⃣3️⃣ `id`

Identifier to reference step outputs.

```yaml
- id: build_step
```

Used later as:

```yaml
${{ steps.build_step.outputs.some_value }}
```

---

## 2️⃣4️⃣ `if` (step-level)

Conditional step execution.

---

## 2️⃣5️⃣ `uses`

Call external action.

```yaml
- uses: actions/checkout@v4
```

---

## 2️⃣6️⃣ `run`

Run shell command.

```yaml
- run: npm install
```

---

## 2️⃣7️⃣ `with`

Pass inputs to action.

```yaml
with:
  node-version: 20
```

Only used with `uses`.

---

## 2️⃣8️⃣ `env` (step-level)

Environment variables for that step only.

---

## 2️⃣9️⃣ `working-directory`

Change folder before running command.

```yaml
working-directory: ./client
```

---

## 3️⃣0️⃣ `shell`

Change shell.

```yaml
shell: bash
```

---

## 3️⃣1️⃣ `timeout-minutes` (step-level)

Limit step runtime.

---

## 3️⃣2️⃣ `continue-on-error` (step-level)

Ignore step failure.

---

# 🏆 BONUS ADVANCED KEYWORDS

---

## `outputs` (job outputs)

Pass data between jobs.

```yaml
outputs:
  image_tag: ${{ steps.build.outputs.tag }}
```

---

## `services`

Run Docker services like MySQL or Redis.

```yaml
services:
  mysql:
    image: mysql:8
```

---

## `container`

Run job inside a container.

```yaml
container:
  image: node:20
```

---

# 🎯 Boss Final Summary

There are:

- 🔹 Top-level keywords (workflow control)
- 🔹 Job-level keywords (job control)
- 🔹 Step-level keywords (execution control)
- 🔹 Advanced keywords (matrix, services, outputs)

Master these → You become CI/CD pro 💪

---

If you want boss 👑
Next I can give:

- 🔥 Real production-ready SaaS workflow (all keywords used)
- 🔥 Matrix strategy deep dive
- 🔥 Job outputs & reusable workflows advanced guide

Which one? 😎

Perfect boss 👑
Now let’s go **deep dive into `continue-on-error`** in GitHub Actions (very important in real CI/CD).

Used in GitHub Actions.

---

# 🔥 What is `continue-on-error`?

Normally:

👉 If a **step fails** →
❌ Job stops
❌ Workflow fails

But with:

```yaml
continue-on-error: true
```

👉 Even if the step fails →
✅ Workflow continues
✅ Next steps still run

---

# 🟢 Step-Level `continue-on-error`

Most common usage.

### Example WITHOUT it:

```yaml
steps:
  - run: npm install
  - run: npm test # If this fails → job stops
  - run: echo "Deploying..."
```

If `npm test` fails → deploy step never runs.

---

### Example WITH it:

```yaml
steps:
  - run: npm install

  - name: Run Tests
    run: npm test
    continue-on-error: true

  - run: echo "Deploying..."
```

Now:

- If tests fail ❌
- Deploy still runs ✅

---

# 🟡 When Should You Use It?

### 1️⃣ Non-critical checks

Example:

- Lint warnings
- Code coverage
- Optional security scan

You don’t want pipeline to stop.

---

### 2️⃣ Experimental Matrix Builds

Example:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 21]
```

Maybe Node 21 is experimental.

You can do:

```yaml
continue-on-error: ${{ matrix.node-version == 21 }}
```

Now:

- If Node 21 fails → ignore
- If Node 18 or 20 fails → fail job

🔥 Very powerful usage.

---

# 🔴 Job-Level `continue-on-error`

You can also use it at job level:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    continue-on-error: true
```

If this job fails:

- Workflow continues
- Other jobs still run

⚠️ But job will show as "failed (allowed)"

---

# 🟣 Important Behavior

Even when using `continue-on-error: true`:

- The step is marked as failed
- But workflow does not stop
- You can still check failure using conditions

Example:

```yaml
- name: Run Tests
  id: test_step
  run: npm test
  continue-on-error: true

- name: Check if test failed
  if: steps.test_step.outcome == 'failure'
  run: echo "Tests failed but continuing..."
```

Possible outcomes:

- `success`
- `failure`
- `cancelled`
- `skipped`

---

# 🧠 Real SaaS Example (Smart Usage)

Imagine:

1. Run tests
2. Always build Docker image
3. Deploy only if tests passed

```yaml
- name: Run Tests
  id: test
  run: npm test
  continue-on-error: true

- name: Build Docker
  run: docker build -t myapp .

- name: Deploy
  if: steps.test.outcome == 'success'
  run: echo "Deploying..."
```

Now:

- Tests fail → build still happens
- But deploy does NOT run

🔥 Professional pattern.

---

# ⚠️ When NOT To Use It

Never use `continue-on-error` for:

❌ Database migrations
❌ Production deploy
❌ Critical security checks

Otherwise you may deploy broken app 😅

---

# 🏆 Final Boss Summary

| Level       | Effect                           |
| ----------- | -------------------------------- |
| Step-level  | Step fails but job continues     |
| Job-level   | Job fails but workflow continues |
| Smart usage | Use with conditions (`if`)       |

---

If you want boss 👑 next I can explain:

- 🔥 Difference between `continue-on-error` vs `if`
- 🔥 How failure propagation works internally
- 🔥 Advanced matrix + fail-fast strategy

Which one you want? 😎

🎯 My Suggestion For You

Learn in this order:

Step 1 → Docker build & push
Step 2 → Secrets & login
Step 3 → Auto deploy via SSH
Step 4 → Caching
Step 5 → Tag-based production deploy
