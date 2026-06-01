"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerDashboardPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);

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

  const logout = () => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");

    router.push("/customer-login");
  };

  if (!customer) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">
        Welcome {customer.name}
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded">
          <h2 className="font-bold">
            Total Udhaar
          </h2>

          <p className="text-2xl">
            ₹{customer.total_udhaar}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold">
            Total Payment
          </h2>

          <p className="text-2xl">
            ₹{customer.total_payment}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold">
            Remaining Balance
          </h2>

          <p className="text-2xl">
            ₹{customer.remaining_balance}
          </p>
        </div>
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

      <table className="border w-full mb-6">
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

      <button
        onClick={logout}
        className="border px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}