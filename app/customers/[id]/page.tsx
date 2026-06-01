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
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">
          Customer Details
        </h1>

        <div className="border p-4 mb-6">
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

          <p>
            <strong>Total Udhaar:</strong> ₹
            {customer.total_udhaar}
          </p>

          <p>
            <strong>Total Payment:</strong> ₹
            {customer.total_payment}
          </p>

          <p>
            <strong>Remaining Balance:</strong> ₹
            {customer.remaining_balance}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Udhaar History
        </h2>

        <table className="border w-full mb-8">
          <thead>
            <tr>
              <th className="border p-2">
                Amount
              </th>
              <th className="border p-2">
                Description
              </th>
              <th className="border p-2">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {customer.udhaars.map(
              (udhaar: any) => (
                <tr key={udhaar.id}>
                  <td className="border p-2">
                    ₹{udhaar.amount}
                  </td>

                  <td className="border p-2">
                    {udhaar.description}
                  </td>

                  <td className="border p-2">
                    {udhaar.date}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <h2 className="text-2xl font-bold mb-3">
          Payment History
        </h2>

        <table className="border w-full">
          <thead>
            <tr>
              <th className="border p-2">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {customer.payments.map(
              (payment: any) => (
                <tr key={payment.id}>
                  <td className="border p-2">
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