import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import NotFound from "../Components/NotFound";

const slugToEnum = {
  Clothes: "Clothes",
  shoes: "Shoes",
  "accessories-jewelry": "Jewelries",
  "bath-beauty": "Beauties",
  "bags-purses": "Bags",
  "art-wall-decor": "Arts",
};

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const backendCategory = slugToEnum[categorySlug];

  useEffect(() => {
    if (!backendCategory) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(
          ` ${apiUrl}/api/products?category=${backendCategory}`
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const fetchedProducts = data.data || [];

        if (fetchedProducts.length === 0) {
          setNotFound(true);
        } else {
          const productsWithRatings = fetchedProducts.map((product) => {
            const averageRating =
              product.ratings && Array.isArray(product.ratings) && product.ratings.length > 0
                ? product.ratings.reduce((sum, rating) => sum + rating.score, 0) / product.ratings.length
                : 0;
            return { ...product, averageRating };
          });
          setProducts(productsWithRatings);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, backendCategory]);

  return (
    <>
      <div className="p-10 mb-5">
        <h2 className="text-3xl text-center font-bold text-gray-800">
          {backendCategory || "Category"}
        </h2>
        {loading ? (
          <div className="text-center text-gray-600 mt-10">Loading products...</div>
        ) : notFound ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  images={product.images}
                  averageRating={product.averageRating}
                  id={product._id}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
