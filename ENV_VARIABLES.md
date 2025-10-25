# Environment Variables Configuration

## Frontend Production (.env.production)

Located: `frontend/.env.production`

```env
# Production API URL - Replace with your Railway backend URL
VITE_API_URL=https://your-railway-service.railway.app
```

**How to update:**
1. Deploy backend to Railway
2. Copy the Railway service URL
3. Update VITE_API_URL in `frontend/.env.production`
4. Commit and push to trigger Netlify rebuild

---

## Backend Production (Railway Environment Variables)

These go in Railway Dashboard → Variables

```env
# Server Port
PORT=4000

# Environment
NODE_ENV=production

# Database Connection
DATABASE_URL=postgresql://neondb_owner:npg_Y3RFTiJOLGc5@ep-rapid-resonance-a129otdt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://your-netlify-domain.netlify.app
```

---

## Local Development (.env for backend)

Located: `backend/.env`

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://neondb_owner:npg_Y3RFTiJOLGc5@ep-rapid-resonance-a129otdt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
FRONTEND_URL=http://localhost:5173
```

---

## Variable Explanations

### PORT
- **Default:** 4000
- **Purpose:** Which port the Express server listens on
- **Production:** Use 4000 (Railway handles port mapping)

### NODE_ENV
- **Options:** `development`, `production`
- **Purpose:** Determines logging level, error handling, optimizations
- **Production:** Always set to `production`

### DATABASE_URL
- **Format:** PostgreSQL connection string
- **Purpose:** Connects to Neon PostgreSQL database
- **⚠️ Important:** Never share this publicly!
- **Backup:** Store safely in password manager

### FRONTEND_URL (Development)
- **Value:** `http://localhost:5173`
- **Purpose:** CORS whitelist for development
- **Used:** Local development only

### PRODUCTION_FRONTEND_URL
- **Value:** Your Netlify domain
- **Purpose:** CORS whitelist for production
- **Format:** `https://your-site.netlify.app`

---

## Step-by-Step Setup

### For Railway Backend

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Connect Repository**
   - New Project → Deploy from GitHub
   - Select your repository

3. **Add Environment Variables**
   - Go to Project Settings → Variables
   - Add each variable from the Backend Production section
   - Click "Save"

4. **Deploy**
   - Railway will auto-build and deploy
   - Check Status tab for progress

5. **Get Your URL**
   - Go to Deployments tab
   - Copy the service URL (e.g., `https://po-backend-xxx.railway.app`)

### For Netlify Frontend

1. **Create Netlify Account**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **Import Project**
   - New site from Git
   - Select your repository

3. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variable**
   - Site settings → Build & Deploy → Environment
   - Add `VITE_API_URL=your-railway-url`

5. **Deploy**
   - Netlify auto-builds and deploys

---

## Important Security Notes

### ✅ DO:
- Store DATABASE_URL in environment variables
- Use HTTPS URLs in production
- Rotate secrets periodically
- Keep credentials out of repository
- Use Railway/Netlify secret managers

### ❌ DON'T:
- Commit `.env` files to repository
- Share DATABASE_URL publicly
- Use development URLs in production
- Hardcode secrets in code
- Reuse secrets across projects

---

## Secret Management Best Practices

### Using Railway Secrets
```bash
# Railway CLI
railway variables set DATABASE_URL=value
railway variables list
```

### Using Netlify Secrets
- Navigate to Site Settings
- Build & Deploy → Environment
- Add sensitive variables as "Secret"

### GitHub Actions Secrets (if using CI/CD)
- Repository Settings → Secrets and variables
- Create secrets for sensitive data
- Reference in workflows with ${{ secrets.NAME }}

---

## Troubleshooting

### Database Connection Error
**Problem:** `Error: connect ECONNREFUSED`
- Check DATABASE_URL format
- Verify Neon database is active
- Ensure SSL mode is "require"

### CORS Error
**Problem:** `Access to XMLHttpRequest blocked by CORS`
- Verify PRODUCTION_FRONTEND_URL in backend
- Check frontend VITE_API_URL is correct
- Ensure backend CORS middleware includes frontend domain

### API Not Found
**Problem:** `GET /api/health → 404`
- Verify backend is deployed
- Check Railway service is running
- Look at Railway logs for errors

### Variables Not Loading
**Problem:** `undefined` values in production
- Verify variables set in Railway dashboard
- Check variable names (case-sensitive)
- Redeploy after changing variables

---

## Quick Reference

| Component | Variable | Example |
|-----------|----------|---------|
| Backend Port | PORT | 4000 |
| Environment | NODE_ENV | production |
| Database | DATABASE_URL | postgresql://... |
| Frontend (Dev) | FRONTEND_URL | http://localhost:5173 |
| Frontend (Prod) | PRODUCTION_FRONTEND_URL | https://app.netlify.app |
| API URL (Frontend) | VITE_API_URL | https://api.railway.app |

---

## After Deployment Checklist

- [ ] Backend variables all set in Railway
- [ ] Frontend variables all set in Netlify
- [ ] DATABASE_URL is correct format
- [ ] PRODUCTION_FRONTEND_URL matches Netlify domain
- [ ] VITE_API_URL matches Railway backend URL
- [ ] Test /api/health endpoint
- [ ] Test from production frontend
- [ ] Verify database operations work

---

*Last Updated: October 25, 2025*
