# YouTube Clone Application

A full-featured YouTube clone built with Node.js and Express, deployed on Azure App Service with CI/CD pipeline using Azure DevOps.

## Features

- User authentication (registration & login)
- Video upload & management
- Like/dislike videos
- Subscribe to channels
- Comments on videos
- Video search functionality
- User profiles
- Responsive design
- Docker support
- Azure DevOps CI/CD pipeline

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, HTML5, CSS3, JavaScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Azure App Service
- **CI/CD**: Azure DevOps Pipelines
- **Containerization**: Docker

## Prerequisites

- Node.js 18.x or higher
- MongoDB (local or MongoDB Atlas)
- Azure subscription
- Git
- Docker (optional)
- Azure CLI

## Installation

### 1. Clone the repository

```bash
git clone https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project
cd youtube
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Azure Configuration
AZURE_STORAGE_ACCOUNT_NAME=your_storage_account
AZURE_STORAGE_ACCOUNT_KEY=your_storage_key
AZURE_CONTAINER_NAME=videos

# App Configuration
APP_NAME=YouTube Clone
APP_URL=http://localhost:3000

# File Upload Settings
MAX_FILE_SIZE=5368709120
UPLOAD_PATH=./public/uploads
```

### 4. Start MongoDB

For local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas cloud service.

### 5. Run the application

**Development mode with nodemon:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
youtube-clone/
├── src/
│   ├── server.js              # Main application entry
│   ├── controllers/           # Business logic
│   │   ├── videoController.js
│   │   └── userController.js
│   ├── models/                # Database schemas
│   │   ├── User.js
│   │   └── Video.js
│   ├── routes/                # API routes
│   │   ├── videos.js
│   │   ├── users.js
│   │   └── index.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   └── views/                 # EJS templates
│       ├── layouts/
│       ├── videos/
│       └── users/
├── public/
│   ├── css/                   # Stylesheets
│   ├── js/                    # Client-side scripts
│   └── uploads/               # Video upload directory
├── azure/                     # Azure deployment files
│   ├── template.json          # ARM template
│   └── parameters.json        # ARM parameters
├── package.json               # Dependencies
├── .env                       # Environment variables
├── web.config                 # IIS configuration
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose
└── azure-pipelines.yml        # CI/CD pipeline
```

## API Endpoints

### Videos
- `GET /videos` - Get all public videos
- `GET /videos/search?q=query` - Search videos
- `GET /videos/watch/:id` - Watch video
- `GET /videos/upload` - Video upload form
- `POST /videos/upload` - Upload video
- `POST /videos/:id/like` - Like video
- `POST /videos/:id/comment` - Add comment
- `DELETE /videos/:id` - Delete video

### Users
- `POST /users/register` - Register user
- `POST /users/login` - Login user
- `GET /users/profile/:id` - Get user profile
- `GET /users/:id/videos` - Get user's videos
- `POST /users/:id/subscribe` - Subscribe to user
- `PUT /users/profile` - Update profile

## Docker Usage

### Build Docker image

```bash
docker build -t youtube-clone:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

This will start:
- Node.js application on port 3000
- MongoDB on port 27017

### Stop Docker services

```bash
docker-compose down
```

## Azure Deployment

### Prerequisites

- Azure subscription
- Azure CLI installed
- Service connection configured in Azure DevOps

### Step 1: Create Resource Group

```bash
az group create \
  --name youtube-clone-rg \
  --location eastus
```

### Step 2: Deploy using ARM Template

```bash
az deployment group create \
  --resource-group youtube-clone-rg \
  --template-file azure/template.json \
  --parameters azure/parameters.json
```

### Step 3: Configure App Service

```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-prod \
  --settings \
    NODE_ENV=production \
    MONGODB_URI=your_mongodb_connection_string \
    JWT_SECRET=your_secret_key
```

### Step 4: Deploy code

