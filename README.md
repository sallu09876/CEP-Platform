# CEP Platform — Customer Engagement Platform

Phase 1 MVP — Built with MERN Stack (MongoDB, Express, React, Node.js)

---

## 🚀 Tech Stack

| Layer     | Tech                             |
|-----------|----------------------------------|
| Frontend  | React (Vite) + TailwindCSS       |
| Backend   | Node.js + Express.js             |
| Database  | MongoDB + Mongoose               |
| Auth      | JWT + bcrypt                     |
| HTTP      | Axios                            |
| Routing   | React Router v6                  |

---

## 📁 Project Structure

```
cep-platform/
├── client/                   # React Frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Navbar.jsx
│       │   ├── StatCard.jsx
│       │   ├── CampaignTable.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   └── Dashboard.jsx
│       ├── services/
│       │   ├── api.js
│       │   └── authService.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── App.jsx
│       └── main.jsx
└── server/                   # Node.js Backend
    ├── config/db.js
    ├── controllers/authController.js
    ├── middleware/authMiddleware.js
    ├── models/User.js
    ├── routes/authRoutes.js
    ├── seed.js
    └── server.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/cep-platform.git
cd cep-platform
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` in `/server`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cep-platform
JWT_SECRET=cep_platform_super_secret_jwt_key_2026
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 3. Seed the database (create admin user)
```bash
npm run seed
```
This creates:
- **Email:** admin@cep.com
- **Password:** admin123

### 4. Start the backend
```bash
npm run dev
```
Server runs on: `http://localhost:5000`

### 5. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```
Client runs on: `http://localhost:5173`

---

## 🔐 Authentication

| Endpoint              | Method | Description         |
|-----------------------|--------|---------------------|
| `/api/auth/login`     | POST   | Login with email/pw |
| `/api/auth/me`        | GET    | Get current user    |

**Default Admin Credentials:**
```
Email:    admin@cep.com
Password: admin123
```

---

## 📱 Modules (Phase 1)

| Module          | Status     |
|-----------------|------------|
| Login Page      | ✅ Complete |
| Dashboard       | ✅ Complete |
| Customers       | 🔜 Phase 2 |
| Campaigns       | 🔜 Phase 2 |
| Campaign Logs   | 🔜 Phase 2 |
| Analytics       | 🔜 Phase 2 |
| Settings        | 🔜 Phase 2 |

---

## 🎨 Design System

| Token            | Value     |
|------------------|-----------|
| Primary          | `#4F46E5` |
| Sidebar          | `#0F172A` |
| Background       | `#F8FAFC` |
| Card             | `#FFFFFF` |
| Text Primary     | `#111827` |
| Text Secondary   | `#6B7280` |
| Success          | `#10B981` |
| Error            | `#EF4444` |
| Warning          | `#F59E0B` |

---

## 📦 API Response Format

```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@cep.com",
    "role": "admin"
  }
}
```
