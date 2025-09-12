# 💰 Personal Finance Tracker – Backend (MERN Assignment)

## 🚀 Overview
This is the **backend API** for the Personal Finance Tracker, built with **Node.js, Express, MongoDB, and JWT authentication**.  
It allows users to **register, log in, and manage personal finance transactions (CRUD)**, with support for **debit/credit categorization** and **balance calculation**.

---

## 📦 Tech Stack
- **Node.js** + **Express.js** → REST API server  
- **MongoDB** + **Mongoose** → database  
- **JWT (JSON Web Tokens)** → authentication  
- **bcrypt.js** → password hashing  
- **dotenv** → environment variables  
- **cors** → handle cross-origin requests  
- **nodemon** (dev only) → hot-reload server  

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/pravin7878/personal_finance_tracker.git
cd personal_finance_tracker/backend
```
### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a .env file in backend/ with:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server
bash
Copy code
# Development
npm run dev

# Production
npm start
The server will start at:
👉 http://localhost:8080