# Purchase Order Management System

A full-stack web application for managing purchase orders with React + TypeScript (Vite) frontend, Express + TypeScript backend, and NeonDB (PostgreSQL) database.

## 🎯 Features

- ✅ **Create, Read, Update, Delete** (CRUD) operations for purchase orders
- ✅ **Unique Order Numbers** - Database enforces uniqueness with proper error handling
- ✅ **Search & Pagination** - Find orders by order number or party name
- ✅ **PDF Download** - Generate and download purchase orders as PDF
- ✅ **Preview** - View formatted purchase order before saving
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Modern UI** - Custom Tailwind color palette with gradients
- ✅ **Form Validation** - Client-side (React Hook Form + Zod) and server-side validation
- ✅ **Error Handling** - Comprehensive error messages and conflict detection

## 🎨 Color Palette

- **Primary**: Deep Violet (#6A0DAD)
- **Secondary**: Cyan (#00CED1)
- **Accent**: Light Pink (#FFB6C1)
- **Neutral**: Dark Gray (#2F4F4F)

## 📋 Project Structure

```
├── frontend/                    # React + TypeScript (Vite)
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API integration
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── README.md
│
├── backend/                     # Express + TypeScript
│   ├── src/
│   │   ├── db/                 # Database setup
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   └── index.ts            # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
└── readme.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL database or NeonDB account (https://neon.tech)

### Backend Setup

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Create `.env` file** with NeonDB connection string:
```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require
NODE_ENV=development
```

Get your `DATABASE_URL` from:
- NeonDB Dashboard: https://console.neon.tech
- Format: `postgresql://neon_user:password@ep-xyz.us-east-1.neon.tech/dbname?sslmode=require`

3. **Initialize database**:
```bash
npm run db:init
```

This creates the `purchase_orders` table with all required fields.

4. **Start development server**:
```bash
npm run dev
```

Server will run on `http://localhost:4000`

### Frontend Setup

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Create `.env` file**:
```env
VITE_API_URL=http://localhost:4000/api
```

3. **Start development server**:
```bash
npm run dev
```

App will open at `http://localhost:3000`

## 📡 API Routes

### Purchase Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/purchase-orders` | List all POs (with search & pagination) |
| `GET` | `/api/purchase-orders/:id` | Get single PO |
| `POST` | `/api/purchase-orders` | Create new PO |
| `PUT` | `/api/purchase-orders/:id` | Update PO |
| `DELETE` | `/api/purchase-orders/:id` | Delete PO |
| `GET` | `/api/purchase-orders/:id/pdf` | Download PO as PDF |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server status |

## 🗄️ Database Schema

```sql
CREATE TABLE purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  order_number text NOT NULL UNIQUE,
  party_name text NOT NULL,
  broker text,
  mill text,
  weight numeric,
  bags integer,
  product text,
  rate numeric,
  terms_and_conditions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_po_order_number ON purchase_orders(order_number);
CREATE INDEX idx_po_date ON purchase_orders(date);
CREATE INDEX idx_po_party_name ON purchase_orders(party_name);
```

## 📝 API Examples

### Create Purchase Order

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

### Search Purchase Orders

```bash
curl "http://localhost:4000/api/purchase-orders?q=PO-001&page=1&limit=10"
```

### Update Purchase Order

```bash
curl -X PUT http://localhost:4000/api/purchase-orders/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-25",
    "order_number": "PO-001",
    "party_name": "XYZ Company",
    ...
  }'
```

### Delete Purchase Order

```bash
curl -X DELETE http://localhost:4000/api/purchase-orders/{id}
```

### Download PDF

```bash
curl "http://localhost:4000/api/purchase-orders/{id}/pdf" \
  -o "PO-001.pdf"
```

## 🛠️ Development

### Frontend Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (lightning fast)
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **jsPDF + html2canvas** - PDF generation
- **React Hot Toast** - Notifications
- **date-fns** - Date formatting

### Backend Technologies
- **Express** - Web framework
- **TypeScript** - Type safety
- **pg** - PostgreSQL client
- **Zod** - Schema validation
- **PDFKit** - PDF generation
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

## 🚀 Production Deployment

### Backend (on Render, Fly, or Railway)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - `DATABASE_URL` - NeonDB connection string
   - `PORT` - 4000 (or your desired port)
   - `NODE_ENV` - production
4. Deploy with: `npm run build && npm start`

### Frontend (on Vercel, Netlify, or Cloudflare Pages)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variable:
   - `VITE_API_URL` - Your backend API URL

## ✅ Testing the Application

1. **Start backend**: `cd backend && npm run dev`
2. **Start frontend**: `cd frontend && npm run dev`
3. Navigate to `http://localhost:3000`
4. Create a new purchase order
5. Edit and view the order
6. Search for orders
7. Download as PDF
8. Delete an order

## 🐛 Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` is correct
- Ensure NeonDB connection string includes `?sslmode=require`
- Verify network access is allowed from your IP

### API Not Responding
- Check backend server is running on port 4000
- Check `VITE_API_URL` in frontend .env is correct
- Check CORS is enabled (it should be by default)

### Dependencies Installation Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 License

MIT License - feel free to use this project for commercial and personal purposes.

## 👨‍💻 Support

For issues, questions, or contributions, please refer to the README files in frontend and backend directories for more detailed documentation.

---

**Happy building! 🎉**
