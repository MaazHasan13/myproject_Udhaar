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
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-5">
          Payments
        </h1>

        <div className="flex gap-3 mb-6">
          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            className="border p-2"
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
            className="border p-2"
          />

          <button
            onClick={
              editingId
                ? updatePayment
                : addPayment
            }
            className="border px-4 py-2"
          >
            {editingId
              ? "Update Payment"
              : "Add Payment"}
          </button>
        </div>

        <table className="border w-full">
          <thead>
            <tr>
              <th className="border p-2">
                Customer
              </th>

              <th className="border p-2">
                Amount
              </th>

              <th className="border p-2">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border p-2">
                  {payment.customer_name}
                </td>

                <td className="border p-2">
                  ₹{payment.amount}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() =>
                      handleEdit(payment)
                    }
                    className="border px-3 py-1 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePayment(payment.id)
                    }
                    className="border px-3 py-1"
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
  );
}