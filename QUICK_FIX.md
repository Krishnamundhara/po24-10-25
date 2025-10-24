# ⚡ Quick Fixes & Troubleshooting

Fast solutions to common problems.

---

## 🔧 Installation Issues

### "npm install fails"

**Error:** `npm ERR! code ERESOLVE`

**Fix:**
```bash
# Clear cache
npm cache clean --force

# Delete old files
rm -rf node_modules package-lock.json

# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or force resolution
npm install --force
```

---

### "Node version incompatible"

**Error:** `node version v12 is not supported`

**Fix:**
1. Check version: `node --version`
2. Need Node 16 or higher
3. Download from: https://nodejs.org
4. Reinstall Node.js

---

### "npm command not found"

**Error:** `npm: command not found`

**Fix:**
1. Node.js not installed
2. Go to https://nodejs.org
3. Download and install LTS version
4. Restart terminal

---

## 🚀 Startup Issues

### "Backend won't start"

**Error:** `Error: listen EADDRINUSE: address already in use :::4000`

**Fix (Windows):**
```bash
# Find what's using port 4000
netstat -ano | findstr :4000

# Kill the process (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

**Fix (Mac/Linux):**
```bash
# Find what's using port 4000
lsof -i :4000

# Kill the process
kill -9 12345
```

**Alternative:**
Change port in `backend/.env`:
```env
PORT=4001
```

---

### "Frontend won't start"

**Error:** `Error: EADDRINUSE: address already in use :::3000`

**Fix:**
1. Change port in `frontend/vite.config.ts`:
```ts
server: {
  port: 3001,
}
```

2. Or use same process killing method above

---

### "Cannot find module 'express'"

**Error:** `Cannot find module 'express'`

**Fix:**
1. Dependencies not installed
2. Run: `npm install`
3. In correct directory: `cd backend` then `npm install`
4. Wait for installation to complete

---

### "TypeScript errors everywhere"

**Error:** `Could not find declaration file for module 'react'`

**Fix:**
```bash
# Install type definitions
npm install --save-dev @types/react @types/react-dom

# Or just reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

## 🗄️ Database Issues

### "Cannot connect to database"

**Error:** `Error: connect ECONNREFUSED`

**Fix:**
1. Check DATABASE_URL in `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require
   ```
2. Verify it includes `?sslmode=require`
3. Check internet connection
4. Test in NeonDB console
5. Restart backend: `npm run dev`

---

### "Connection string is invalid"

**Error:** `Error: invalid URI`

**Fix:**
1. Get correct string from NeonDB
2. Go to: https://console.neon.tech
3. Select your project
4. Click "Connection String"
5. Copy full string including `?sslmode=require`
6. Paste into `.env`

---

### "Table doesn't exist"

**Error:** `relation "purchase_orders" does not exist`

**Fix:**
```bash
# Initialize database
cd backend
npm run db:init

# Check output for success message
# Should show: ✓ Database initialized successfully
```

---

### "Duplicate order number error"

**Error:** `Order number already exists`

**This is correct behavior!** Each order number must be unique.

**Fix:** Use a different order number:
- Instead of: `PO-001`
- Use: `PO-002` or `PO-TEST-001`

---

## 🌐 API Issues

### "API not responding"

**Error:** `Error: Network Error`

**Fix:**
1. Check backend is running: `npm run dev`
2. Backend should show: `✓ Server running on http://localhost:4000`
3. Check VITE_API_URL in frontend `.env`
4. Should be: `http://localhost:4000/api`
5. Restart frontend

---

### "CORS error"

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Fix:**
1. Backend has CORS enabled already
2. Check API_URL is correct
3. Backend must be running on 4000
4. Restart both servers

---

### "404 Not Found"

**Error:** `POST /api/purchase-orders 404 Not Found`

**Fix:**
1. Check backend is running
2. Check URL is correct
3. Should be: `/api/purchase-orders`
4. Not: `/purchase-orders` or `/api/po`
5. Restart backend

---

## 🎨 Frontend Issues

### "Page is blank"

**Error:** Page shows nothing

**Fix:**
1. Check browser console: Press F12
2. Look for errors
3. Check backend is running
4. Refresh page: F5
5. Clear cache: Ctrl+Shift+Delete

---

### "Styles not loading"

**Error:** Page looks unstyled

**Fix:**
```bash
cd frontend
npm install
npm run dev
```

Check if Tailwind is building. Look for CSS file in dist/.

---

### "Cannot search"

**Error:** Search returns no results

