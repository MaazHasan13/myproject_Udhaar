"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-6 shadow-2xl">

      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          💰 Udhar App
        </h1>

        <p className="text-slate-400 mt-2">
          Admin Panel
        </p>
      </div>

      <nav className="flex flex-col gap-3">

        <Link
          href="/dashboard"
          className="
            flex items-center gap-3
            p-3 rounded-xl
            hover:bg-slate-800
            transition
          "
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          href="/customers"
          className="
            flex items-center gap-3
            p-3 rounded-xl
            hover:bg-slate-800
            transition
          "
        >
          <FaUsers />
          Customers
        </Link>

        <Link
          href="/udhaars"
          className="
            flex items-center gap-3
            p-3 rounded-xl
            hover:bg-slate-800
            transition
          "
        >
          <FaMoneyBillWave />
          Udhaars
        </Link>

        <Link
          href="/payments"
          className="
            flex items-center gap-3
            p-3 rounded-xl
            hover:bg-slate-800
            transition
          "
        >
          <FaWallet />
          Payments
        </Link>

      </nav>

      <div className="mt-auto pt-10">

        <button
          onClick={logout}
          className="
            flex items-center gap-3
            bg-red-600
            hover:bg-red-700
            transition
            px-4 py-3
            rounded-xl
            w-full
          "
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}