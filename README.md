# QuickBite — Opening Page

A runnable React + TypeScript + Vite opening-page prototype for the QuickBite food ordering system.

## Included
- Responsive landing page
- Navigation with mobile menu
- Get Started and Log in dialogs
- Demo registration/login forms (frontend only)
- Food categories and category filtering
- Search meals
- Add-to-cart demo counter
- Favorite/like interaction
- Toast notifications
- Responsive layout for desktop, tablet, and mobile

## Requirements
- Node.js 18 or newer
- npm
- VS Code (recommended)

## Run locally
1. Extract the ZIP file.
2. Open the extracted `QuickBite_Opening_Page` folder in VS Code.
3. Open Terminal in VS Code.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in the terminal, usually:

   `http://localhost:5173`

## Create a production build

```bash
npm run build
npm run preview
```

The production files will be generated in the `dist` folder.

## Important scope note
This package contains the **opening page only**. Login and registration are frontend demonstrations and do not create real accounts. The cart counter is also a temporary UI demonstration. No backend, MySQL database, payment processing, or real order submission is included yet. Those will be connected in later QuickBite development phases.

Food photos and customer avatar images are loaded from external image URLs, so an internet connection is needed to display those images.