**Fix:**
1. Search is case-insensitive
2. Try different keywords
3. Check data exists in database
4. Backend must be running

---

### "PDF doesn't download"

**Error:** No download, or empty file

**Fix:**
1. Backend must be running
2. Order must exist in database
3. Check browser console for errors
4. Try different order

---

## 🛠️ Development Issues

### "Changes not showing up"

**Error:** Code changes don't appear

**Fix:**
1. Frontend: Has hot reload, should update automatically
2. Backend: Requires restart
   - Stop: Ctrl+C
   - Start: `npm run dev`
3. Browser: Clear cache and refresh (Ctrl+Shift+R)

---

### "Git showing all files as changed"

**Error:** Thousands of files showing as modified

**Fix:**
1. Ignore node_modules: Already in `.gitignore`
2. Make sure `.gitignore` exists
3. Run: `git status`
4. These are expected (not committed)

---

### "Out of memory"

**Error:** `JavaScript heap out of memory`

**Fix (Node):**
```bash
# Increase memory limit
node --max-old-space-size=4096 src/index.ts
```

**Fix (npm):**
```bash
# Run with more memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

## 📋 Common Fixes Checklist

When something doesn't work:

- [ ] Is backend running? (`npm run dev`)
- [ ] Is frontend running? (`npm run dev`)
- [ ] Are .env files created with correct values?
- [ ] Did you `npm install` in correct directory?
- [ ] Is database connected? (test in NeonDB console)
- [ ] Did you run `npm run db:init`?
- [ ] Did you restart servers after changes?
- [ ] Is port 4000 and 3000 available?
- [ ] Did you check browser console (F12)?
- [ ] Did you check terminal for errors?

---

## 🔍 Debugging Tips

### Enable Verbose Output
```bash
# Backend
DEBUG=* npm run dev

# Frontend
npm run dev -- --debug
```

### Check Network Requests
1. Open browser DevTools: F12
2. Go to Network tab
3. Perform action
4. Look for failed requests (red X)
5. Click request to see details

### Check Application State
1. Open browser DevTools: F12
2. Go to Application or Storage tab
3. Check LocalStorage for saved data
4. Check cookies
5. Clear if needed

### Check Server Logs
1. Look at terminal running backend
2. Errors should appear there
3. Copy full error message
4. Search in documentation

---

## 🆘 When All Else Fails

### Nuclear Option (Reset Everything)

**Backend:**
```bash
cd backend
rm -rf node_modules package-lock.json dist
npm cache clean --force
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json dist .next
npm cache clean --force
npm install
npm run dev
```

### Database Reset
```bash
# In NeonDB console, run:
DROP TABLE IF EXISTS purchase_orders;

# Then in backend terminal:
npm run db:init
```

### Browser Reset
1. Open DevTools: F12
2. Application → Storage
3. Clear All
4. Close all browser windows
5. Restart browser
6. Refresh page

---

## 📞 Get More Help

If issue persists:

1. **Check Documentation**
   - Read: START_HERE.md
   - Read: INSTALL.md
   - Read: SETUP.md

2. **Check Error Message**
   - Copy exact error
   - Search in docs
   - Look in browser console (F12)

3. **Verify Setup**
   - .env files exist and have correct values
   - `npm install` completed successfully
   - `npm run db:init` succeeded
   - Both servers show success messages

4. **Try Alternatives**
   - Use different port
   - Use different database name
   - Use different data

---

## ✅ Verification Commands

### Test Backend
```bash
# Should return 200 OK
curl http://localhost:4000/api/health

# Should return JSON with orders
curl http://localhost:4000/api/purchase-orders
```

### Test Frontend
```bash
# Go to http://localhost:3000
# Should load without errors
# Check console (F12) for red errors
```

### Test Database
```bash
# In NeonDB console:
SELECT * FROM purchase_orders;
```

All three should work without errors.

---

## 🎯 Quick Reference

| Problem | Command | Solution |
|---------|---------|----------|
| npm not found | - | Install Node.js from nodejs.org |
| Port in use | `netstat -ano \| findstr :4000` | Kill process or change port |
| Module missing | `npm install` | Install dependencies |
| TypeScript errors | `rm -rf node_modules && npm install` | Reinstall |
| DB not connecting | Check `.env` | Verify DATABASE_URL is correct |
| Styles missing | `npm run dev` | Restart frontend |
| Changes not showing | Ctrl+C then `npm run dev` | Restart server |

---

**Still stuck? Check the documentation files or review the specific service's README!** 📚
