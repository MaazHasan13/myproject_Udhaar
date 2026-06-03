"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerDashboardPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const customerId =
      localStorage.getItem("customer_id");

    if (!customerId) {
      router.push("/customer-login");
      return;
    }

    fetchCustomerData(customerId);
  }, []);

  const fetchCustomerData = async (
    customerId: string
  ) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/customers/${customerId}/details`
      );

      const data = await response.json();

      setCustomer(data);
    } catch (error) {
      console.error(error);
    }
  };
const makePayment = async () => {

  if (Number(amount) <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (
    Number(amount) >
    customer.remaining_balance
  ) {
    alert(
      "Amount exceeds remaining balance"
    );
    return;
  }

  try {
    const customerId =
      localStorage.getItem("customer_id");

    const response = await fetch(
      "http://127.0.0.1:8000/payments/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          amount: Number(amount),
        }),
      }
    );

    if (response.ok) {
      alert("Payment Added");

      setAmount("");

      fetchCustomerData(
        customerId as string
      );
    }
  } catch (error) {
    console.error(error);
  }
};
  const logout = () => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");

    router.push("/customer-login");
  };

  if (!customer) {
    return <div className="p-6">Loading...</div>;
  }

 return (
  <div className="min-h-screen bg-slate-100 p-8">

    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome, {customer.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Track your udhaar and payments
        </p>
      </div>

      <button
        onClick={logout}
        className="
          bg-red-600
          text-white
          px-5
          py-3
          rounded-xl
          hover:bg-red-700
        "
      >
        Logout
      </button>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">
          Total Udhaar
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
          ₹{customer.total_udhaar}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">
          Total Payment
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-2">
          ₹{customer.total_payment}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">
          Remaining Balance
        </p>

        <h2 className="text-4xl font-bold text-red-500 mt-2">
          ₹{customer.remaining_balance}
        </h2>
      </div>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        💳 Make Payment
      </h2>

      <div className="flex gap-3 flex-wrap">

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="
            border border-gray-300
            rounded-xl
            p-3
          "
        />

        <button
          disabled={
            customer.remaining_balance <= 0
          }
          onClick={makePayment}
          className="
            bg-green-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-green-700
            disabled:bg-gray-400
          "
        >
          Pay Now
        </button>

      </div>

    </div>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">

      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold">
          💰 Udhaar History
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-3">
              Amount
            </th>

            <th className="p-3">
              Description
            </th>

            <th className="p-3">
              Date
            </th>
          </tr>
        </thead>

        <tbody>

          {customer.udhaars.map(
            (udhaar: any) => (
              <tr
                key={udhaar.id}
                className="
                  hover:bg-slate-50
                  transition
                "
              >
                <td className="p-3 font-semibold text-green-600">
                  ₹{udhaar.amount}
                </td>

                <td className="p-3">
                  {udhaar.description}
                </td>

                <td className="p-3">
                  {udhaar.date}
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold">
          💳 Payment History
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-3">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>

          {customer.payments.map(
            (payment: any) => (
              <tr
                key={payment.id}
                className="
                  hover:bg-slate-50
                  transition
                "
              >
                <td className="p-3 font-semibold text-blue-600">
                  ₹{payment.amount}
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>

  </div>
);
}