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
      const response = await fetch(
        `http://127.0.0.1:8000/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditId(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
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
            address,
          }),
        }
      );

      if (response.ok) {
        setName("");
        setPhone("");
        setAddress("");

        setEditId(null);
        setIsEditing(false);

        fetchCustomers();
      }
    } catch (error) {
      console.error(error);
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
  <div className="flex">
    <Sidebar />

    <div className="p-6 flex-1">
      <h1 className="text-3xl font-bold mb-4">
        Customers
      </h1>

            <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-56 h-10"
      />
      <div className="mb-6 flex gap-3 items-center flex-wrap">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-56 h-10"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-56 h-10"
        />

                    <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border p-2"
            />
            
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-56 h-10"
        />
        

        <button
          onClick={
            isEditing
              ? updateCustomer
              : addCustomer
          }
          className="border px-4 h-10"
        >
          {isEditing
            ? "Update Customer"
            : "Add Customer"}
        </button>
      </div>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Remaining Balance</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (      
            <tr key={customer.id}>
              <td className="border p-2">
                {customer.id}
              </td>

              <td className="border p-2">
                {customer.name}
              </td>

              <td className="border p-2">
                {customer.phone}
              </td>

              <td className="border p-2">
                {customer.address}
              </td>

             <td className="border p-2">
  ₹{customer.remaining_balance}
</td>

<td className="border p-2">
  <button
    onClick={() =>
      router.push(
        `/customers/${customer.id}`
      )
    }
    className="border px-3 py-1 mr-2"
  >
    View
  </button>

  <button
    onClick={() =>
      handleEdit(customer)
    }
    className="border px-3 py-1 mr-2"
  >
    Edit
  </button>

  <button
    onClick={() =>
      deleteCustomer(customer.id)
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