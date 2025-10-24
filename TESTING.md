# Testing Guide

Complete guide to test all features of the Purchase Order Management System.

## Prerequisites

1. Backend running on `http://localhost:4000`
2. Frontend running on `http://localhost:3000`
3. Database initialized and connected

## Test Scenarios

### 1️⃣ Test Create Purchase Order

#### 1.1 Valid Creation
1. Click "+ New Order" button
2. Fill in the form:
   - Date: 2025-10-24
   - Order Number: PO-001
   - Party Name: ABC Traders
   - Broker: Ramesh
   - Mill: Mill A
   - Product: Wheat
   - Weight: 1200
   - Bags: 50
   - Rate: 2500
   - Terms: Payment within 30 days
3. Click "Create Purchase Order"
4. ✅ Should see success notification
5. ✅ Should redirect to dashboard
6. ✅ Order should appear in table

#### 1.2 Duplicate Order Number
1. Click "+ New Order" again
2. Create another order with same order_number: PO-001
3. ✅ Should get error: "Order number already exists"
4. ✅ Order should NOT be created

#### 1.3 Missing Required Fields
1. Try to create with empty order number
2. ✅ Should show validation error: "Order number is required"
3. Try with empty party name
4. ✅ Should show validation error: "Party name is required"
5. Try with invalid date
6. ✅ Should show validation error: "Invalid date"

#### 1.4 Invalid Data Types
1. Try to enter negative weight
2. ✅ Should show validation error: "Weight must be positive"
3. Try to enter negative bags
4. ✅ Should show validation error: "Bags must be positive"
5. Try to enter non-numeric rate
6. ✅ Should show validation error: "Rate must be positive"

---

### 2️⃣ Test Read / Dashboard

#### 2.1 View All Orders
1. Go to Dashboard (/)
2. ✅ Should see table with columns: Date, Order #, Party, Product, Weight, Bags, Rate
3. ✅ Orders should be sorted by date (newest first)
4. ✅ All order details should be visible

#### 2.2 Search Functionality
1. Create orders: PO-001, PO-002, PO-TEST
2. Search for "PO-001"
3. ✅ Only PO-001 should appear
4. Search for "TEST"
5. ✅ Only PO-TEST should appear
6. Search for "Traders"
7. ✅ Orders from "ABC Traders" should appear
8. Clear search (search for nothing)
9. ✅ All orders should reappear

#### 2.3 Pagination
1. Create 15+ orders
2. ✅ First page should show 10 orders
3. ✅ "Previous" button should be disabled on page 1
4. Click "Next"
5. ✅ Page should change to 2
6. ✅ "Previous" button should now be enabled
7. ✅ Remaining orders should appear
8. Click "Previous"
9. ✅ Should go back to page 1

#### 2.4 Table Display
1. Click on any row to expand (if supported)
2. ✅ Date should be formatted: "24 Oct 2025"
3. ✅ Rate should be formatted: "₹2,500.00"
4. ✅ Weight should show as: "1200 kg"
5. ✅ Missing fields should show as: "-" or "N/A"

---

### 3️⃣ Test Preview

#### 3.1 Open Preview Modal
1. Click "Preview" button on any order
2. ✅ Modal should open
3. ✅ Should show formatted invoice layout
4. ✅ Should include:
   - PO number and date
   - Party details
   - Product details
   - Rate and total
   - Terms & conditions

#### 3.2 Preview Content
1. Verify all data matches the order
2. ✅ Should have header: "PURCHASE ORDER"
3. ✅ Should show calculation: Weight × Rate = Total
4. ✅ Currency should be formatted as INR
5. Close modal by clicking ×
6. ✅ Modal should close

---

### 4️⃣ Test Edit

#### 4.1 Navigate to Edit Page
1. Click "Edit" button on any order
2. ✅ Should navigate to edit page
3. ✅ Form should be pre-filled with current data
4. ✅ Button should say "Update Purchase Order"

