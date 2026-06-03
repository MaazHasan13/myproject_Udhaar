"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Customer {
  id: number;
  name: string;
}

interface Payment {
  id: number;
  customer_id: number;
  customer_name: string;
  amount: number;
}

export default function PaymentsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
    fetchPayments();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/customers/"
      );

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/payments/"
      );

      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPayment = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/payments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: Number(customerId),
            amount: Number(amount),
          }),
        }
      );

      if (response.ok) {
        setCustomerId("");
        setAmount("");

        fetchPayments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (payment: Payment) => {
    setEditingId(payment.id);
    setCustomerId(payment.customer_id.toString());
    setAmount(payment.amount.toString());
  };

  const updatePayment = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/payments/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: Number(customerId),
            amount: Number(amount),
          }),
        }
      );

      if (response.ok) {
        setEditingId(null);
        setCustomerId("");
        setAmount("");

        fetchPayments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePayment = async (id: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/payments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchPayments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="flex min-h-screen bg-slate-100">
    <Sidebar />

    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold text-slate-800 mb-6">
        💳 Payment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Total Payments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {payments.length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <div className="flex gap-3 flex-wrap">

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            className="
              border border-gray-300
              rounded-xl
              p-3
            "
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
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
            onClick={
              editingId
                ? updatePayment
                : addPayment
            }
            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-blue-700
              transition
            "
          >
            {editingId
              ? "Update Payment"
              : "Add Payment"}
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">
                Customer
              </th>

              <th className="p-3">
                Amount
              </th>

              <th className="p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="
                  hover:bg-slate-50
                  transition
                "
              >
                <td className="p-3">
                  {payment.customer_name}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  ₹{payment.amount}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      handleEdit(payment)
                    }
                    className="
                      bg-yellow-500
                      text-white
                      px-3 py-2
                      rounded-lg
                      mr-2
                      hover:bg-yellow-600
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePayment(payment.id)
                    }
                    className="
                      bg-red-600
                      text-white
                      px-3 py-2
                      rounded-lg
                      hover:bg-red-700
                    "
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  </div>
);
}