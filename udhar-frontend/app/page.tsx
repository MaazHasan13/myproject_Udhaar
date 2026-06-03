"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full">

        <div className="text-center">

          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Udhar Management
          </h1>

          <h2 className="text-2xl text-blue-600 font-semibold mb-6">
            Smart Credit & Payment Tracking System
          </h2>

          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Manage customers, track udhaar records,
            monitor payments and provide customer
            self-service dashboards from one place.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              👥 Customers
            </h3>

            <p className="text-gray-600">
              Manage customer records,
              contact details and balances.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              💰 Udhaar Tracking
            </h3>

            <p className="text-gray-600">
              Track every transaction
              with complete history.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              💳 Payments
            </h3>

            <p className="text-gray-600">
              Record payments and monitor
              remaining balances.
            </p>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <button
            onClick={() => router.push("/login")}
            className="
              bg-black
              text-white
              px-8
              py-4
              rounded-xl
              text-lg
              font-semibold
              hover:scale-105
              transition
            "
          >
            Admin Login
          </button>

          <button
            onClick={() =>
              router.push("/customer-login")
            }
            className="
              bg-blue-600
              text-white
              px-8
              py-4
              rounded-xl
              text-lg
              font-semibold
              hover:bg-blue-700
              hover:scale-105
              transition
            "
          >
            Customer Login
          </button>

        </div>

      </div>

    </div>
  );
}