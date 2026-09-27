# Client Lead Management System

A full-stack Client Lead Management System (CRM) built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. Designed for managing sales pipelines, lead acquisition sources, contact interactions, and conversion analytics.

---

## Key Features

- 🔐 **Authentication & Authorization**: Secure JWT-based login and registration with encrypted passwords (bcryptjs).
- 📊 **Interactive Dashboard**: Real-time KPI summary cards (Total Leads, New, Contacted, Converted, Lost) with calculated conversion rates.
- 📈 **Pipeline Analytics**: Lead acquisition source breakdown metrics and recent leads activity feed.
- 🗂️ **Leads Directory**: Responsive table with status and priority badges.
- 🔍 **Real-time Search & Multi-Filtering**: Instant search across name, email, company, or phone, alongside filter options by status and priority.
- ✏️ **Lead Operations**: Complete CRUD capabilities for adding, updating, and deleting leads.
- 📄 **Lead Details View**: Complete profile view with inline status/priority controls, contact links, notes history, and timestamps.
- 📱 **Responsive UI**: Fully responsive sidebar drawer navigation, clean top navbar, and mobile-ready layouts.

---

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT) & bcryptjs

---

## Project Structure

```
client-lead-crm/
├── backend/
│   ├── config/
│   │   └── db.js               # Database connection setup
│   ├── controllers/
│   │   ├── authController.js   # Registration and login handlers
│   │   └── leadController.js   # Lead CRUD & analytics handlers
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication guard
│   ├── models/
│   │   ├── User.js             # User Mongoose schema
│   │   └── Lead.js             # Lead Mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth API endpoints
│   │   └── leadRoutes.js       # Lead API endpoints
│   ├── seeders/
│   │   └── seedData.js         # Database seeding script
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Express server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axiosInstance.js  # Axios instance with auth interceptors
    │   ├── components/
    │   │   ├── Navbar.jsx       # Header navigation bar
    │   │   ├── Sidebar.jsx      # Drawer sidebar
    │   │   ├── StatCard.jsx     # Dashboard metric widget
    │   │   ├── LeadTable.jsx    # Data table for leads
    │   │   ├── LeadFormModal.jsx# Form modal for creation/editing
    │   │   └── ProtectedRoute.jsx# Auth route guard
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global Auth state
    │   ├── pages/
    │   │   ├── LoginPage.jsx    # Login page
    │   │   ├── RegisterPage.jsx # Registration page
    │   │   ├── DashboardPage.jsx# Analytical Dashboard
    │   │   ├── LeadsPage.jsx    # Leads directory page
    │   │   └── LeadDetailsPage.jsx # Detailed lead page
    │   ├── App.jsx              # Application router setup
    │   ├── main.jsx             # App entry point
    │   └── index.css            # Tailwind directives & styles
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or MongoDB Atlas)

---

## Environment Variables

Create a `.env` file inside the `backend` directory (refer to `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/client_lead_crm
JWT_SECRET=your_custom_jwt_secret_key
NODE_ENV=development
```

---

## Installation & Execution

### 1. Setup & Run Backend

```bash
cd backend
npm install
npm start
```
> The Express server will run on `http://localhost:5000`.

### 2. Setup & Run Frontend

```bash
cd frontend
npm install
npm run dev
```
> The React app will run on `http://localhost:5173`.

---

## Account Setup & Authentication

To start using the application:
1. Navigate to `http://localhost:5173/register` (or click **Register here** on the Login screen).
2. Enter your Name, Email, Password, and Role (`Sales Rep`, `Manager`, or `Admin`) to create a new user account.
3. Sign in on the Login page with your newly created credentials.

---

## API Overview

### Auth Endpoints
| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user details | Private |

### Lead Endpoints
| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/leads` | Fetch all leads (with search & filters) | Private |
| `GET` | `/api/leads/stats/summary` | Fetch dashboard KPI counts & metrics | Private |
| `POST` | `/api/leads` | Create a new lead | Private |
| `GET` | `/api/leads/:id` | Fetch single lead details | Private |
| `PUT` | `/api/leads/:id` | Update lead record | Private |
| `DELETE` | `/api/leads/:id` | Delete lead record | Private |

---

## Screenshots

*(Include screenshots of Dashboard, Leads Directory, Lead Form, and Lead Details page here)*
