"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../components/Sidebar";

export default function CustomerDetailsPage() {
  const params = useParams();

  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/customers/${params.id}/details`
      );

      const data = await response.json();

      setCustomer(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
  <div className="flex min-h-screen bg-slate-100">
    <Sidebar />

    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold text-slate-800 mb-6">
        👤 Customer Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Total Udhaar
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹{customer.total_udhaar}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Total Payment
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ₹{customer.total_payment}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-gray-500">
            Remaining Balance
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            ₹{customer.remaining_balance}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Personal Information
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Name:</strong>{" "}
            {customer.name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {customer.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {customer.address}
          </p>

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
  </div>
);
}