"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (
        data.message === "Login successful"
      ) {
        localStorage.setItem(
          "customer_id",
          data.customer_id
        );

        localStorage.setItem(
          "customer_name",
          data.customer_name
        );

        router.push(
          "/customer-dashboard"
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center p-6">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

      <div className="text-center mb-8">

        <div className="text-6xl mb-4">
          👤
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Customer Login
        </h1>

        <p className="text-gray-500 mt-2">
          View your udhaar records and payment history
        </p>

      </div>

      <div className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            p-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
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
            focus:ring-green-500
          "
        />

        <button
          onClick={login}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
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
          className="
            text-green-600
            hover:underline
          "
        >
          ← Back to Home
        </button>

      </div>

       </div>
    </div>
  );
}