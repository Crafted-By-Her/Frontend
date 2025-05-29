import React, { useState, useEffect } from "react";
import {  ChevronRight, ChevronLeft } from "lucide-react";
import SellProduct from "../SellProduct";

const Product = () => {
  const [showSellModal, setShowSellModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const ButtonItems = [
    { name: "All", activeTab: "all" },
    { name: "Shoes", activeTab: "shoes" },
    { name: "Bags & Purses", activeTab: "bags" },
    { name: "Clothing", activeTab: "clothing" },
    { name: "Home & Living", activeTab: "home" },
  ];
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await fetch(
          `${apiUrl}/api/users/my-products`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleNewProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: prevProducts.length + 1 },
    ]);
    setShowSellModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      product.category.toLowerCase().includes(searchTermLower) ||
      product.price.toString().includes(searchTermLower);
    const matchesCategory =
      activeTab === "all" || product.category.toLowerCase() === activeTab;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div>
      <h2 className="text-3xl text-gray-900 font-semibold mb-4">Product</h2>
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search for product"
            className="border rounded-2xl px-4 py-3 w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-3 rounded"
            onClick={() => setShowSellModal(true)}
          >
            + New Product
          </button>
        </div>
        <div className="flex justify-around border text-gray-900 font-semibold px-2 py-2 rounded-2xl space-x-4 mb-4">
          {ButtonItems.map((item) => (
            <button
              key={item.activeTab}
              className={`flex-1 py-2 font-medium ${
                activeTab === item.activeTab
                  ? "text-blue-600 bg-blue-100 rounded-2xl"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab(item.activeTab)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full border rounded-2xl">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-900">
                <th className="p-3">No.</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={`${product._id}-${index}`}
                    className="text-gray-600 hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 flex items-center space-x-2">
                      <span>{product.title}</span>
                    </td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3 max-w-[200px] truncate">{product.description}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          product.isActive
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {product.isActive ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">1 of 2 Pages</p>
            <div className="space-x-2">
              <button className="px-2 py-1 border rounded-md">
                <ChevronLeft size={18} />
              </button>
              <button className="px-2 py-1 border rounded-md">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showSellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl rounded-lg p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
              onClick={() => setShowSellModal(false)}
            >
              &times;
            </button>
            <SellProduct
              onClose={() => setShowSellModal(false)}
              onProductAdd={handleNewProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
