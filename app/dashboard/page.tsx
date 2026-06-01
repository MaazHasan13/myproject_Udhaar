"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

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
  <div className="flex">
    <Sidebar />

    <div className="p-6 flex-1">
      <h1 className="text-3xl font-bold">
        Welcome Admin
      </h1>

     <div className="grid grid-cols-4 gap-4 mt-6">

  <div className="border rounded p-4">
    <h2 className="font-bold">
      Customers
    </h2>
    <p className="text-2xl">
      {customerCount}
    </p>
  </div>

  <div className="border rounded p-4">
    <h2 className="font-bold">
      Udhaars
    </h2>
    <p className="text-2xl">
      {udhaarCount}
    </p>
  </div>

  <div className="border rounded p-4">
    <h2 className="font-bold">
      Total Udhaar
    </h2>
    <p className="text-2xl">
      ₹{totalAmount}
    </p>
  </div>

  <div className="border rounded p-4">
    <h2 className="font-bold">
      Remaining Balance
    </h2>
    <p className="text-2xl">
      ₹{remainingBalance}
    </p>
  </div>

</div>

      {/* <button
        onClick={logout}
        className="mt-4 border px-4 py-2 rounded"
      >
        Logout
      </button> */}
    </div>
  </div>
);
}