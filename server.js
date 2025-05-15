const express = require("express");
const dotenv = require("dotenv");
const {
  generateToken,
  generateRefreshToken,
  protect,
  roleCheck,
} = require("./index"); 

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET;

// Login route
app.post("/login", (req, res) => {
  const { id, role } = req.body;

  if (!id || !role) {
    return res.status(400).json({ message: "Please provide id and role" });
  }

  const accessToken = generateToken({ id, role }, JWT_SECRET, "30s");
  const refreshToken = generateRefreshToken({ id, role }, JWT_REFRESH_SECRET, "1m");

  res.json({ accessToken, refreshToken });
});


// Protected routes
app.get("/protected", protect(JWT_SECRET), (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

// Role-based route access
app.get(
  "/admin-only",
  protect(JWT_SECRET),
  roleCheck(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin", user: req.user });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
