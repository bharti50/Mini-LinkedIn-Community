"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");
      router.push("/auth/login");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white border border-black-200 rounded-2xl p-8 w-full max-w-md space-y-6 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border border-black-300 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border border-black-300 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border border-black-300 p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-pink-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}