"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen border-r p-4">
      <h2 className="text-2xl font-bold mb-6">
        Udhar App
      </h2>

      <div className="flex flex-col gap-3">
        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/customers">
          Customers
        </Link>

        <Link href="/udhaars">
          Udhaars
        </Link>

        <li>
      <Link href="/payments">
        Payments
      </Link>
    </li>

        <button
          onClick={logout}
          className="text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
}