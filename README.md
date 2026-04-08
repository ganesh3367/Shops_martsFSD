# 🪑 Furniture Shop - DevOps Enabled Project

This is a **Furniture Shop Website** integrated with **DevOps practices** including CI/CD automation, Git workflow, and deployment pipeline.
The project demonstrates how a frontend web application can be built, tested, and deployed automatically.

---

## 🚀 DevOps Features

* 🔀 Git feature branch workflow
* ⚙️ CI pipeline using GitHub Actions
* 🧪 Automated build & test process
* 🐳 Docker containerization (optional)
* 🚀 Automated deployment pipeline
* 🔐 Environment variable management
* 📦 Build automation

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### DevOps

* Git
* GitHub
* GitHub Actions (CI/CD)
* Docker (optional)
* YAML workflow configuration

---

## 🔄 CI/CD Pipeline Flow

```id="szklx5"
Developer pushes code
        ↓
GitHub Actions triggered
        ↓
Install dependencies
        ↓
Run build
        ↓
Check exit code
        ↓
Deploy
```

---

## 📂 Project Structure

```id="f2mbha"
Furniture-Shop/
│
├── index.html
├── css/
├── js/
├── images/
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## ⚙️ GitHub Actions Workflow

```yaml id="k7r0mf"
name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: echo "Building project"
```

---

## 🔀 Git Workflow

```id="q1cv0r"
main
  │
  └── feature branch
        ↓
      commit
        ↓
      push
        ↓
      pull request
        ↓
      CI checks
        ↓
      merge
```

---

## 🐳 Docker (Optional)

```dockerfile id="f7yxnb"
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

---

## 💻 Setup

```id="l64xv0"
git clone <repo-url>
cd furniture-shop
open index.html
```

---

## 🎯 DevOps Concepts Demonstrated

* Continuous Integration
* Git branching workflow
* Automation pipeline
* YAML configuration
* Exit code handling
* Idempotent automation

---

## 👨‍💻 Author

Ganesh
