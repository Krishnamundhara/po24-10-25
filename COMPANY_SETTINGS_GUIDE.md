# Company Profile & PDF Settings Guide

## Overview
Your Purchase Order system now includes a professional company profile feature that automatically appears in all PDF documents. You can customize your company logo, name, address, and bank details.

## How to Set Up Company Profile

### Step 1: Access Settings
- Click the **⚙️ Settings** button in the top-right corner of the header
- A settings modal will open

### Step 2: Upload Company Logo
- Click **"Choose File"** button in the Logo section
- Select a PNG or JPG image (recommended size: 200x200px, max 2MB)
- The logo will appear in the preview box
- This logo will be displayed in the top-left of all PDFs

### Step 3: Enter Company Details
Fill in the following information:

**Required:**
- **Company Name**: Your company's official name (e.g., "Raju Industries")

**Optional but Recommended:**
- **Address**: Full company address (will appear below company name)
- **Phone**: Contact phone number
- **Email**: Contact email address
- **GST Number**: Your GST registration number

### Step 4: Add Bank Details
In the "Bank Details" section, fill in:
- **Bank Name**: Name of your bank (e.g., "Bank of India")
- **Account Number**: Your bank account number
- **IFSC Code**: IFSC code of your bank branch
- **Branch Name**: Name of your bank branch

### Step 5: Save Profile
- Click the **"Save Profile"** button
- You'll see a success message
- Your profile is now saved locally

## What Appears in PDF

Once you've configured your company profile, the PDF will display:

```
[Company Logo]  RAJU INDUSTRIES
                67 Hassan Bagh, Opp Hathi Sizing, Dhamankar Naka
                MOB:9309531311, EMAIL ID: rajuid2024@gmail.com
                G.S.T. NO. : 27AHFPM0511N1ZD

┌─────────────────────────────────────────┐
│ PARTY NAME:        | [Party Details]   │
│ BROKER:            | [Broker Info]     │
│ MILL:              | [Mill Info]       │
│ QUALITY:           | [Product]         │
│ RATE:              | [Amount]          │
│ WEIGHT:            | [Weight in KG]    │
│ BAGS:              | [Number of Bags]  │
│ TERMS & CONDITION: | [Terms]           │
└─────────────────────────────────────────┘

BANK DETAILS
BANK OF INDIA, ACCOUNT NO 004730110000040, IFSC: BKID0000047, BRANCH: WALKESHWAR
```

## Features

✅ **Professional Layout**: Matches the Raju Industries template  
✅ **Company Logo**: Upload and display your company logo  
✅ **Complete Contact Info**: Phone, email, GST number displayed  
✅ **Bank Details**: Full banking information in footer  
✅ **Data Persistence**: Settings saved in browser (localStorage)  
✅ **Print-Ready**: Perfectly formatted for printing  

## Editing Your Profile

1. Click **Settings** button anytime
2. Make changes to any field
3. Click **Save Profile**
4. All new PDFs will use the updated information

## Tips for Best Results

- **Logo**: Use a PNG file with transparent background for best appearance
- **Address**: Include full address on separate lines for clarity
- **Phone Number**: Include country code (e.g., +91 9309531311)
- **GST Number**: Enter the exact GST registration number
- **Bank Details**: Ensure all bank information is accurate before saving

## Privacy & Security

⚠️ **Important**: Your company profile is stored in your browser's local storage. It is NOT sent to any server.

- Clearing browser data/cache will delete your profile
- Each device maintains its own copy of the profile
- To backup: Manually note down your settings

## Troubleshooting

**Q: My logo doesn't appear in PDF**
- A: Ensure the logo file is less than 2MB and in PNG/JPG format

**Q: Settings disappeared after browser clear**
- A: Local storage was cleared. Re-enter your information.

**Q: Can I use this on multiple devices?**
- A: No, settings are device-specific. You'll need to configure on each device.

**Q: Does this affect existing Purchase Orders?**
- A: No, it only changes how new PDFs are generated from this point forward.

## Export & Backup

To backup your settings:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `localStorage.getItem('companyProfile')`
4. Copy the output and save it safely

To restore:
1. Open Console tab
2. Type: `localStorage.setItem('companyProfile', '[PASTE_YOUR_BACKUP]')`
3. Refresh the page

---

**Need Help?** Check the main README.md or QUICK_FIX.md for more information.
