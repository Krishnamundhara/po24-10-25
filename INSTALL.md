# Installation & Setup Guide

Complete step-by-step guide to set up and run the Purchase Order Management System.

## Prerequisites

- **Node.js**: v16 or higher (Download from https://nodejs.org/)
- **npm**: Comes with Node.js
- **Git**: Optional, for version control
- **NeonDB Account**: Free account at https://neon.tech

## Step 1: Get NeonDB Connection String

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Create a new database (or use default "neondb")
4. Copy the connection string (looks like):
   ```
   postgresql://neon_user:password@ep-xyz.us-east-1.neon.tech/dbname?sslmode=require
   ```

## Step 2: Backend Setup

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

**Wait for installation to complete** - This may take 2-3 minutes.

### 2.2 Create Environment File

Create a file named `.env` in the `backend` folder:

```env
PORT=4000
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/your_db?sslmode=require
NODE_ENV=development
```

**Replace with your NeonDB connection string!**

### 2.3 Initialize Database

```bash
npm run db:init
```

You should see:
```
✓ Database connected: { now: 2025-10-24T... }
Initializing database...
✓ Database initialized successfully
```

### 2.4 Start Backend Server

```bash
npm run dev
```

You should see:
```
✓ Server running on http://localhost:4000
✓ API base URL: http://localhost:4000/api
```

✅ Backend is ready!

---

## Step 3: Frontend Setup

### 3.1 Install Frontend Dependencies

Open a **new terminal** and run:

```bash
cd frontend
npm install
```

**Wait for installation to complete** - This may take 2-3 minutes.

### 3.2 Create Environment File

Create a file named `.env` in the `frontend` folder:

```env
VITE_API_URL=http://localhost:4000/api
```

### 3.3 Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
```

✅ Frontend is ready!

---

## Step 4: Verify Everything Works

1. Open your browser and go to: **http://localhost:3000**
2. You should see the Purchase Order System
3. Click **"+ New Order"** button
4. Fill in the form and click **"Create Purchase Order"**
5. You should see success notification
6. Order appears in the dashboard

## 🎉 Success!

Your Purchase Order Management System is now running!

---

## Common Operations

### View All Orders
1. Go to Dashboard (http://localhost:3000)
2. All orders are displayed in a table

### Search Orders
1. Use the search box at the top
2. Type order number (e.g., "PO-001")
3. Results update automatically

### Edit an Order
1. Click **"Edit"** button on any order
2. Modify the details
3. Click **"Update Purchase Order"**

### Download PDF
1. Click **"Download"** button on any order
2. PDF downloads to your computer

### Delete an Order
1. Click **"Delete"** button on any order
2. Confirm the deletion
3. Order is removed

### Preview an Order
1. Click **"Preview"** button on any order
2. View formatted purchase order
3. Close modal by clicking ×

---

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
1. Check your `DATABASE_URL` in `.env`
2. Ensure SSL mode is set: `?sslmode=require`
3. Verify NeonDB connection string is copied correctly
4. Check your internet connection

### Issue: "Port 4000 already in use"

**Solution:**
1. Find and close the process using port 4000
   ```bash
   # Windows - Find process on port 4000
   netstat -ano | findstr :4000
   # Kill the process (replace PID with actual ID)
   taskkill /PID <PID> /F
   ```
2. Or use a different port by changing `PORT` in `.env`

### Issue: "Port 3000 already in use"

**Solution:**
1. Change the frontend dev port in `frontend/vite.config.ts`:
   ```ts
   server: {
     port: 3001,  // Change to 3001 or another available port
   },
   ```

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "TypeError: Cannot find module"

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`

### Issue: "Order number already exists"

**This is expected!** Each order number must be unique. Try with a different order number like "PO-002".

---

## File Structure

```
1 (workspace root)
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts         # Database connection
│   │   │   └── init.ts               # Database initialization
│   │   ├── routes/
│   │   │   └── purchaseOrders.ts     # All API routes
│   │   ├── middleware/
│   │   │   └── errorHandler.ts       # Error handling
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript types
│   │   ├── utils/
│   │   │   └── pdfGenerator.ts       # PDF generation
│   │   └── index.ts                  # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .env                          # You create this
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmDialog.tsx    # Delete confirmation
│   │   │   ├── POForm.tsx           # Create/Edit form
│   │   │   ├── POPreview.tsx        # Preview modal
│   │   │   └── POTable.tsx          # Orders table
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   ├── CreatePO.tsx         # Create page
│   │   │   └── EditPO.tsx           # Edit page
│   │   ├── services/
│   │   │   └── api.ts               # API calls
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript types
│   │   ├── utils/
│   │   │   ├── format.ts            # Formatting functions
│   │   │   └── pdf.ts               # PDF utilities
│   │   ├── App.tsx                  # Main app
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.cjs
│   ├── .env.example
│   ├── .env                         # You create this
│   └── README.md
│
├── SETUP.md                         # Main setup guide
└── readme.md                        # Original requirements
```

---

## Development Tips

### Hot Reload
- Frontend automatically reloads when you save files ✨
- Backend requires restart (Ctrl+C, then `npm run dev`)

### Database Migrations
To reset the database:
```bash
# Stop the backend server first
# Then delete the connection and restart

# Or manually clear the table by connecting to NeonDB console
DELETE FROM purchase_orders;
```

### Testing the API
Use curl or Postman:
```bash
# Get all orders
curl http://localhost:4000/api/purchase-orders

# Create order
curl -X POST http://localhost:4000/api/purchase-orders \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-24","order_number":"PO-TEST","party_name":"Test Co"}'
```

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

**Backend:**
```bash
cd backend
npm run build
npm start  # Runs from dist/index.js
```

---

## Next Steps

1. ✅ Create a few purchase orders
2. ✅ Test all CRUD operations
3. ✅ Download PDFs
4. ✅ Try the search functionality
5. Deploy to production (see SETUP.md for details)

---

## Support

If you encounter any issues:

1. Check the specific README in `frontend/` or `backend/`
2. Review the error message carefully
3. Check troubleshooting section above
4. Verify all environment variables are set correctly
5. Ensure backend and frontend are running in separate terminals

**Happy coding! 🚀**
