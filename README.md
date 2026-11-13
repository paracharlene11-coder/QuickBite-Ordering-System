# QuickBite — Version 10

Milestone: Final homepage and authentication polish

## Requirements
- Node.js 20+
- npm
- XAMPP/MySQL from Version 09 onward

## Start frontend
```bash
cd frontend
npm install
npm run dev
```

## Start backend (Version 02 onward)
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
Use `cp .env.example .env` on macOS/Linux.

## MySQL (Version 09 onward)
1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin and import `database/schema.sql`.
3. Set the database values and JWT secret in `backend/.env`.
4. Restart the backend.

Frontend: http://localhost:5173  
Backend health: http://localhost:5000/api/health

## Suggested GitHub commit
`Polish homepage and authentication experience`

This ZIP is a complete project snapshot. The next version adds the next small milestone.


## Version 11 — Customer dashboard foundation

Milestone: Customer dashboard foundation

Git commit message:
`Create customer dashboard layout and welcome panel`

This ZIP is a cumulative project snapshot based on Version 10. Copy the project files into your existing QuickBite working folder without copying or replacing its `.git` directory. Review `git status` before committing.

Feature note: This milestone is part of Level 4 (Customer Dashboard) and Level 5 (Shopping Cart). Checkout and payment processing are not included in these levels.
