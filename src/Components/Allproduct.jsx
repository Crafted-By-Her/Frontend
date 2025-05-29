import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          ` ${apiUrl}/api/products`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        const productsData = Array.isArray(data.data) ? data.data : [];
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <p className="p-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-gray-800">Other Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full">No products available.</p>
        ) : (
          products.map((product) => (
            <div className="mb-5" key={product._id || product.id || Math.random()}>
              <ProductCard
                title={product.title || "Untitled Product"}
                description={product.description || "No description available"}
                price={product.price || "0"}
                images={
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images
                    : ["/placeholder.jpg"]
                }
                averageRating={product.averageRating || 0}
                id={product._id}
                category={product.category || "general"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
