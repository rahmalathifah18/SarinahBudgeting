import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("division", res.data.division);
      navigate("/dashboard");
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <img src="/sarinah-logo.png" alt="Sarinah Logo" className="w-40 mb-6" />
      <h1 className="text-2xl font-bold mb-4">OPTIMA</h1>
      <p className="mb-6">Digital Budget Approval & Tracking System</p>
      <div className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-red-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const role = localStorage.getItem("role");
  const division = localStorage.getItem("division");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <img src="/sarinah-logo.png" alt="Logo" className="w-32" />
        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>
      <h2 className="text-xl font-bold">Dashboard ({role})</h2>
      {role === "user" && (
        <p>Selamat datang, Anda bisa membuat proposal untuk divisi {division}</p>
      )}
      {role === "reviewer" && <p>Anda bisa mereview semua proposal</p>}
      {role === "approver" && <p>Anda bisa approve/reject proposal</p>}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
