# Vincent Truong Alkira Login MVP

A project to showcase login and MFA functionality using React + Express

## Setup & Installation

### 1. Clone the repo
git clone https://github.com/6nce/LoginMVP
cd loginmvp

### 2. Install Dependencies
cd backend && npm install
cd frontend && npm install

### 3. Run the backend
cd backend
node server.js

### 4. Run the frontend
cd frontend
npm run dev

Frontend runs at: http://localhost:5173
Backend runs at: http://localhost:8080


## Testing (Cypress)
Run Cypress:
npx cypress open

### Notes & Learnings
- Loading times were simulated
- MFA code generation generated via Speakeasy, but simulated to display TOTP in app instead of via email
- No persistent storage
- Passwords hashed via bcrypt