```bash
# Build and deploy
az webapp up \
  --resource-group youtube-clone-rg \
  --name youtube-clone-prod \
  --runtime NODE:18-lts \
  --runtime-version 18
```

## Azure DevOps Pipeline

The `azure-pipelines.yml` file contains the CI/CD configuration:

### Pipeline Stages

1. **Build Stage**
   - Install dependencies
   - Run builds
   - Code quality analysis (SonarCloud)
   - Publish artifacts

2. **Test Stage**
   - Run unit tests
   - Generate test reports

3. **Deploy Dev Stage**
   - Deploy to dev App Service
   - Triggered on `develop` branch

4. **Deploy Prod Stage**
   - Deploy to production App Service
   - Triggered on `main` branch

### Setup Azure DevOps Pipeline

1. Go to Azure DevOps project
2. Click "Pipelines" → "New Pipeline"
3. Select your repository
4. Choose "Existing Azure Pipelines YAML file"
5. Select `azure-pipelines.yml`
6. Click "Run"

### Configure Service Connections

1. Project Settings → Service Connections
2. Create new "Azure Resource Manager" connection
3. Create Docker Registry connection (if using containers)

## Git Setup & Push to Azure DevOps

### Configure Git Remote

```bash
# Add Azure DevOps remote
git remote add origin https://prashantmukadam161119@dev.azure.com/prashantmukadam161119/jio-hcmp-prod-project/_git/jio-hcmp-prod-project

# Verify remote
git remote -v
```

### Push Code to Azure DevOps

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: YouTube Clone application"

# Push to main branch
git push -u origin main

# Or push to develop branch
git push -u origin develop
```

## Testing

Run tests with:

```bash
npm run test
```

## Environment-Specific Configurations

### Development (.env)
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
```

### Production (.env.production)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/youtube-clone
JWT_SECRET=secure_production_secret_key
```

## Monitoring & Logging

### Azure Application Insights

```bash
# Enable Application Insights
az webapp config appsettings set \
  --resource-group youtube-clone-rg \
  --name youtube-clone-prod \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=your_key
```

### Check Application Logs

```bash
# Stream logs
az webapp log tail \
  --resource-group youtube-clone-rg \
  --name youtube-clone-prod
```

## Security Best Practices

1. **Environment Variables**: Store sensitive data in Azure Key Vault
2. **HTTPS**: Enable HTTPS only
3. **CORS**: Configure CORS properly
4. **Rate Limiting**: Implement rate limiting
5. **Input Validation**: Validate all user inputs
6. **Authentication**: Use strong JWT secrets
7. **Database**: Use MongoDB Atlas with network access control

## Performance Optimization

1. **Caching**: Implement Redis caching
2. **CDN**: Use Azure CDN for static assets
3. **Database Indexing**: Add indexes to frequently queried fields
4. **Compression**: Enable gzip compression
5. **Lazy Loading**: Implement lazy loading for videos

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### MongoDB connection issues
```bash
# Check MongoDB status
mongosh

# Or test connection string
mongoose.connect(process.env.MONGODB_URI)
```

### Azure deployment failed
```bash
# Check deployment status
az deployment group list --resource-group youtube-clone-rg

# View deployment errors
az deployment group show \
  --resource-group youtube-clone-rg \
  --name deployment_name
```

## Future Enhancements

- [ ] Video streaming with adaptive bitrate
- [ ] Live streaming support
- [ ] Recommendation algorithm
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Content moderation
- [ ] Mobile app
- [ ] Multi-language support

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

## License

MIT License - feel free to use this project

## Support

For support, email: prashantmukadam161119@gmail.com

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Azure resources created
- [ ] Service connections configured
- [ ] Pipeline created and tested
- [ ] Code pushed to repository
- [ ] Pipeline run successfully
- [ ] Application accessible
- [ ] SSL certificate configured
- [ ] Monitoring enabled

---

**Last Updated**: June 2024
