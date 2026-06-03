"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import {
  FaUsers,
  FaMoneyBillWave,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

interface Udhaar {
  id: number;
  amount: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [customerCount, setCustomerCount] = useState(0);
  const [udhaarCount, setUdhaarCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const customerResponse = await fetch(
        "http://127.0.0.1:8000/customers/"
      );

      const customerData = await customerResponse.json();

      setCustomerCount(customerData.length);

      const udhaarResponse = await fetch(
        "http://127.0.0.1:8000/udhaars/"
      );

      const udhaarData = await udhaarResponse.json();

      setUdhaarCount(udhaarData.length);

      const total = udhaarData.reduce(
        (sum: number, udhaar: Udhaar) =>
          sum + udhaar.amount,
        0
      );
      const summaryResponse = await fetch(
  "http://127.0.0.1:8000/customers/summary"
);

const summaryData = await summaryResponse.json();

const totalRemaining = summaryData.reduce(
  (sum: number, customer: any) =>
    sum + customer.remaining_balance,
  0
);

setRemainingBalance(totalRemaining);

      setTotalAmount(total);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

 return (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Admin 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor customers, udhaars and payments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-600">
              Customers
            </h2>

            <FaUsers className="text-blue-600 text-3xl" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {customerCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-600">
              Udhaars
            </h2>

            <FaChartLine className="text-orange-500 text-3xl" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {udhaarCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-600">
              Total Udhaar
            </h2>

            <FaMoneyBillWave className="text-green-600 text-3xl" />
          </div>

          <p className="text-4xl font-bold mt-4 text-green-600">
            ₹{totalAmount}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-600">
              Remaining Balance
            </h2>

            <FaWallet className="text-red-500 text-3xl" />
          </div>

          <p className="text-4xl font-bold mt-4 text-red-500">
            ₹{remainingBalance}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-3">
          Dashboard Overview
        </h2>

        <p className="text-gray-600">
          This dashboard gives you a complete overview
          of customers, udhaars, payments and remaining
          balances across your business.
        </p>
      </div>

      </div>
    </div>
  );
}