#### 4.2 Update Fields
1. Change party name from "ABC Traders" to "XYZ Corporation"
2. Change rate from 2500 to 3000
3. Click "Update Purchase Order"
4. ✅ Should see success notification
5. ✅ Should redirect to dashboard
6. ✅ Order should show updated values

#### 4.3 Update with Duplicate Order Number
1. Edit order with PO-001
2. Change order_number to PO-002 (if PO-002 exists)
3. Click "Update"
4. ✅ Should get error: "Order number already exists"
5. ✅ Should NOT update

#### 4.4 Partial Update
1. Edit an order
2. Only update the "Broker" field
3. ✅ All other fields should remain unchanged
4. ✅ Updated_at timestamp should update

---

### 5️⃣ Test Delete

#### 5.1 Delete Confirmation
1. Click "Delete" button on any order
2. ✅ Confirmation dialog should appear
3. ✅ Should ask: "Are you sure..."
4. ✅ Button should say "Delete" (red)
5. Click "Cancel"
6. ✅ Dialog should close
7. ✅ Order should still exist

#### 5.2 Confirm Deletion
1. Click "Delete" again
2. Dialog appears
3. Click "Delete" button
4. ✅ Order should disappear from table
5. ✅ Should see success notification
6. ✅ Page should refresh with remaining orders

#### 5.3 Delete Last Order
1. If only one order exists, delete it
2. ✅ Should show: "No purchase orders found"
3. ✅ Dashboard should be empty

---

### 6️⃣ Test Download PDF

#### 6.1 Download PDF
1. Click "Download" button on any order
2. ⏳ PDF should start downloading
3. ✅ File name should be: PO-{OrderNumber}.pdf
4. ✅ Should see success notification: "PDF downloaded successfully"

#### 6.2 PDF Content
1. Open the downloaded PDF
2. ✅ Should have header: "PURCHASE ORDER"
3. ✅ Should include:
   - PO Number
   - Date
   - Party details (name, broker, mill)
   - Product details (name, weight, bags)
   - Rate and total
   - Terms & conditions
   - Generation timestamp
4. ✅ Should be professionally formatted
5. ✅ Colors should match the app theme

#### 6.3 Multiple Downloads
1. Download PDF from 3 different orders
2. ✅ All files should download successfully
3. ✅ Each file should have correct order number in name
4. ✅ Content should be specific to each order

---

### 7️⃣ Test Validations

#### 7.1 Required Fields Validation
| Field | Required | Test |
|-------|----------|------|
| Date | Yes | Leave empty, should error |
| Order Number | Yes | Leave empty, should error |
| Party Name | Yes | Leave empty, should error |
| Broker | No | OK to leave empty |
| Mill | No | OK to leave empty |
| Product | No | OK to leave empty |
| Weight | No | OK to leave empty |
| Bags | No | OK to leave empty |
| Rate | No | OK to leave empty |
| Terms | No | OK to leave empty |

#### 7.2 Data Type Validation
1. Weight field: Try entering "abc"
   - ✅ Should not accept non-numeric
2. Bags field: Try entering "12.5"
   - ✅ Should accept only integers
3. Rate field: Try entering negative "-100"
   - ✅ Should show error
4. Date field: Try entering "not-a-date"
   - ✅ Should show error

---

### 8️⃣ Test Error Scenarios

#### 8.1 Server Connection Error
1. Stop the backend server
2. Try to create an order
3. ✅ Should show error: "Failed to create purchase order"
4. Restart backend
5. ✅ Should work again

#### 8.2 Invalid Order ID
1. Try to access URL: `/edit/invalid-id`
2. ✅ Should show error: "Purchase order not found"
3. Should show back button

#### 8.3 Concurrent Actions
1. Open two browser windows
2. In window 1: Create order PO-CONCURRENT
3. In window 2: Try to create same order
4. ✅ One should succeed, one should fail
5. ✅ Error should be clear about duplicate

---

### 9️⃣ Test Responsive Design

