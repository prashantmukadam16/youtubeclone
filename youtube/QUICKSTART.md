# Quick Start Guide

## 5-Minute Quick Start

### 1. Prerequisites
- Node.js 18.x installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

### 2. Setup

```bash
# Clone project
cd d:\DevOps Pipeline\youtube clone\youtube

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Or manually create with:
# NODE_ENV=development
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/youtube-clone
# JWT_SECRET=your_secret_key
```

### 3. Run Application

```bash
# Development mode
npm run dev

# Navigate to: http://localhost:3000
```

### 4. Deploy to Azure

```bash
# Login to Azure
az login

# Create resource group
az group create --name youtube-clone-rg --location eastus

# Create App Service
az webapp up --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --runtime "NODE|18-lts"

# Push to DevOps
git remote add origin https://prashantmukadam161119@dev.azure.com/...
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Directory Structure at a Glance

```
project/
├── src/               # Backend code
│   ├── server.js      # Main server
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── models/        # Database schemas
│   └── middleware/    # Auth, validation
├── public/            # Frontend files
│   ├── css/           # Stylesheets
│   ├── js/            # Client scripts
│   └── uploads/       # Video storage
├── azure/             # Deployment configs
├── .env               # Environment variables
├── package.json       # Dependencies
└── azure-pipelines.yml # CI/CD pipeline
```

## Key Configuration Files

### .env
Set environment variables for your deployment

### azure-pipelines.yml
CI/CD pipeline configuration for Azure DevOps

### web.config
IIS configuration for Azure App Service

### Dockerfile
Container configuration for Docker deployment

## Common Commands

```bash
# Development
npm run dev

# Production
npm start

# Test
npm run test

# Install dependencies
npm install

# Update packages
npm update

# Check for vulnerabilities
npm audit

# Docker build
docker build -t youtube-clone .

# Docker run
docker run -p 3000:3000 youtube-clone

# Git push
git push origin main

# Deploy to Azure
az webapp up --resource-group youtube-clone-rg --name youtube-clone-app
```

## Deployment Checklist

```
Local Setup
  ☐ Install Node.js
  ☐ Install MongoDB
  ☐ Clone repository
  ☐ npm install
  ☐ Configure .env
  ☐ npm run dev (test locally)

Azure Setup
  ☐ Login to Azure (az login)
  ☐ Create resource group
  ☐ Create App Service
  ☐ Configure app settings

DevOps Setup
  ☐ Connect Git remote
  ☐ Push code
  ☐ Create pipeline
  ☐ Run pipeline
  ☐ Verify deployment

Post-Deployment
  ☐ Test application
  ☐ Configure domain
  ☐ Enable SSL
  ☐ Setup monitoring
```

## Troubleshooting

**Port 3000 in use?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**MongoDB connection failed?**
```bash
# Check MongoDB status
# Windows: services.msc
# macOS: brew services list
# Linux: systemctl status mongod
```

**Git push failed?**
```bash
# Update remote URL
git remote set-url origin https://prashantmukadam161119@dev.azure.com/...
git push -u origin main
```

## Support

See DEPLOYMENT_GUIDE.md for detailed step-by-step instructions.

---
Happy coding! 🚀
