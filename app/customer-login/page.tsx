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
    <div className="flex justify-center items-center h-screen">
      <div className="border p-6 rounded w-96">
        <h1 className="text-3xl font-bold mb-5">
          Customer Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={login}
          className="border px-4 py-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}