#### 9.1 Desktop View (1920px)
1. Open app at full width
2. ✅ Table should display all columns
3. ✅ Form should use 2-3 column layout
4. ✅ Buttons should be properly sized

#### 9.2 Tablet View (768px)
1. Resize browser to 768px
2. ✅ Table might scroll horizontally
3. ✅ Form should stack appropriately
4. ✅ All buttons should still be clickable
5. ✅ No content should be hidden

#### 9.3 Mobile View (375px)
1. Resize browser to 375px or use DevTools mobile mode
2. ✅ Table should be scrollable
3. ✅ Form should be single column
4. ✅ Buttons should be full width
5. ✅ Navigation should work
6. ✅ Modals should fit screen

---

### 🔟 Test Performance

#### 10.1 Large Dataset
1. Create 100+ orders
2. ✅ Dashboard should still load quickly
3. ✅ Search should return results quickly
4. ✅ Pagination should work smoothly

#### 10.2 Network Latency
1. Slow down network in DevTools (throttling)
2. Try operations (create, search, etc.)
3. ✅ Loading states should show
4. ✅ Should not break or hang

---

## Test Checklist

### Core Functionality
- [ ] Create new order
- [ ] View all orders in dashboard
- [ ] Search by order number
- [ ] Search by party name
- [ ] Paginate through results
- [ ] Preview order in modal
- [ ] Edit order details
- [ ] Delete order with confirmation
- [ ] Download order as PDF

### Validation
- [ ] Required fields show errors
- [ ] Numeric fields validate properly
- [ ] Date field validates
- [ ] Duplicate order number rejected
- [ ] Server-side validation works
- [ ] Error messages are clear

### UI/UX
- [ ] Forms are user-friendly
- [ ] Buttons provide feedback (loading state)
- [ ] Notifications appear for actions
- [ ] Modals work properly
- [ ] Navigation works
- [ ] Layout is responsive
- [ ] Colors match the palette
- [ ] Text is readable

### Database
- [ ] Data persists after page reload
- [ ] Updated fields actually update
- [ ] Deleted records don't reappear
- [ ] Searches query database correctly
- [ ] Timestamps are accurate

### Edge Cases
- [ ] Empty database (no orders)
- [ ] Single order
- [ ] Many orders (100+)
- [ ] Very long text fields
- [ ] Special characters in data
- [ ] Concurrent same operation
- [ ] Network interruption recovery

---

## Sample Test Data

Use this for testing:

```json
{
  "date": "2025-10-24",
  "order_number": "PO-TEST-001",
  "party_name": "Test Company Ltd",
  "broker": "Test Broker",
  "mill": "Test Mill",
  "weight": 1500,
  "bags": 75,
  "product": "Test Product",
  "rate": 3200,
  "terms_and_conditions": "Payment within 30 days. Delivery FOB."
}
```

---

## API Testing (Advanced)

### Using curl to test backend directly:

```bash
# Create
curl -X POST http://localhost:4000/api/purchase-orders \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-24","order_number":"PO-API","party_name":"API Test","rate":1000}'

# Read
curl http://localhost:4000/api/purchase-orders

# Search
curl "http://localhost:4000/api/purchase-orders?q=PO-API"

# Get single
curl http://localhost:4000/api/purchase-orders/{id}

# Update
curl -X PUT http://localhost:4000/api/purchase-orders/{id} \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-25","order_number":"PO-API","party_name":"Updated"}'

# Delete
curl -X DELETE http://localhost:4000/api/purchase-orders/{id}
```

---

## Reported Issues & Solutions

### Issue: Duplicate button clicks
**Solution:** Buttons are disabled during submission, this is working as intended.

### Issue: Search not showing results
**Solution:** Search is case-insensitive. Try different keywords.

### Issue: PDF looks different than preview
**Solution:** PDF uses server-side rendering. Preview is close but may differ slightly.

### Issue: Date picker not showing
**Solution:** Use browser's native date picker. Format is YYYY-MM-DD.

---

**Happy Testing! 🧪**

Report any issues and improvements needed!
