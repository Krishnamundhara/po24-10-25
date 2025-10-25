# 🚀 Production Deployment Checklist

**Application:** Purchase Order Management System  
**Date:** October 25, 2025  
**Status:** Ready for Production

---

## 📋 Pre-Deployment

- [ ] All code committed to main branch
- [ ] No uncommitted changes
- [ ] All tests passing (if applicable)
- [ ] Production environment variables documented
- [ ] Database backups configured
- [ ] SSL certificates verified

---

## 🔧 Backend (Railway) Setup

### Step 1: Connect Railway Account
- [ ] Create Railway account (https://railway.app)
- [ ] Generate Railway API token
- [ ] Store token securely

### Step 2: Connect GitHub Repository
- [ ] Sign in to Railway dashboard
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub"
- [ ] Authorize Railway with GitHub
- [ ] Select your repository
- [ ] Select `backend` directory (if monorepo structure detected)

### Step 3: Configure Environment Variables in Railway
In Railway dashboard → Your Project → Variables:

```
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_Y3RFTiJOLGc5@ep-rapid-resonance-a129otdt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
FRONTEND_URL=https://your-domain.netlify.app
PRODUCTION_FRONTEND_URL=https://your-domain.netlify.app
```

### Step 4: Verify Build Configuration
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Node.js version: 18+ (Railway auto-detects)
- [ ] Procfile present: ✓

### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Monitor deployment logs
- [ ] Verify backend is running: `https://your-railway-url/api/health`

### Step 6: Get Backend URL
- [ ] Copy Railway service URL
- [ ] Format: `https://your-service-abc123.railway.app`
- [ ] Test: `curl https://your-service-abc123.railway.app/api/health`

---

## 🌐 Frontend (Netlify) Setup

### Step 1: Connect Netlify Account
- [ ] Create Netlify account (https://netlify.com)
- [ ] Generate Netlify access token
- [ ] Store token securely

### Step 2: Connect GitHub Repository
- [ ] Sign in to Netlify
- [ ] Click "Add new site"
- [ ] Select "Import an existing project"
- [ ] Connect GitHub account
- [ ] Select your repository

### Step 3: Configure Build Settings
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: 18+ (recommend 20+)

### Step 4: Set Environment Variables
In Netlify dashboard → Site settings → Build & Deploy → Environment:

```
VITE_API_URL=https://your-railway-service.railway.app
```

### Step 5: Update netlify.toml
- [ ] File present: ✓
- [ ] Redirects configured: ✓
- [ ] Security headers configured: ✓

### Step 6: Deploy
- [ ] Click "Deploy site"
- [ ] Monitor build logs
- [ ] Verify site is live: `https://your-site.netlify.app`

### Step 7: Get Frontend URL
- [ ] Copy Netlify domain
- [ ] Format: `https://your-site.netlify.app`
- [ ] Test: Visit URL in browser

---

## 🔄 Post-Deployment Verification

### Backend Verification
```bash
# Test health endpoint
curl https://your-railway-service.railway.app/api/health

# Expected response:
# {
#   "success": true,
#   "message": "Server is running",
#   "timestamp": "2025-10-25T...",
#   "environment": "production"
# }
```

### Database Verification
- [ ] Database tables created
- [ ] Can query purchase_orders table
- [ ] Can query company_profile table
- [ ] Connection pooling working

### Frontend Verification
- [ ] Application loads
- [ ] Can navigate to Create PO page
- [ ] API calls complete successfully
- [ ] PDF download works
- [ ] No console errors

### API Testing
- [ ] GET /api/health → 200 OK
- [ ] POST /api/purchase-orders → 201 Created
- [ ] GET /api/purchase-orders → 200 OK
- [ ] PUT /api/purchase-orders/{id} → 200 OK
- [ ] DELETE /api/purchase-orders/{id} → 200 OK
- [ ] GET /api/company → 200 OK
- [ ] POST /api/company → 200 OK

---

## 🔐 Security Configuration

### CORS Settings
- [ ] Frontend domain added to allowed origins
- [ ] Backend allows credentials
- [ ] Proper HTTP methods configured

### Backend Security
- [ ] NODE_ENV set to production
- [ ] SSL/TLS enabled
- [ ] HTTPS enforced
- [ ] Security headers set

### Frontend Security
- [ ] Netlify security headers configured
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] No sensitive data in frontend code

### Database Security
- [ ] SSL mode: require
- [ ] Channel binding: require
- [ ] Connection pooling enabled
- [ ] Regular backups

---

## 📊 Monitoring Setup

### Railway Monitoring
- [ ] Enable Railway monitoring
- [ ] Set up alerts for failures
- [ ] Monitor CPU/Memory usage
- [ ] Monitor database connections

### Netlify Monitoring
- [ ] Enable deploy notifications
- [ ] Set up analytics
- [ ] Monitor bandwidth usage
- [ ] Check build times

### Application Monitoring (Optional)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable logging
- [ ] Monitor API response times
- [ ] Track user errors

---

## 🚨 Troubleshooting

### Backend not starting
1. Check Railway logs: `railway logs --tail=50`
2. Verify environment variables are set
3. Check database connection string
4. Ensure Node version compatibility

### Frontend not building
1. Check Netlify build logs
2. Verify build command: `npm run build`
3. Check for TypeScript errors
4. Verify all dependencies installed

### API connection errors
1. Verify VITE_API_URL in Netlify environment
2. Check CORS settings in backend
3. Verify backend is running
4. Check browser console for errors

### Database connection failed
1. Verify DATABASE_URL format
2. Check Neon connection active
3. Verify SSL settings
4. Check connection pool limits

---

## 📝 Documentation Links

- **Railway Docs:** https://docs.railway.app
- **Netlify Docs:** https://docs.netlify.com
- **Neon Docs:** https://neon.tech/docs
- **Express.js:** https://expressjs.com
- **Vite:** https://vitejs.dev

---

## 🎯 Final Steps

1. **Update DNS (Optional)**
   - [ ] Add custom domain to Netlify
   - [ ] Configure DNS records
   - [ ] Wait for DNS propagation

2. **Performance Optimization**
   - [ ] Enable caching headers
   - [ ] Optimize images
   - [ ] Minify CSS/JS
   - [ ] Enable gzip compression

3. **User Communication**
   - [ ] Notify stakeholders of live URL
   - [ ] Share production credentials safely
   - [ ] Document access procedures
   - [ ] Share support contacts

4. **Post-Launch Monitoring**
   - [ ] Monitor for first 24 hours
   - [ ] Check error logs regularly
   - [ ] Verify data integrity
   - [ ] Collect user feedback

---

## ✅ Sign-Off

- **Deployed by:** ___________________
- **Date:** ___________________
- **Verified by:** ___________________
- **Production Status:** 🟢 LIVE

---

**⚠️ Important Notes:**
- Keep all credentials secure and never commit to repository
- Regularly backup database
- Monitor application health daily for first week
- Have rollback plan ready
- Document any issues encountered

---

*Last Updated: October 25, 2025*
