"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "token",
          data.access_token
        );

        router.push("/dashboard");
      } else {
        alert(data.detail);
      }
    } catch (error) {
      alert("Server Error");
    }
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center p-6">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

      <div className="text-center mb-8">

        <div className="text-6xl mb-4">
          🔐
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Login
        </h1>

        <p className="text-gray-500 mt-2">
          Sign in to access the admin dashboard
        </p>

      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            p-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            p-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            p-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Login
        </button>

      </div>

      <div className="mt-6 text-center">

        <button
          onClick={() => router.push("/")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

      </div>

      </div>
    </div>
  );
}