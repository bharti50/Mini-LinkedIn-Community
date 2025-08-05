"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 bg-green-50 rounded-lg max-w-sm mx-auto mt-10 shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Register
      </button>
    </form>
  );
}