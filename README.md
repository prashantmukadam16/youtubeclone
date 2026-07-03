<div align="center">

# 🚀 Azure DevOps CI/CD Pipeline for YouTube Clone on Microsoft Azure

### Production-Ready DevOps Project using Azure DevOps, Azure App Service, React.js & Node.js

[![Azure DevOps](https://img.shields.io/badge/Azure-DevOps-blue?logo=azure-devops)](https://azure.microsoft.com/)
[![Microsoft Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4?logo=microsoftazure)](https://azure.microsoft.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)](https://react.dev/)
[![YAML Pipeline](https://img.shields.io/badge/YAML-CI/CD-red)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()

---

## 📖 Project Overview

This project demonstrates a **Production-Ready Continuous Integration and Continuous Deployment (CI/CD) pipeline** for deploying a **React.js + Node.js YouTube Clone** using **Azure DevOps** and **Microsoft Azure App Service**.

The entire software delivery lifecycle is automated using Azure Pipelines, enabling developers to build, test, package, publish, and deploy applications with minimal manual intervention.

This repository showcases industry-standard DevOps practices including:

✅ Azure DevOps Repositories
✅ YAML Pipelines
✅ Azure App Service Deployment
✅ Azure Resource Manager Service Connection
✅ Self-hosted Build Agent
✅ Continuous Integration
✅ Continuous Deployment
✅ Automated Artifact Management
✅ Production Deployment Workflow

---

# 🏗 Production High-Level Architecture

```mermaid
flowchart TD

Developer[Developer]

Developer --> GitPush[Git Push]

GitPush --> Repo[Azure DevOps Repositories]

Repo --> Pipeline[Azure DevOps YAML Pipeline]

Pipeline --> Checkout[Checkout Source]

Checkout --> Node[Install Node.js]

Node --> Install[npm install]

Install --> Build[npm run build]

Build --> Verify[Verify Build]

Verify --> Archive[Archive Build]

Archive --> Artifact[Publish Artifact]

Artifact --> ServiceConnection[Azure Service Connection]

ServiceConnection --> AzureWebApp[Azure App Service]

AzureWebApp --> LiveApp[Live YouTube Clone]

```

---

# ☁ Azure Production Architecture

```mermaid
flowchart LR

Dev[Developer]

Repo[Azure DevOps Repo]

Pipeline[Azure Pipeline]

Agent[Self Hosted Agent]

SC[Azure Service Connection]

RG[Resource Group]

Plan[App Service Plan]

WebApp[Azure Web App]

Internet[Users]

Dev --> Repo

Repo --> Pipeline

Pipeline --> Agent

Agent --> SC

SC --> RG

RG --> Plan

Plan --> WebApp

WebApp --> Internet

```

---

# 🔄 Complete CI/CD Workflow

```text
Developer
      │
Git Push
      │
      ▼
Azure DevOps Repository
      │
      ▼
Pipeline Trigger
      │
      ▼
Checkout Code
      │
      ▼
Install Node.js
      │
      ▼
Install Dependencies
      │
      ▼
Build React Application
      │
      ▼
Verify Build
      │
      ▼
Archive Files
      │
      ▼
Publish Pipeline Artifact
      │
      ▼
Azure Service Connection
      │
      ▼
Deploy to Azure App Service
      │
      ▼
Production Application Live
```

---

# 📁 Repository Structure

```text
youtube-clone
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── backend
│   ├── src
│   │   └── App.js
│   ├── package.json
│   └── Dockerfile
├── Kubernetes
│   └── backend-deployment.yaml
├── azure-pipelines-1.yml
├── README.md
└── .gitignore
```



## 📂 Directory Description

| Folder/File | Description |
|--------------|-------------|
| **frontend/** | React.js frontend application source code. |
| **frontend/public/** | Static assets served directly by the React application. |
| **frontend/src/** | React components, styles, and application entry point. |
| **frontend/package.json** | Frontend dependencies and npm scripts. |
| **frontend/Dockerfile** | Docker configuration for the frontend application. |
| **backend/** | Node.js backend application source code. |
| **backend/src/** | Backend server implementation and API logic. |
| **backend/package.json** | Backend dependencies and npm scripts. |
| **backend/Dockerfile** | Docker configuration for the backend application. |
| **Kubernetes/** | Kubernetes deployment manifests. |
| **backend-deployment.yaml** | Kubernetes Deployment manifest for the backend application. |
| **azure-pipelines-1.yml** | Azure DevOps YAML pipeline for CI/CD automation. |
| **README.md** | Project documentation, architecture, setup guide, and deployment workflow. |
| **.gitignore** | Files and directories excluded from Git version control. |
---

# ⚙ Technology Stack

| Category | Technology |
|------------|----------------|
| Cloud | Microsoft Azure |
| CI/CD | Azure DevOps |
| Repository | Azure Repos |
| Frontend | React.js |
| Backend | Node.js |
| Runtime | Node.js |
| Deployment | Azure App Service |
| Build Agent | Self-hosted Windows Agent |
| Version Control | Git |
| Pipeline | YAML |

---

# 🚀 Step 1 — Create Azure Resources

Create the following Azure resources:

Azure Subscription
Resource Group
App Service Plan
Azure Web App
Configure Node.js Runtime
Enable Web App

---

# 🚀 Step 2 — Create Azure DevOps Project

Create:

Azure DevOps Organization
Azure DevOps Project
Azure Repository

Push source code

```
git init

git remote add origin <repository-url>

git add .

git commit -m "Initial Commit"

git push origin main
```

---

# 🚀 Step 3 — Configure Azure Service Connection

Create an Azure Resource Manager Service Connection.

Pipeline uses this secure connection to authenticate with Azure.

**Benefits**

Secure Authentication
No credentials inside YAML
RBAC Enabled

---

# 🚀 Step 4 — Configure Self Hosted Agent

Install Azure DevOps Agent

Configure Agent Pool

Register Agent

Verify Agent Online

**Benefits**

Faster Builds
Reusable Environment
Custom Software
Better Performance

---

# 🚀 Step 5 — Create YAML Pipeline

Create

```
azure-pipelines.yml
```

Pipeline Trigger

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:

- task: NodeTool@0
  displayName: 'Use Node.js'
  inputs:
    versionSpec: '18.x'

- task: Npm@1
  displayName: 'Install Frontend Dependencies'
  inputs:
    command: 'install'
    workingDir: 'frontend'

- task: Npm@1
  displayName: 'Build Frontend'
  inputs:
    command: 'custom'
    customCommand: 'run build'
    workingDir: 'frontend'

- script: |
    echo "Checking build folder"
    ls -la frontend
    ls -la frontend/build
  displayName: 'Verify Build Output'

- task: ArchiveFiles@2
  displayName: 'Archive Build'
  inputs:
    rootFolderOrFile: 'frontend/build'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/frontend.zip'
    replaceExistingArchive: true

- task: AzureWebApp@1
  displayName: 'Deploy Azure Web App'
  inputs:
    azureSubscription: 'prashantservice'
    appType: 'webAppLinux'
    appName: 'prashantyoutube'
    package: '$(Build.ArtifactStagingDirectory)/frontend.zip'
    startupCommand: 'pm2 serve /home/site/wwwroot --no-daemon --spa'
```

---

# 🔄 Azure Pipeline Workflow

```text
Initialize Pipeline
      │
Checkout Repository
      │
Install Node.js
      │
npm install
      │
npm run build
      │
Verify Build
      │
Archive Files
      │
Publish Artifact
      │
Deploy Azure Web App
      │
Application Live
```

---

# 📦 Pipeline Stages

## Stage 1

Initialize Build Environment

Allocate Agent
Download Tasks
Load Variables

---

## Stage 2

Checkout Repository

```
Checkout Source Code
```

---

## Stage 3

Install Node.js

```
UseNode Task
```

---

## Stage 4

Install Dependencies

```bash
npm install
```

---

## Stage 5

Build Application

```bash
npm run build
```

Output

```
build/
```

---

## Stage 6

Verify Build

Validation

Build Success
Static Files Generated
No Errors

---

## Stage 7

Archive Build

```
ArchiveFiles Task
```

Creates

```
application.zip
```

---

## Stage 8

Publish Artifact

Azure DevOps stores

Build Output
Deployment Package
Version History

---

## Stage 9

Deploy Azure Web App

Azure DevOps uses

```
AzureWebApp Task
```

Deployment

```
ZIP Deploy
```

---

## Stage 10

Production Deployment

Application becomes available on Azure App Service.

Deployment completed successfully.

---

# 📂 Artifact Flow

```text
Source Code

↓

Checkout

↓

Build

↓

Archive

↓

Artifact

↓

Azure App Service

↓

Production
```

---

# ☁ Azure Services Used

Azure DevOps
Azure Repositories
Azure Pipelines
Azure Resource Manager
Azure App Service
Azure Service Connection
Self-hosted Agent
Git
Node.js

---

# 🔒 Security Best Practices

Azure Resource Manager Service Connection
RBAC Access Control
Secure Pipeline Variables
No Hardcoded Credentials
Version Controlled YAML
Automated Deployments

---

# 📈 CI/CD Benefits

Before Automation

Manual Deployment
Manual File Copy
Human Errors
Slow Releases
No Version Tracking

After Automation

Automated CI/CD
One-click Deployment
Faster Releases
Consistent Builds
Reliable Deployment
Centralized Pipeline
Easy Rollback
Artifact Versioning

---

# 📸 Project Deliverables

Azure DevOps Repository
Azure YAML Pipeline
Azure App Service Deployment
Azure Service Connection
Self-hosted Agent Configuration
Production CI/CD Pipeline
Automated Deployment Workflow
React.js Frontend
Node.js Backend

---

# 🚀 Future Enhancements

Docker Containerization
Azure Container Registry
Azure Kubernetes Service (AKS)
Terraform Infrastructure as Code
SonarQube Code Analysis
OWASP Dependency Check
Trivy Security Scanning
Azure Key Vault
Azure Monitor
Application Insights
Multi-stage Release Pipeline
Blue-Green Deployment
Canary Deployment

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

# 👨‍💻 Author

**Prashant Mukadam**

DevOps | Cloud Engineer | Azure | CI/CD | Automation | Azure DevOps |


<div align="center">

# 🚀 Azure DevOps CI/CD Pipeline for YouTube Clone on Microsoft Azure

### Production-Ready CI/CD Architecture using Azure DevOps, Azure App Service, React.js and Node.js

[![Azure DevOps](https://img.shields.io/badge/Azure-DevOps-0078D7?logo=azure-devops&logoColor=white)](https://azure.microsoft.com/products/devops)
[![Microsoft Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![YAML](https://img.shields.io/badge/YAML-Pipeline-CB171E?logo=yaml&logoColor=white)](https://yaml.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📌 Project Overview

This repository demonstrates a **production-style Azure DevOps CI/CD implementation** for building and deploying a **YouTube Clone application** on **Microsoft Azure App Service**.

The project uses **Azure DevOps Repos**, **Azure Pipelines**, **YAML-based automation**, **Azure Resource Manager Service Connection**, and **Azure App Service** to automate the complete software delivery lifecycle from source-code commit to live cloud deployment.

The goal of this project is to show how a React/Node.js application can be deployed using a reliable, repeatable, and scalable DevOps workflow.

---

## 🎯 Project Objectives

- Build a YouTube Clone application using React.js and Node.js.
- Store and manage source code in Azure DevOps Repos.
- Create a YAML-based Azure DevOps CI/CD pipeline.
- Automatically install dependencies and build the frontend application.
- Package the production build as a deployment artifact.
- Deploy the application to Azure App Service.
- Follow production-oriented DevOps practices such as service connections, artifact handling, pipeline stages, and controlled deployment.

---

## 🧱 Technology Stack

| Layer | Technology |
|---|---|
| Cloud Platform | Microsoft Azure |
| Repository | Azure DevOps Repos |
| CI/CD | Azure DevOps Pipelines |
| Pipeline Format | YAML |
| Frontend | React.js |
| Backend | Node.js |
| Runtime | Node.js |
| Hosting | Azure App Service |
| Authentication to Azure | Azure Resource Manager Service Connection |
| Build Agent | Microsoft-hosted Ubuntu Agent / Self-hosted Agent |
| Version Control | Git |
| Package Manager | npm |

---

## 🏗️ Production High-Level Architecture

```mermaid
flowchart TD
    A[Developer] --> B[Git Push]
    B --> C[Azure DevOps Repos]
    C --> D[Azure DevOps YAML Pipeline]
    D --> E[Checkout Source Code]
    E --> F[Install Node.js]
    F --> G[Install Dependencies]
    G --> H[Build React Application]
    H --> I[Verify Build Output]
    I --> J[Archive Build Files]
    J --> K[Publish Build Artifact]
    K --> L[Azure Service Connection]
    L --> M[Azure App Service]
    M --> N[Live YouTube Clone Application]
```

> Draw.io version: [`docs/architecture/azure-production-architecture.drawio`](docs/architecture/azure-production-architecture.drawio)

---

## ☁️ Azure Production Architecture

```mermaid
flowchart LR
    Users[Internet Users] --> WebApp[Azure App Service]
    WebApp --> Runtime[Node.js Runtime]
    Runtime --> App[YouTube Clone Application]

    Dev[Developer] --> Repo[Azure DevOps Repo]
    Repo --> Pipeline[Azure DevOps Pipeline]
    Pipeline --> Agent[Build Agent]
    Agent --> Artifact[Build Artifact]
    Artifact --> ServiceConnection[Azure Service Connection]
    ServiceConnection --> ResourceGroup[Azure Resource Group]
    ResourceGroup --> Plan[App Service Plan]
    Plan --> WebApp
```

---

## 🔄 Complete CI/CD Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Repo as Azure DevOps Repo
    participant Pipeline as Azure Pipeline
    participant Agent as Build Agent
    participant Artifact as Pipeline Artifact
    participant Azure as Azure App Service
    participant User as End User

    Dev->>Repo: Push code to main branch
    Repo->>Pipeline: Trigger CI/CD pipeline
    Pipeline->>Agent: Allocate build agent
    Agent->>Repo: Checkout source code
    Agent->>Agent: Install Node.js
    Agent->>Agent: Run npm install
    Agent->>Agent: Run npm run build
    Agent->>Artifact: Archive and publish build output
    Pipeline->>Azure: Deploy ZIP package using Service Connection
    User->>Azure: Access live YouTube Clone application
```

---

## 📁 Repository Structure

```text
youtube-clone/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   └── App.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── Kubernetes/
│   └── backend-deployment.yaml
├── docs/
│   └── architecture/
│       ├── azure-production-architecture.drawio
│       └── azure-repo-pipeline-workflow.drawio
├── azure-pipelines.yml
├── README.md
└── .gitignore
```

---

## 📂 Directory Explanation

| Path | Purpose |
|---|---|
| `frontend/` | React.js frontend source code. |
| `frontend/public/` | Static public assets for the React application. |
| `frontend/src/` | React components, styling, routing, and application logic. |
| `frontend/package.json` | Frontend dependencies and npm build scripts. |
| `frontend/Dockerfile` | Optional container build file for frontend deployment. |
| `backend/` | Node.js backend source code. |
| `backend/src/` | Backend API/server logic. |
| `backend/package.json` | Backend dependencies and npm scripts. |
| `backend/Dockerfile` | Optional container build file for backend deployment. |
| `Kubernetes/` | Kubernetes deployment manifests for future AKS deployment. |
| `azure-pipelines.yml` | Azure DevOps CI/CD pipeline definition. |
| `docs/architecture/` | Draw.io architecture and workflow diagrams. |
| `.gitignore` | Files and folders excluded from Git tracking. |
| `README.md` | Complete project documentation. |

---

## ✅ Prerequisites

Before starting, ensure the following are available:

- Microsoft Azure subscription
- Azure DevOps organization
- Azure DevOps project
- Azure Repos enabled
- Azure App Service created
- Azure Resource Manager Service Connection configured
- Node.js runtime configured on Azure App Service
- Git installed locally
- npm installed locally

---

## 🚀 Deployment Steps

## Step 1 — Create Azure Resource Group

Create a resource group to organize all Azure resources used by the project.

```bash
az group create \
  --name rg-youtube-clone-prod \
  --location centralindia
```

---

## Step 2 — Create Azure App Service Plan

Create an App Service Plan to host the web application.

```bash
az appservice plan create \
  --name asp-youtube-clone-prod \
  --resource-group rg-youtube-clone-prod \
  --sku B1 \
  --is-linux
```

---

## Step 3 — Create Azure Web App

Create the Azure Web App where the YouTube Clone will be deployed.

```bash
az webapp create \
  --name prashantyoutube \
  --resource-group rg-youtube-clone-prod \
  --plan asp-youtube-clone-prod \
  --runtime "NODE:18-lts"
```

---

## Step 4 — Configure Startup Command

For a React static build deployed to Azure App Service, configure the startup command.

```bash
az webapp config set \
  --name prashantyoutube \
  --resource-group rg-youtube-clone-prod \
  --startup-file "pm2 serve /home/site/wwwroot --no-daemon --spa"
```

---

## Step 5 — Create Azure DevOps Project

Create an Azure DevOps project and repository.

Recommended project setup:

| Setting | Value |
|---|---|
| Project Name | `youtube-clone-devops` |
| Visibility | Public or Private |
| Version Control | Git |
| Work Item Process | Agile |

---

## Step 6 — Push Source Code to Azure Repos

From the project root directory, run:

```bash
git init
git add .
git commit -m "Initial commit - YouTube Clone Azure DevOps CI/CD"
git branch -M main
git remote add origin <azure-repos-url>
git push -u origin main
```

---

## Step 7 — Create Azure Service Connection

In Azure DevOps:

```text
Project Settings
└── Service connections
    └── New service connection
        └── Azure Resource Manager
            └── Service principal / Workload identity federation
```

Recommended name:

```text
prashantservice
```

The pipeline uses this service connection to authenticate securely with Azure. No Azure credentials should be hardcoded in the YAML file.

---

## Step 8 — Create Azure Pipeline

Create a file named:

```text
azure-pipelines.yml
```

Add the following pipeline:

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  nodeVersion: '18.x'
  frontendWorkingDirectory: 'frontend'
  buildOutputPath: 'frontend/build'
  artifactName: 'frontend.zip'
  azureServiceConnection: 'prashantservice'
  azureWebAppName: 'prashantyoutube'

steps:
- task: NodeTool@0
  displayName: 'Use Node.js $(nodeVersion)'
  inputs:
    versionSpec: '$(nodeVersion)'

- task: Npm@1
  displayName: 'Install Frontend Dependencies'
  inputs:
    command: 'install'
    workingDir: '$(frontendWorkingDirectory)'

- task: Npm@1
  displayName: 'Build Frontend'
  inputs:
    command: 'custom'
    customCommand: 'run build'
    workingDir: '$(frontendWorkingDirectory)'

- script: |
    echo "Verifying React build output"
    ls -la $(buildOutputPath)
  displayName: 'Verify Build Output'

- task: ArchiveFiles@2
  displayName: 'Archive Frontend Build'
  inputs:
    rootFolderOrFile: '$(buildOutputPath)'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/$(artifactName)'
    replaceExistingArchive: true

- publish: '$(Build.ArtifactStagingDirectory)/$(artifactName)'
  displayName: 'Publish Build Artifact'
  artifact: 'frontend-drop'

- task: AzureWebApp@1
  displayName: 'Deploy to Azure App Service'
  inputs:
    azureSubscription: '$(azureServiceConnection)'
    appType: 'webAppLinux'
    appName: '$(azureWebAppName)'
    package: '$(Build.ArtifactStagingDirectory)/$(artifactName)'
    startupCommand: 'pm2 serve /home/site/wwwroot --no-daemon --spa'
```

---

## Step 9 — Run the Pipeline

In Azure DevOps:

```text
Pipelines
└── New Pipeline
    └── Azure Repos Git
        └── Select Repository
            └── Existing Azure Pipelines YAML file
                └── /azure-pipelines.yml
```

Run the pipeline and verify each stage completes successfully.

---

## Step 10 — Verify Deployment

After successful deployment, open the Azure Web App URL:

```text
https://<app-name>.azurewebsites.net
```

Expected result:

```text
YouTube Clone application loads successfully from Azure App Service.
```

---

## 🧪 Pipeline Stage Details

| Stage | Description | Output |
|---|---|---|
| Initialize Job | Allocates build agent and loads pipeline metadata. | Agent ready |
| Checkout Source | Pulls latest source code from Azure Repos. | Code available on agent |
| Use Node.js | Installs/configures required Node.js version. | Node.js runtime ready |
| Install Dependencies | Runs `npm install` inside frontend folder. | `node_modules` installed |
| Build Frontend | Runs `npm run build`. | Production React build generated |
| Verify Build | Checks whether build output exists. | Build validation completed |
| Archive Build | Compresses build output into ZIP. | `frontend.zip` created |
| Publish Artifact | Stores package in Azure DevOps artifact storage. | Artifact available for deployment |
| Deploy Web App | Deploys ZIP to Azure App Service. | Application deployed |
| Production Live | Users access the application. | Live YouTube Clone |

---

## 📦 Artifact Flow

```mermaid
flowchart LR
    Source[Source Code] --> Checkout[Checkout]
    Checkout --> Build[Build]
    Build --> Zip[Archive ZIP]
    Zip --> Artifact[Pipeline Artifact]
    Artifact --> Deploy[ZIP Deploy]
    Deploy --> App[Azure App Service]
    App --> Live[Production Live]
```

---

## 🔐 Production Security Best Practices

- Use Azure Resource Manager Service Connection instead of hardcoded credentials.
- Apply least-privilege RBAC permissions to the service connection.
- Store secrets in Azure DevOps variable groups or Azure Key Vault.
- Do not commit `.env`, credentials, tokens, or connection strings.
- Protect the `main` branch using branch policies.
- Require pull requests before production deployment.
- Enable deployment approvals for production environments.
- Enable App Service logs and monitoring.
- Use HTTPS-only access on Azure App Service.

---

## 📈 Before vs After CI/CD Automation

| Before Automation | After Automation |
|---|---|
| Manual deployment | Automated CI/CD deployment |
| Manual file copy | ZIP deployment through pipeline |
| Higher human error risk | Consistent repeatable deployment |
| Slow release process | Faster release cycle |
| No standard workflow | YAML-based standardized workflow |
| Difficult rollback tracking | Artifact-based version tracking |

---

## 🧩 Azure Services Used

| Azure Service | Usage |
|---|---|
| Azure DevOps Repos | Source-code repository |
| Azure DevOps Pipelines | Build and deployment automation |
| Azure Service Connection | Secure authentication from pipeline to Azure |
| Azure App Service | Application hosting platform |
| Azure App Service Plan | Compute plan for Web App |
| Azure Resource Group | Logical grouping of Azure resources |
| Azure Monitor / Logs | Recommended production monitoring |
| Azure Key Vault | Recommended secret management |

---

## 🧰 Troubleshooting

| Issue | Possible Cause | Fix |
|---|---|---|
| Pipeline does not trigger | Branch trigger mismatch | Confirm code is pushed to `main` branch |
| `npm install` fails | Missing or invalid `package.json` | Check `frontend/package.json` |
| `npm run build` fails | Build script missing | Add `"build"` script in `package.json` |
| Build folder not found | React output path mismatch | Check whether output is `build` or `dist` |
| Azure deployment fails | Service connection permission issue | Verify service connection RBAC access |
| Web App shows blank page | SPA routing/startup issue | Use `pm2 serve /home/site/wwwroot --no-daemon --spa` |
| App does not load | Runtime mismatch | Verify Node.js version in App Service |

---

## 🚀 Future Enhancements

- Add backend deployment pipeline.
- Add multi-stage pipeline for Dev, Test, and Production.
- Add approval gates before production deployment.
- Add Docker image build and push to Azure Container Registry.
- Deploy containerized application to Azure Kubernetes Service.
- Add Terraform or Bicep for Infrastructure as Code.
- Add SonarQube code-quality scanning.
- Add OWASP dependency scanning.
- Add Trivy container image scanning.
- Integrate Azure Key Vault for secrets.
- Enable Azure Monitor and Application Insights.
- Implement Blue-Green or Canary deployment strategy.

---

## 📸 Project Deliverables

- Azure DevOps Repository
- Azure YAML Pipeline
- Azure App Service deployment
- Azure Service Connection
- Build artifact generation
- Automated production deployment workflow
- React.js YouTube Clone frontend
- Node.js backend structure
- Draw.io architecture diagrams
- GitHub-ready README documentation

---

## 👨‍💻 Author

**Prashant Mukadam**  
DevOps | Cloud Engineer | Azure | CI/CD | Automation | Azure DevOps

---

## ⭐ Support

If this project helped you understand Azure DevOps CI/CD deployment on Azure App Service, consider giving this repository a ⭐.

