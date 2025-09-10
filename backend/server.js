import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const JWT_SECRET = "optima_secret_key";

// Dummy users (untuk testing login)
const users = [
  {
    id: 1,
    role: "user",
    email: "user.marketing@sarinah.id",
    password: "User123!",
    division: "Marketing"
  },
  {
    id: 2,
    role: "reviewer",
    email: "reviewer.bp@sarinah.id",
    password: "Reviewer123!",
    division: "Budget Control"
  },
  {
    id: 3,
    role: "approver",
    email: "approver.dir@sarinah.id",
    password: "Approver123!",
    division: "Direksi"
  }
];

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, division: user.division },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role, division: user.division });
});

// Protected route example
app.get("/api/dashboard", (req, res) => {
  res.json({ message: "Dashboard data placeholder" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
