# Secure Auth System 🔐

A reusable authentication and authorization system built with Node.js, Express, JWT, and MongoDB. This module provides simple but secure user registration, login, protected routes, and role-based access control.

---

#🧑‍💻 Changes Required by the User

To integrate this module into your app:

1. Create a .env file and add your MongoDB URI and JWT secret.

2. Call connectDB() before any route usage.

3. Use authRoutes at a route like /api/auth or change it as needed.

4. Protect your own routes using protect and allowRoles() middleware.

4. If you want to extend the User model (e.g., add phone number), update the model in your fork or local version.


---

## ✨ Features

- JWT-based authentication
- Password hashing with bcrypt
- Middleware to protect routes
- Role-based authorization
- Modular and easy to integrate
- MongoDB support with Mongoose

---

## 📦 Installation

```bash
npm install secure-auth-system
