"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  remaining_balance?: number;
}


export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
  try {
    const customerResponse = await fetch(
      "http://127.0.0.1:8000/customers/"
    );

    const customersData =
      await customerResponse.json();

    const summaryResponse = await fetch(
      "http://127.0.0.1:8000/customers/summary"
    );

    const summaryData =
      await summaryResponse.json();

    const mergedData = customersData.map(
      (customer: Customer) => {
        const summary = summaryData.find(
          (s: any) =>
            s.customer_id === customer.id
        );

        return {
          ...customer,
          remaining_balance:
            summary?.remaining_balance || 0,
        };
      }
    );

    setCustomers(mergedData);
  } catch (error) {
    console.error(error);
  }
};

  const addCustomer = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/customers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            address,
          })
        }
      );

      if (response.ok) {
        setName("");
        setPhone("");
        setAddress("");

        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
    }
  };
const deleteCustomer = async (id: number) => {
  try {
    console.log("Deleting customer:", id);

    const response = await fetch(
      `http://127.0.0.1:8000/customers/${id}`,
      {
        method: "DELETE",
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
      fetchCustomers();
    }

  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};

  const handleEdit = (customer: any) => {
  setEditId(customer.id);
  setName(customer.name);
  setPhone(customer.phone);
  setEmail(customer.email || "");
  setAddress(customer.address);
  setIsEditing(true);
};

 const updateCustomer = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/customers/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
        }),
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
  }
};
  const filteredCustomers = customers.filter(
  (customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.phone.includes(search)
);

  return (
  <div className="flex min-h-screen bg-slate-100">
    <Sidebar />

    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold text-slate-800 mb-6">
        👥 Customer Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {customers.length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

        <input
          type="text"
          placeholder="🔍 Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border border-gray-300
            rounded-xl
            p-3
            w-full md:w-80
            mb-4
          "
        />

        <div className="flex gap-3 flex-wrap">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="border border-gray-300 rounded-xl p-3"
          />

          <button
            onClick={
              isEditing
                ? updateCustomer
                : addCustomer
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
            {isEditing
              ? "Update Customer"
              : "Add Customer"}
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">
                Remaining Balance
              </th>
              <th className="p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  className="
                    hover:bg-slate-50
                    transition
                  "
                >
                  <td className="p-3">
                    {customer.id}
                  </td>

                  <td className="p-3">
                    {customer.name}
                  </td>

                  <td className="p-3">
                    {customer.phone}
                  </td>

                  <td className="p-3">
                    {customer.address}
                  </td>

                  <td className="p-3 font-semibold text-red-500">
                    ₹{customer.remaining_balance}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        router.push(
                          `/customers/${customer.id}`
                        )
                      }
                      className="
                        bg-blue-600
                        text-white
                        px-3 py-2
                        rounded-lg
                        mr-2
                      "
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(customer)
                      }
                      className="
                        bg-yellow-500
                        text-white
                        px-3 py-2
                        rounded-lg
                        mr-2
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
                      }
                      className="
                        bg-red-600
                        text-white
                        px-3 py-2
                        rounded-lg
                      "
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  </div>
);
}