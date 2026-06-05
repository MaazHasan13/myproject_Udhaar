"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/products/"
    );

    const data = await response.json();

    setProducts(data);
  };

  const addProduct = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/products/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          category,
          stock: Number(stock),
          image_url: imageUrl,
        }),
      }
    );

    if (response.ok) {
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setImageUrl("");

      fetchProducts();
    }
  };

  const deleteProduct = async (
    id: number
  ) => {
    const response = await fetch(
      `http://127.0.0.1:8000/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchProducts();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          📦 Products
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Add Product
          </h2>

          <div className="grid md:grid-cols-5 gap-4">

            <input
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              placeholder="Stock"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
              className="border p-3 rounded-xl"
            />

          </div>

          <button
            onClick={addProduct}
            className="
              mt-4
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Add Product
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
              "
            >

              <div className="text-5xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                ₹{product.price}
              </p>

              <p className="text-gray-500">
                Category: {product.category}
              </p>

              <p className="text-gray-500">
                Stock: {product.stock}
              </p>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="
                  mt-4
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}