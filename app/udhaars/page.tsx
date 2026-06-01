"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Customer {
  id: number;
  name: string;
}
interface Udhaar {
  id: number;
  customer_id: number;
  customer_name: string;
  amount: number;
  description: string;
  date: string;
}

export default function UdhaarsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [udhaars, setUdhaars] = useState<Udhaar[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  

  useEffect(() => {
  fetchCustomers();
  fetchUdhaars();
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
  const fetchUdhaars = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/udhaars/"
    );

    const data = await response.json();

    setUdhaars(data);
  } catch (error) {
    console.error(error);
  }
};

const deleteUdhaar = async (id: number) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/udhaars/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchUdhaars();
    }
  } catch (error) {
    console.error(error);
  }
};
const editUdhaar = (udhaar: Udhaar) => {
  setEditingId(udhaar.id);
  setCustomerId(udhaar.customer_id.toString());
  setAmount(udhaar.amount.toString());
  setDescription(udhaar.description);
  setDate(udhaar.date);
};
const updateUdhaar = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/udhaars/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          amount: Number(amount),
          description,
          date,
        }),
      }
    );

    if (response.ok) {
      alert("Udhaar Updated");

      setEditingId(null);
      setCustomerId("");
      setAmount("");
      setDescription("");
      setDate("");

      fetchUdhaars();
    }
  } catch (error) {
    console.error(error);
  }
};

const addUdhaar = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/udhaars/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          amount: Number(amount),
          description,
          date,
        }),
      }
    );

    if (response.ok) {
      alert("Udhaar Added");

      setCustomerId("");
      setAmount("");
      setDescription("");
      setDate("");

      fetchUdhaars();
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
        Udhaars
      </h1>

      <div className="flex flex-wrap gap-3">
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

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-2"
        />

       <input
  type="date"
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
  className="border p-2"
/>

        <button
  onClick={
    editingId
      ? updateUdhaar
      : addUdhaar
  }
  className="border px-4 py-2"
>
  {editingId
    ? "Update Udhaar"
    : "Add Udhaar"}
</button>
      </div>
      <table className="border w-full mt-6">
  <thead>
  <tr>
    <th className="border p-2">Customer</th>
    <th className="border p-2">Amount</th>
    <th className="border p-2">Description</th>
    <th className="border p-2">Date</th>
    <th className="border p-2">Actions</th>
  </tr>
</thead>

  <tbody>
  {udhaars.map((udhaar) => (
    <tr key={udhaar.id}>
      <td className="border p-2">
        {udhaar.customer_name}
      </td>

      <td className="border p-2">
        ₹{udhaar.amount}
      </td>

      <td className="border p-2">
        {udhaar.description}
      </td>

      <td className="border p-2">
        {udhaar.date}
      </td>

     <td className="border p-2">
  <button
    onClick={() => editUdhaar(udhaar)}
    className="border px-3 py-1 mr-2"
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteUdhaar(udhaar.id)
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