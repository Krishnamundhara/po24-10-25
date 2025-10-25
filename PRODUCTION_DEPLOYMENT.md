# Production Deployment Guide

## Overview
This guide covers deploying your Purchase Order application to production with:
- **Frontend:** Netlify
- **Backend:** Railway
- **Database:** Neon PostgreSQL (Already configured)

## Prerequisites
- GitHub account with repository access
- Netlify account
- Railway account
- Environment variables configured

---

## Step 1: Prepare Your Application

### Frontend (.env.production)
The file `frontend/.env.production` is configured for production:
```
VITE_API_URL=https://your-railway-backend-url.railway.app
```

### Backend Production Build
Your backend is ready with:
- TypeScript compilation (`npm run build`)
- Production start script (`npm start`)
- Procfile for platform detection

---

## Step 2: Deploy Backend to Railway

### Option A: Railway Dashboard (Recommended)

1. **Connect GitHub Repository**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Select "Deploy from GitHub"
   - Authorize and select your repository

2. **Configure Environment Variables**
   - In Railway dashboard, go to Variables
   - Add the following:
   ```
   PORT=4000
   NODE_ENV=production
   DATABASE_URL=postgresql://neondb_owner:npg_Y3RFTiJOLGc5@ep-rapid-resonance-a129otdt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   FRONTEND_URL=https://your-netlify-domain.netlify.app
   ```

3. **Deploy**
   - Railway will auto-detect Node.js
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Your backend URL: `https://your-service.railway.app`

### Option B: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project in backend directory
cd backend
railway init

# Set environment variables
railway variables set PORT=4000
railway variables set NODE_ENV=production
railway variables set DATABASE_URL="your_database_url"
railway variables set FRONTEND_URL="your_frontend_url"

# Deploy
railway up
```

---

## Step 3: Deploy Frontend to Netlify

### Option A: Netlify Dashboard (Recommended)

1. **Connect GitHub Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect GitHub account
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend` (if monorepo)

3. **Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add:
   ```
   VITE_API_URL=https://your-railway-backend-url.railway.app
   ```

4. **Deploy**
   - Netlify will auto-build and deploy
   - Your frontend URL: `https://your-site.netlify.app`

### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from frontend directory
cd frontend
netlify deploy

# For production deploy
netlify deploy --prod
```

---

## Step 4: Update Frontend Configuration

Once you have your Railway backend URL, update the frontend environment:

1. **Update .env.production**
```
VITE_API_URL=https://your-railway-service.railway.app
```

2. **Commit and push to main**
```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push origin main
```

3. Netlify will automatically rebuild and deploy

---

## Step 5: Update Backend CORS Settings

Update the CORS configuration in `backend/src/index.ts` with your production frontend URL:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-netlify-domain.netlify.app', // Add your Netlify URL
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Step 6: Database Migrations

Your database schema is automatically created on first connection. The `initializeDatabase()` function in your backend will:
- Create `purchase_orders` table
- Create `company_profile` table
- Create necessary indexes

No manual migration needed!

---

## GitHub Actions Setup (Optional - For CI/CD)

We've included `.github/workflows/deploy.yml` for automated deployment.

### Setup GitHub Secrets:

Go to Repository Settings → Secrets and variables → Actions

1. **NETLIFY_AUTH_TOKEN**
   - Get from: Netlify → User Settings → Applications
   - Create new Personal Access Token

2. **NETLIFY_SITE_ID**
   - Get from: Netlify → Site Settings → General
   - Look for "Site ID"

3. **RAILWAY_TOKEN**
   - Get from: Railway → Account → Tokens
   - Create new API token

4. **RAILWAY_SERVICE_ID**
   - Get from: Railway → Your Project → Service ID

### GitHub Actions will:
- Trigger on push to `main` branch
- Build and deploy frontend to Netlify
- Build and deploy backend to Railway

---

## Monitoring & Debugging

### Railway
- **Logs:** `railway logs`
- **Status:** Check Railway dashboard
- **Errors:** Check application logs in dashboard

### Netlify
- **Deploy logs:** Netlify dashboard → Deploys
- **Function logs:** Netlify dashboard → Functions
- **Analytics:** Netlify dashboard → Analytics

### Database
- **Connection:** Test at [console.neon.tech](https://console.neon.tech)
- **Backups:** Configured automatically

---

## Security Checklist

- ✅ Environment variables configured
- ✅ Database secured with SSL
- ✅ CORS properly configured
- ✅ API uses HTTPS
- ✅ Frontend on HTTPS (Netlify)
- ✅ Backend on HTTPS (Railway)
- ✅ Security headers configured in netlify.toml

---

## Rollback Procedure

### Railway
```bash
railway logs --tail=50  # View logs
# Use Railway dashboard to revert to previous deployment
```

### Netlify
- Go to Netlify dashboard → Deploys
- Click on previous deployment → Publish deploy

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
railway logs
# Check environment variables are set
railway variables
```

### Frontend showing "Cannot reach API"
1. Check VITE_API_URL is correct
2. Verify backend is running
3. Check CORS settings
4. Check network tab in browser DevTools

### Database connection failed
1. Verify DATABASE_URL in environment
2. Check Neon console for active connections
3. Ensure SSL mode is `require`

---

## Production Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Netlify
- [ ] Environment variables set on both platforms
- [ ] Database connected and initialized
- [ ] CORS configured for production URLs
- [ ] Testing on production URLs
- [ ] SSL/HTTPS working
- [ ] Error monitoring setup (optional)
- [ ] Backup strategy verified

---

## Support & Resources

- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- Neon Docs: https://neon.tech/docs
- Express.js Docs: https://expressjs.com

---

**Last Updated:** October 25, 2025
**Status:** Ready for Production
