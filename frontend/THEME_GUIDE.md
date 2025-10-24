# Theme Customization Guide

## How Users Can Change the Theme

### Method 1: Using the Settings Panel (Easiest)

1. **Click the ⚙️ Settings button** in the top-right corner of the Purchase Order System dashboard
2. **Scroll down** to the **"Theme Colors"** section
3. You'll see three customizable colors:
   - **Primary Color** (Purple by default: #8B00FF)
   - **Secondary Color** (Cyan by default: #00CED1)
   - **Accent Color** (Pink by default: #ff6a82)

4. **Change colors in two ways:**
   - Click the **color picker square** to visually select a color
   - Or type the **hex color code** (e.g., #FF0000) in the text field

5. **Changes apply instantly** - the entire app theme updates in real-time!

6. **Reset to default** - Click the "Reset to Default Theme" button to restore the original purple, cyan, and pink colors

### How It Works Behind the Scenes

- **Storage**: Theme colors are saved in your browser's localStorage
- **Persistence**: Your custom theme is remembered even after you close and reopen the browser
- **Real-time**: Changes apply immediately throughout the entire application
- **No backend required**: Theme customization is entirely client-side

### Default Colors

| Color | Default Value | Usage |
|-------|---------------|-------|
| Primary | #8B00FF (Purple) | Headers, buttons, main UI elements |
| Secondary | #00CED1 (Cyan) | Accents, highlights, secondary buttons |
| Accent | #ff6a82 (Pink) | Action buttons, alerts, special highlights |

### Technical Details

The theme system uses:
- **React Context API** for state management
- **localStorage** for persistence
- **CSS custom properties** for dynamic color application
- **Tailwind CSS** integration

When you change a theme color, it:
1. Updates the ThemeContext state
2. Saves to localStorage
3. Updates CSS custom properties on the root element
4. Tailwind colors update in real-time

### Color Format Support

- ✅ Hex codes: `#FF0000`, `#F00`
- ✅ RGB: `rgb(255, 0, 0)`
- ✅ Named colors: `red`, `blue`, etc.
- ✅ HSL: `hsl(0, 100%, 50%)`

### Tips for Best Results

1. **Use high contrast** - Ensure primary and secondary colors have good contrast with white text
2. **Test on different pages** - Check how your colors look across different screens
3. **Mobile friendly** - Colors work the same on desktop and mobile
4. **Print friendly** - Consider how your theme looks when printing PDFs

---

**Example: Creating a Dark Blue Theme**
- Primary: #003D99 (Dark Blue)
- Secondary: #0099CC (Light Blue)
- Accent: #FF6600 (Orange)

This would create a professional blue and orange theme perfect for business use!
