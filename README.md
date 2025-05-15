# 🔐 secure-auth-system

A simple and modular JWT-based **authentication and authorization middleware system** for Node.js & Express apps. Built to be reusable across any kind of project, whether you're building an API, admin panel, or e-commerce app.

---

## 📦 Installation

```bash
npm install secure-auth-system
```

---

## ⚙️ Environment Variables

Before using this package, make sure to configure your `.env` file with the following keys:

```env
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

These secrets are used for signing access and refresh tokens respectively.

---

## 🚀 Features

- 🔑 Access Token Generation (JWT)
- 🔁 Refresh Token Generation & Verification
- 🛡️ Middleware for Route Protection (`protect`)
- 🧠 Role-Based Access Control (`roleCheck`)
- ♻️ Stateless and reusable (no DB or routing dependencies)

---

## 📁 Usage

### 1. **Import the package**

```js
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
  protect,
  roleCheck,
} = require("secure-auth-system");
```

---

### 2. **Generate Tokens**

Use these in your login or registration controller.

```js
const accessToken = generateToken({ id: user._id, role: user.role });
const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
```

---

### 3. **Protect Routes**

Apply `protect` middleware to any route that requires authentication.

```js
const express = require("express");
const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
```

---

### 4. **Restrict Access by Role**

Use `roleCheck("admin")` to allow only specific roles.

```js
router.get("/admin-only", protect, roleCheck("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});
```

---

### 5. **Refresh Access Tokens**

Create your own route using the `verifyToken()` utility.

```js
app.post("/refresh-token", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = verifyToken(token, process.env.JWT_REFRESH_SECRET);
  if (!decoded) return res.status(403).json({ message: "Invalid refresh token" });

  const newAccessToken = generateToken({ id: decoded.id, role: decoded.role });
  res.json({ accessToken: newAccessToken });
});
```

---

## 🛠️ Customization

This package assumes you:
- Handle your **own user model/database logic** (it doesn’t connect to MongoDB or any DB).
- Handle your **own routes** (this package does not include any Express routing).
- Store and verify refresh tokens on your own (e.g., in DB or cookies).

---

## 👥 Roles & Authorization

You can pass any `role` when generating a token and use `roleCheck('your-role')` to restrict access to specific roles.

---

## 📤 Contributing

Contributions, issues, and feature requests are welcome. Open a PR or issue on GitHub.

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

**Vishal Vinod**  
Self-learning MERN stack developer  
📍 Kerala, India

---

## 💬 Feedback

If you use this package and have feedback or suggestions, feel free to reach out or open an issue on [GitHub](https://github.com/VishaL-02-Dev/secure-auth-system).