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
  // const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [udhaars, setUdhaars] = useState<Udhaar[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  

//   useEffect(() => {
//   fetchCustomers();
//   fetchUdhaars();
// }, []);

interface Product {
  id: number;
  name: string;
  price: number;
}

const [products, setProducts] = useState<Product[]>([]);
const [selectedProductId, setSelectedProductId] = useState("");
const [quantity, setQuantity] = useState("1");

useEffect(() => {
  fetchCustomers();
  fetchUdhaars();
  fetchProducts();
}, []);
const fetchProducts = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/products/"
  );

  const data = await response.json();

  setProducts(data);
};
const selectedProduct = products.find(
  (p) => p.id === Number(selectedProductId)
);

const calculatedAmount =
  selectedProduct
    ? selectedProduct.price * Number(quantity)
    : 0;

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
  // setAmount(udhaar.amount.toString());
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
          amount: calculatedAmount,
          description:
  selectedProduct?.name || "",
          date,
        }),
      }
    );

    if (response.ok) {
      alert("Udhaar Updated");

      setCustomerId("");
setSelectedProductId("");
setQuantity("1");
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
  amount: calculatedAmount,
  description: selectedProduct?.name || "",
  date,
}),
      }
    );

    if (response.ok) {
      alert("Udhaar Added");
setCustomerId("");
setSelectedProductId("");
setQuantity("1");
setDescription("");
setDate("");

      fetchUdhaars();
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
        💰 Udhaar Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Total Udhaars
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {udhaars.length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <div className="flex flex-wrap gap-3">

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
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

          <select
  value={selectedProductId}
  onChange={(e) =>
    setSelectedProductId(e.target.value)
  }
  className="border border-gray-300 rounded-xl p-3"
>
  <option value="">
    Select Product
  </option>

  {products.map((product) => (
    <option
      key={product.id}
      value={product.id}
    >
      {product.name} - ₹{product.price}
    </option>
  ))}
</select>

<input
  type="number"
  min="1"
  value={quantity}
  onChange={(e) =>
    setQuantity(e.target.value)
  }
  placeholder="Qty"
  className="border border-gray-300 rounded-xl p-3"
/>

          {/* <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          /> */}

<div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl font-bold">
  Total: ₹{calculatedAmount}
</div>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          />

          <button
            onClick={
              editingId
                ? updateUdhaar
                : addUdhaar
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
              ? "Update Udhaar"
              : "Add Udhaar"}
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
                Description
              </th>

              <th className="p-3">
                Date
              </th>

              <th className="p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {udhaars.map((udhaar) => (
              <tr
                key={udhaar.id}
                className="
                  hover:bg-slate-50
                  transition
                "
              >
                <td className="p-3">
                  {udhaar.customer_name}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  ₹{udhaar.amount}
                </td>

                <td className="p-3">
                  {udhaar.description}
                </td>

                <td className="p-3">
                  {udhaar.date}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      editUdhaar(udhaar)
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
                      deleteUdhaar(
                        udhaar.id
                      )
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