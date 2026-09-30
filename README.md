# Polar Science Portal Monorepo

## Structure
- client/ — React frontend
- server/ — Node.js/Express backend with MongoDB

---

## Quick Start

### Prerequisites
- Node.js & npm
- MongoDB running locally (default: mongodb://localhost:27017/polar-portal)

---

### Setup Backend (server)
```bash
cd server
npm install
cp .env.example .env # edit .env for secret & Mongo settings
npm run dev
```

### Setup Frontend (client)
```bash
cd ../client
npm install
npm start
```

---

### Admin Login
- Register a user via `/api/auth/register` (backend) or frontend admin signup page (if enabled)
- Or insert directly in MongoDB (hashed using bcrypt)

---

### Media Files
- Uploaded files stored in `server/uploads/`

---

## Features
- Archive: Expeditions, Datasets, Publications, Media, Activities
- Admin: Secure upload, dashboard
- Public: Browse, search, view/download
- Social share buttons

---

##### Built for Smart Education, MoES + MIC
