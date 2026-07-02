# YouTube Clone - Step-by-Step Deployment Guide

## Complete Deployment Process for Azure DevOps

This guide provides step-by-step instructions to deploy the YouTube Clone application to Azure using DevOps pipeline.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Local Setup](#phase-1-local-setup)
3. [Phase 2: Azure Setup](#phase-2-azure-setup)
4. [Phase 3: Azure DevOps Configuration](#phase-3-azure-devops-configuration)
5. [Phase 4: Deploy Application](#phase-4-deploy-application)
6. [Phase 5: Post-Deployment](#phase-5-post-deployment)

---

## Prerequisites

### Required Software
- [ ] Node.js 18.x LTS
- [ ] Git
- [ ] MongoDB (local or Atlas account)
- [ ] Azure CLI
- [ ] VS Code or any code editor
- [ ] Docker (optional, for container deployment)

### Required Accounts & Access
- [ ] Azure Subscription (with credits or paid plan)
- [ ] Azure DevOps Organization & Project
- [ ] MongoDB Atlas Account
- [ ] GitHub/Git Repository Access

### Installation Commands

```bash
# Install Node.js
# Download from: https://nodejs.org/

# Verify installations
node --version    # v18.x.x
npm --version     # 9.x.x
git --version     # git version 2.x.x

# Install Azure CLI
# Windows: https://aka.ms/installazurecliwindows
# macOS: brew install azure-cli
# Linux: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Verify Azure CLI
az --version
```

---

## Phase 1: Local Setup

### Step 1.1: Clone or Create Project

```bash
# Navigate to your workspace
cd "d:\DevOps Pipeline\youtube clone\youtube"

# Initialize git (if not already done)
git init

# Check git status
git status
```

### Step 1.2: Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list
```

### Step 1.3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
```bash
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account and free tier cluster
3. Get connection string
4. Update .env file with connection string
```

### Step 1.4: Configure Environment Variables

```bash
# Create .env file
echo NODE_ENV=development > .env
echo PORT=3000 >> .env
echo MONGODB_URI=mongodb://localhost:27017/youtube-clone >> .env
echo JWT_SECRET=your_super_secret_key_here >> .env
echo JWT_EXPIRE=7d >> .env

# For Windows, use PowerShell or create manually
# Create file: .env with content:
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

### Step 1.5: Test Locally

```bash
# Start development server
npm run dev

# Expected output:
# Server running on port 3000
# Environment: development

# Test in browser
# Open: http://localhost:3000

# Check health endpoint
# curl http://localhost:3000/health
```

---

## Phase 2: Azure Setup

### Step 2.1: Login to Azure

```bash
# Login to Azure
az login

# If in CI/CD, use service principal
az login --service-principal \
  -u <app-id> \
  -p <password> \
  --tenant <tenant-id>

# Set default subscription
az account set --subscription "<subscription-id>"

# Verify
az account show
```

### Step 2.2: Create Resource Group

```bash
# Create resource group
az group create \
  --name youtube-clone-rg \
  --location eastus

# List resource groups to verify
az group list --output table

# Expected output:
# Name                Location
# ─────────────────── ─────────
# youtube-clone-rg    eastus
```

### Step 2.3: Create App Service Plan

```bash
# Create App Service Plan (Linux)
az appservice plan create \
  --name youtube-clone-plan \
  --resource-group youtube-clone-rg \
  --sku B2 \
  --is-linux

# List plans
az appservice plan list --resource-group youtube-clone-rg --output table
```

### Step 2.4: Create Web App

```bash
# Create Web App
az webapp create \
  --resource-group youtube-clone-rg \
  --plan youtube-clone-plan \
  --name youtube-clone-app \
  --runtime "NODE|18-lts"

# Get App URL
az webapp show \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --query "defaultHostName" -o tsv

# Expected output:
# youtube-clone-app.azurewebsites.net
```

### Step 2.5: Configure App Settings

```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --settings \
    NODE_ENV=production \
    PORT=3000 \
    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/youtube-clone \
    JWT_SECRET=your_production_secret_key_change_me

# Verify settings
az webapp config appsettings list \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app
```

### Step 2.6: Configure Startup Script

```bash
# Set startup command
az webapp config set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --startup-file "npm start"

# Alternative: Set in web.config (already provided)
```

### Step 2.7: Enable Logging

```bash
# Enable web server logging
az webapp log config \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --web-server-logging filesystem

# Stream logs
az webapp log tail \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app
```

---

## Phase 3: Azure DevOps Configuration

### Step 3.1: Create Azure DevOps Project

```bash
# Navigate to Azure DevOps
# https://dev.azure.com

# Steps:
1. Click on your organization
2. Click "New project"
3. Enter project name: "youtube-clone-project"
4. Select visibility: Private
5. Click "Create"
```

### Step 3.2: Create Repository

```bash
# Option A: Use existing repo
# In Azure DevOps → Repos → Clone URL

# Option B: Create new repo
# In Azure DevOps → Repos → New repository

# Get clone URL
# Format: https://<org>@dev.azure.com/<org>/<project>/_git/<repo>
```

### Step 3.3: Connect Local Git to Azure DevOps

```bash
# Add Azure DevOps as remote
git remote add origin https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project

# Verify remote
git remote -v

# Expected output:
# origin  https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project (fetch)
# origin  https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project (push)
```

### Step 3.4: Push Code to Azure DevOps

```bash
# Stage all files
git add .

# Commit with message
git commit -m "Initial commit: YouTube Clone application with Azure deployment"

# Push to main branch
git push -u origin main

# Or push to develop branch
git branch -M develop
git push -u origin develop
```

### Step 3.5: Create Service Connection

```bash
# In Azure DevOps:
# 1. Project Settings → Service Connections
# 2. New Service Connection
# 3. Select "Azure Resource Manager"
# 4. Choose "Service Principal (automatic)"
# 5. Select subscription and resource group
# 6. Name: "Azure-Subscription-Connection"
# 7. Grant access to pipelines
```

```bash
# Alternative: Use Azure CLI
az ad sp create-for-rbac \
  --role Contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/youtube-clone-rg

# Output will show:
# {
#   "appId": "xxx",
#   "displayName": "azure-cli-xxx",
#   "password": "xxx",
#   "tenant": "xxx"
# }
```

---

## Phase 4: Deploy Application

### Step 4.1: Create Pipeline

```bash
# In Azure DevOps:
# 1. Pipelines → New Pipeline
# 2. Select "Azure Repos Git"
# 3. Select repository: "youtube-clone"
# 4. Select "Existing Azure Pipelines YAML file"
# 5. Select Branch: "main"
# 6. Select Path: "azure-pipelines.yml"
# 7. Click "Continue"
```

### Step 4.2: Configure Pipeline Variables

```bash
# In Pipeline settings:
# 1. Click "Edit" on pipeline
# 2. Click "Variables"
# 3. Add variables:

Variable Name                Value
─────────────────────────   ─────────────────────
dockerRegistryServiceConnection    your-service-connection
containerRegistry           myregistry.azurecr.io
imageRepository             youtube-clone
azureSubscription           Azure-Subscription-Connection
appServiceName              youtube-clone-app
resourceGroup               youtube-clone-rg
```

### Step 4.3: Run Pipeline

```bash
# Method 1: Web UI
# 1. Click "Run Pipeline"
# 2. Select branch: "main"
# 3. Click "Run"

# Method 2: Azure CLI
az pipelines run \
  --name "youtube-clone" \
  --project "jio-hcmp-prod-project"

# Check pipeline status
az pipelines runs list \
  --project "jio-hcmp-prod-project"
```

### Step 4.4: Monitor Pipeline Execution

```bash
# Watch pipeline logs
# In Azure DevOps → Pipelines → recent run

# Expected stages:
# ✓ Build Stage (5-10 min)
# ✓ Test Stage (3-5 min)
# ✓ Deploy Dev (5 min) - if on develop branch
# ✓ Deploy Prod (5 min) - if on main branch

# Check task logs for any errors
```

### Step 4.5: Verify Deployment

```bash
# Check App Service status
az webapp show \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --query "state" -o tsv

# Expected: Running

# Get app URL
az webapp show \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --query "defaultHostName" -o tsv

# Test application
curl https://youtube-clone-app.azurewebsites.net/health

# Expected response:
# {"status":"OK","timestamp":"2024-06-03T..."}
```

---

## Phase 5: Post-Deployment

### Step 5.1: Configure Custom Domain (Optional)

```bash
# Add custom domain
az webapp config hostname add \
  --resource-group youtube-clone-rg \
  --webapp-name youtube-clone-app \
  --hostname yourdomain.com

# Create DNS CNAME record pointing to:
# youtube-clone-app.azurewebsites.net
```

### Step 5.2: Enable SSL/TLS

```bash
# Create Free SSL certificate
az webapp config ssl bind \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --certificate-thumbprint <thumb>

# Or use Azure-managed certificate
# (Configured automatically for *.azurewebsites.net)
```

### Step 5.3: Configure Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app youtube-clone-insights \
  --location eastus \
  --resource-group youtube-clone-rg \
  --application-type web

# Get instrumentation key
az monitor app-insights component show \
  --app youtube-clone-insights \
  --resource-group youtube-clone-rg \
  --query "instrumentationKey" -o tsv

# Add to App Service
az webapp config appsettings set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=<key>
```

### Step 5.4: Setup Continuous Deployment

```bash
# Already configured in azure-pipelines.yml
# But can also setup auto-deployment:

# Option: Deployment slots for zero-downtime deployment
az webapp deployment slot create \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --slot staging

# Swap slots after testing
az webapp deployment slot swap \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --slot staging
```

### Step 5.5: Setup Monitoring & Alerts

```bash
# Create metric alert for high CPU
az monitor metrics alert create \
  --name "high-cpu-alert" \
  --resource-group youtube-clone-rg \
  --resource /subscriptions/<id>/resourceGroups/youtube-clone-rg/providers/Microsoft.Web/sites/youtube-clone-app \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m

# Create log alert
az monitor log-analytics query \
  --workspace-id <workspace-id> \
  --analytics-query 'requests | where toint(resultCode) >= 500'
```

### Step 5.6: Test Application Features

```bash
# Health check
curl https://youtube-clone-app.azurewebsites.net/health

# Test homepage
curl https://youtube-clone-app.azurewebsites.net/

# Test API
curl https://youtube-clone-app.azurewebsites.net/videos

# Test search
curl "https://youtube-clone-app.azurewebsites.net/videos/search?q=test"
```

---

## Troubleshooting

### Issue: Pipeline fails at Deploy stage

```bash
# Check deployment logs
az webapp log tail \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --provider Application

# Check App Service Plan
az appservice plan show \
  --name youtube-clone-plan \
  --resource-group youtube-clone-rg

# Ensure app has necessary permissions
```

### Issue: Application not starting

```bash
# Check application logs
az webapp log tail \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app

# Check startup command
az webapp config show \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app

# Restart app
az webapp restart \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app
```

### Issue: Connection to MongoDB failing

```bash
# Verify MongoDB connection string
echo $MONGODB_URI

# Test connection
mongosh "your_connection_string"

# Check App Service environment
az webapp config appsettings list \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app
```

### Issue: Git push fails

```bash
# Update remote
git remote set-url origin https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project

# Generate PAT token for authentication
# https://dev.azure.com/<org>/_usersSettings/tokens

# Try push again
git push -u origin main
```

---

## Rollback Procedures

### Rollback Deployment

```bash
# Redeploy previous version
az webapp create --resource-group youtube-clone-rg \
  --plan youtube-clone-plan \
  --name youtube-clone-app \
  --deployment-source-url https://github.com/your-repo \
  --deployment-source-branch main

# Or use deployment slots
az webapp deployment slot swap \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --slot staging
```

### Restore from backup

```bash
# List backups
az webapp config backup list \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app

# Restore backup
az webapp config backup restore \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --backup-id <backup-id>
```

---

## Performance Optimization

### Scale Up App Service Plan

```bash
# Change SKU
az appservice plan update \
  --name youtube-clone-plan \
  --resource-group youtube-clone-rg \
  --sku S1

# Scale out (multiple instances)
az appservice plan update \
  --name youtube-clone-plan \
  --resource-group youtube-clone-rg \
  --number-of-workers 2
```

### Enable caching

```bash
# Application-level caching (in code)
# Already implemented in controllers

# Web server caching
az webapp config appsettings set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-app \
  --settings CACHE_TTL=3600
```

---

## Cost Estimation

| Resource | Tier | Estimated Cost/Month |
|----------|------|---------------------|
| App Service Plan | B2 | $50-100 |
| MongoDB Atlas | M0 (Free) | $0 |
| Storage | 100 GB | $5-10 |
| Application Insights | Basic | $0.5-2 |
| **Total** | | **$55-112** |

---

## Next Steps

1. ✅ Complete all phases
2. ✅ Test application features
3. ✅ Configure custom domain
4. ✅ Setup monitoring
5. ✅ Document API endpoints
6. ✅ Create backup strategy
7. ✅ Plan scaling strategy

---

**Support & Questions**: prashantmukadam161119@gmail.com

**Last Updated**: June 2024
