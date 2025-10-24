# Purchase Order Web App

**Stack:** React + TypeScript (Vite), Node/Express (TypeScript) backend, NeonDB (Postgres-compatible), `pg` on server, Tailwind CSS for styling, React Router, axios, react-hook-form.

**Purpose / Scope**
This app allows users to create, view, edit, delete, preview, and download Purchase Orders (POs). All records are stored in NeonDB so they persist and can be edited.

---

## 🎨 UI Theme / Color Palette

This app uses a modern gradient-based palette inspired by violet, teal, and gray tones.

### **Palette**

1. **Violet / Indigo Gradient**
   `#8B00FF`, `#6A0DAD`, `#4B0082`, `#2E0854`

2. **Cyan / Teal Blue Gradient**
   `#00CED1`, `#008B8B`, `#006994`, `#003366`

3. **Pink / Purple Gradient**
   `#FFB6C1`, `#C71585`, `#800080`, `#4B0082`

4. **Gray / Navy Gradient**
   `#B0C4DE`, `#708090`, `#2F4F4F`, `#1C1C1C`

### **Usage Suggestions**

* **Primary:** `#6A0DAD` (deep violet)
* **Secondary:** `#00CED1` (cyan)
* **Accent:** `#FFB6C1` (light pink)
* **Neutral / Text:** `#2F4F4F` (dark gray)

These colors should be applied to Tailwind configuration or CSS variables to maintain consistency across UI components.

---

## Data model (Postgres / NeonDB)

```sql
-- single table: purchase_orders
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
```

Notes:

* `order_number` must be unique — DB enforces this with `UNIQUE` constraint.
* Use `numeric` for money/weight to avoid float issues.

---

## Environment / Setup (high-level)

* **NEON connection**: provide `DATABASE_URL` in `.env` on the backend (Neon connection string). Example:

```
DATABASE_URL=postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require
```

* Backend `.env` (server): `PORT=4000`, `DATABASE_URL=...`
* Frontend `.env` (client): `VITE_API_URL=http://localhost:4000/api`

---

## Backend (Express + TypeScript)

Create a REST API that the React app talks to. Use `pg` or `slonik` for queries. Keep validation simple with `zod`.

### Routes

```
GET  /api/purchase-orders          -> list orders (support pagination, search by order_number/party_name)
GET  /api/purchase-orders/:id      -> read single order
POST /api/purchase-orders          -> create order (validate unique order_number)
PUT  /api/purchase-orders/:id      -> update order
DELETE /api/purchase-orders/:id    -> delete order
GET /api/purchase-orders/:id/pdf   -> generate & send PDF for download (optional)
```

### Request / Response shapes

**Create** (POST `/api/purchase-orders`) body:

```json
{
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
}
```

Response: created record (200/201) or 400 with validation errors. If `order_number` duplicate, return 409 Conflict.

---

## Frontend (React + TypeScript)

Use Vite + React. Suggested libraries:

* `react-router-dom` – routing
* `axios` – API calls
* `react-hook-form` + `zod` resolver – forms & validation
* `tailwindcss` – styling (apply the above color theme)
* `react-table` or simple table – dashboard list
* `jspdf` or `html2canvas`/`html-to-pdf` – client-side download (or call server `/pdf`)
* `date-fns` – date formatting

### Pages / Components

* `App.tsx` — router and layout
* `pages/Dashboard.tsx` — list of POs, search, pagination, actions: Preview, Edit, Delete, Download
* `pages/CreatePO.tsx` — form to create purchase order (validate unique order on server)
* `components/POForm.tsx` — shared form used by Create/Edit
* `components/POPreview.tsx` — printable preview (styled invoice/PO layout)
* `components/ConfirmDialog.tsx` — delete confirmation
* `services/api.ts` — axios instance + API helper methods
* `types/index.ts` — shared TypeScript interfaces (PurchaseOrder)

### UX details (Dashboard)

* Display columns: Date, Order #, Party Name, Product, Weight, Bags, Rate, Actions
* Actions per row: **Preview**, **Edit**, **Delete**, **Download**, **Bill details**
* Support sorting by date and search by order number / party name.

---

## Validation & Uniqueness

* Validate inputs on frontend (required fields) using `react-hook-form` and `zod`.
* On create, backend must check for `order_number` uniqueness. If conflict, return HTTP 409 and error message so frontend can show `"Order number already exists"`.

---

## PDF / Download

Two options:

1. **Server-side**: backend route generates PDF (recommended for consistent styling). Use `pdfkit` or `puppeteer` to render an HTML template and return PDF.
2. **Client-side**: render preview DOM and convert to PDF using `html2canvas` + `jspdf`.

Include a `Download` button in dashboard that either calls `/pdf` or triggers client-side generation.

---

## Example API helper (pseudo)

```ts
// services/api.ts
import axios from 'axios';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
export const purchaseOrders = {
  list: (q = '') => api.get('/purchase-orders', { params: { q } }),
  get: (id: string) => api.get(`/purchase-orders/${id}`),
  create: (payload) => api.post('/purchase-orders', payload),
  update: (id, payload) => api.put(`/purchase-orders/${id}`, payload),
  del: (id) => api.delete(`/purchase-orders/${id}`),
  pdf: (id) => api.get(`/purchase-orders/${id}/pdf`, { responseType: 'blob' })
};
```

---

## Development Steps (for Claude)

1. Initialize backend: `npm init -y` + TypeScript, Express, pg, zod.
2. Add DB migration / table creation script (SQL above). Confirm Neon connection works.
3. Implement REST routes with proper validation and error codes (400, 409, 500).
4. Initialize frontend: `npm create vite@latest my-app --template react-ts`.
5. Implement components and pages listed above. Wire API calls to backend.
6. Implement PDF generation (server or client). Add Download action in UI.
7. Add color palette to Tailwind config using `extend.colors`.
8. Add sensible UI, mobile responsive, and validations.
9. Add tests for backend endpoints (optional).

---

## Deployment notes

* Backend: host on Render, Fly, Railway, or Vercel (serverless) with `DATABASE_URL` pointing to Neon. Ensure SSL settings are correct.
* Frontend: host on Vercel / Netlify / Cloudflare Pages. If backend on different domain, configure CORS.

---

## Acceptance Criteria (Deliverables)

* Working frontend + backend connected to NeonDB.
* Create flow: user can add new purchase orders; duplicate order numbers are rejected.
* Dashboard: list with actions (Preview, Edit, Delete, Download).
* Edit flow: data is persisted and editable.
* Download: produce a correctly formatted PDF of the PO.
* README and setup instructions included.
* Color palette applied consistently across components.

---

## Extras / Nice-to-have

* User authentication (JWT) and multi-user access.
* Export CSV of POs.
* Audit log for changes.
* Bulk-import via CSV.

---

### Final notes to developer (Claude)

Please follow this README to implement the app. Prioritize correct data persistence, the unique `order_number` constraint, and consistent use of the color palette. Keep UI straightforward, modern, and responsive.
# po24-10-25
# po24-10-25
