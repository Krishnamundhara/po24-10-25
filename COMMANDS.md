# Quick Reference & Commands

## 🚀 Start Development

### Terminal 1: Backend
```bash
cd backend
npm install          # First time only
npm run dev          # Starts on http://localhost:4000
```

### Terminal 2: Frontend
```bash
cd frontend
npm install          # First time only
npm run dev          # Starts on http://localhost:3000
```

## 📋 Environment Variables

### Backend (.env)
```env
PORT=4000
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## 🎯 Database Operations

### Initialize Database
```bash
cd backend
npm run db:init
```

### Connect to Database (NeonDB Console)
1. Go to https://console.neon.tech
2. Select your project
3. Click "SQL Editor"
4. Run SQL queries

### Common SQL Commands
```sql
-- View all orders
SELECT * FROM purchase_orders;

-- Count total orders
SELECT COUNT(*) FROM purchase_orders;

-- Find by order number
SELECT * FROM purchase_orders WHERE order_number = 'PO-001';

-- Delete all orders (CAUTION!)
DELETE FROM purchase_orders;

-- Check table structure
\d purchase_orders;
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Endpoints
```
GET    /purchase-orders              List all (with search & pagination)
POST   /purchase-orders              Create new
GET    /purchase-orders/:id          Get one
PUT    /purchase-orders/:id          Update
DELETE /purchase-orders/:id          Delete
GET    /purchase-orders/:id/pdf      Download PDF
GET    /health                       Server status
```

### cURL Examples

**List all orders:**
```bash
curl http://localhost:4000/api/purchase-orders
```

**Search orders:**
```bash
curl "http://localhost:4000/api/purchase-orders?q=PO-001&page=1&limit=10"
```

**Create order:**
```bash
curl -X POST http://localhost:4000/api/purchase-orders \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-24",
    "order_number": "PO-001",
    "party_name": "ABC Traders",
    "broker": "Ramesh",
    "mill": "MillName",
    "weight": 1200.5,
    "bags": 50,
    "product": "Wheat",
    "rate": 2500.0,
    "terms_and_conditions": "Payment within 30 days"
  }'
```

**Get single order:**
```bash
curl http://localhost:4000/api/purchase-orders/{id}
```

**Update order:**
```bash
curl -X PUT http://localhost:4000/api/purchase-orders/{id} \
  -H "Content-Type: application/json" \
  -d '{...updated data...}'
```

**Delete order:**
```bash
curl -X DELETE http://localhost:4000/api/purchase-orders/{id}
```

**Download PDF:**
```bash
curl "http://localhost:4000/api/purchase-orders/{id}/pdf" -o "PO-001.pdf"
```

## 🏗️ Build Commands

### Frontend
```bash
cd frontend

# Development
npm run dev          # Start dev server

# Production
npm run build        # Create optimized build in dist/
npm run preview      # Preview production build locally
```

### Backend
```bash
cd backend

# Development
npm run dev          # Start with auto-reload

# Production
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled version
```

## 🧹 Cleanup & Maintenance

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Delete old files
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

### Kill Port Process (if stuck)

**Windows:**
```bash
# Find process on port 4000
netstat -ano | findstr :4000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find process on port 4000
lsof -i :4000

# Kill process
kill -9 <PID>
```

## 📊 Testing Checklist

- [ ] Backend server starts successfully
- [ ] Frontend loads at http://localhost:3000
- [ ] Can create a new purchase order
- [ ] Can search for orders
- [ ] Can edit an order
- [ ] Can preview an order
- [ ] Can download PDF
- [ ] Can delete an order
- [ ] Duplicate order number is rejected with error
- [ ] All form validations work

## 🚀 Deployment

### Backend Deployment (Render/Railway/Fly)

1. Push to GitHub
2. Set environment variable:
   ```
   DATABASE_URL=your_neon_connection_string
   ```
3. Deploy with `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Push to GitHub
2. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```
3. Build command: `npm run build`
4. Output directory: `dist`

## 🐛 Common Fixes

**Port already in use:**
```bash
# Change port in:
# Backend: .env (PORT=4001)
# Frontend: vite.config.ts (port: 3001)
```

**Module not found:**
```bash
rm -rf node_modules
npm install
```

**Database connection error:**
- Check DATABASE_URL in .env
- Verify ?sslmode=require is included
- Test connection in NeonDB console

**CORS error:**
- Backend already has CORS enabled
- Check API_URL is correct in frontend .env

## 📚 Project Structure

```
1/
├── backend/           # Express API
├── frontend/          # React App
├── SETUP.md           # Full setup guide
├── INSTALL.md         # Installation steps
├── COMMANDS.md        # This file
└── readme.md          # Original requirements
```

## 💡 Tips

- Always keep backend and frontend running in separate terminals
- Frontend hot-reloads; backend requires manual restart
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Use browser DevTools Network tab to debug API calls
- Order numbers are case-sensitive

## 🎓 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Express: https://expressjs.com
- PostgreSQL: https://www.postgresql.org
- NeonDB: https://neon.tech/docs

---

**Last Updated:** October 2025  
**Version:** 1.0.0
