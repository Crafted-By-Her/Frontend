import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Footer from "../Components/Footer";
import ReviewCard from "./ReviewCard";
import RateReview from "../Components/RateReview";
import NotFound from "../Components/NotFound";
import SellerContactInfo from "../Components/SellerContactInfo";
import ProductCard from "../Components/ProductCard";

const ProductDetailPage = () => {
  const { categoryName, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("userData")) ||
      JSON.parse(sessionStorage.getItem("userData"));

    const authToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (storedUser) {
      setUser(storedUser);
    }
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiUrl}/api/products?category=${categoryName}`
        );
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        const foundProduct = data.data.find((p) => p._id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
          setReviews(foundProduct.ratings || []);
          const related = data.data
            .filter((p) => p._id !== productId)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryName, productId]);

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setProduct((prevProduct) => ({
      ...prevProduct,
      ratings: [...(prevProduct.ratings || []), newReview],
    }));
  };
  const handleReview = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowPopup(true)
    }
  };
  const handleContactSeller = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowSellerModal(true);
    }
  }; 

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (notFound || !product) {
    return <NotFound />;
  }

  const averageRating =
    reviews.reduce((sum, r) => sum + r.score, 0) / (reviews.length || 1) || 0;

  const sellerName =
    product.userId?.name || product.userId?.email?.split("@")[0] || "Seller";

  return (
    <>
      <div className="container mx-auto px-10 py-7">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex flex-col lg:w-1/5">
            <h2 className="text-2xl text-gray-900 font-bold">
              {product.title}
            </h2>
            <div className="flex items-center text-sm mt-1">
              <StarIcon className="w-4 h-4 text-black mr-1" />
              {averageRating.toFixed(1)}/5.{" "}
              <span className="ml-1 text-gray-800">
                {reviews.length} reviews
              </span>
            </div>
            <div className="flex lg:flex-col gap-4 mt-4 overflow-x-auto lg:overflow-visible pb-2">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 lg:w-full lg:h-24 object-cover rounded cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 relative">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrev}
                className="p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition z-10"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <img
                src={product?.images?.[selectedImage].url}
                alt={`Slide ${selectedImage + 1}`}
                className="rounded-lg shadow-lg w-[900px] h-[550px] object-cover mt-10"
              />
              <button
                onClick={handleNext}
                className="p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition z-10"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-10">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                {product?.userId?.profilePic ? (
                  <img
                    src={
                      product.userId.profilePic.startsWith("http") ||
                      product.userId.profilePic.startsWith("/")
                        ? product.userId.profilePic
                        : `${import.meta.env.VITE_BACKEND_URL || ""}${
                            product.userId.profilePic
                          }`
                    }
                    alt={sellerName}
                    className="w-12 h-12 rounded-full object-cover border-2"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {`${product?.userId?.firstName?.[0] || ""}${
                      product?.userId?.lastName?.[0] || ""
                    }`.toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">
                    Crafted by:{" "}
                    <span className="text-gray-900">
                      {product?.userId?.firstName} {product?.userId?.lastName}
                    </span>
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price} ETB
                </span>
              </div>
            </div>
            <div className="w-full lg:w-96 flex flex-col gap-6 bg-white border border-gray-200 rounded-xl px-6 py-8 shadow-sm">
              <div className="text-center">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 mb-2">
                  Meet our seller
                </h3>
                <p className="text-gray-600 font-medium">
                  Connect directly with the artisan who crafted this piece
                </p>
              </div>

              <button
                onClick={handleContactSeller}
                className="mt-4 px-6 py-3 text-white font-semibold bg-orange-600 hover:bg-orange-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {user
                  ? `Contact ${product?.userId?.firstName}`
                  : "Login to Contact Seller"}
              </button>
            </div>
          </div>
        </div>

        <div className="border-y-2 flex flex-col">
          <h3 className="text-gray-900 font-semibold text-xl mt-4 px-5">
            {product?.userId?.firstName} {product?.userId?.lastName} has{" "}
            {reviews.length} reviews
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
            {reviews.map((review, index) => (
              <ReviewCard
                key={review._id || index}
                reviewer={{
                  name: review.fullName,
                  rating: review.score,
                  comment: review.comment,
                  date: new Date(review.createdAt).toLocaleDateString(),
                  profilePic:
                    review.userId?.profilePic ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.fullName
                    )}&background=random`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4">
            
            <button
              onClick={handleReview} 
              className="mx-auto px-6 py-2 text-sm border border-gray-900 text-gray-900 rounded font-semibold transition duration-150"
            >
              Rate & Review
            </button>
          </div>
          {showPopup && (
            <RateReview
              user={user}
              productId={productId}
              token={token}
              onClose={() => setShowPopup(false)}
              onReviewAdded={handleReviewAdded}
            />
          )}
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-8 px-10">
          <h3 className="text-gray-900 font-semibold text-xl mb-4">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {relatedProducts.map((relatedProduct) => (
              <div className="mb-5" key={relatedProduct._id || Math.random()}>
                <ProductCard
                  title={relatedProduct.title || "Untitled Product"}
                  description={
                    relatedProduct.description || "No description available"
                  }
                  price={relatedProduct.price || "0"}
                  images={
                    Array.isArray(relatedProduct.images) &&
                    relatedProduct.images.length > 0
                      ? relatedProduct.images
                      : ["/placeholder.jpg"]
                  }
                  averageRating={
                    relatedProduct.ratings?.length
                      ? relatedProduct.ratings.reduce(
                          (sum, r) => sum + r.score,
                          0
                        ) / relatedProduct.ratings.length
                      : 0
                  }
                  id={relatedProduct._id}
                  category={relatedProduct.category || categoryName}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
      {showSellerModal && (
        <SellerContactInfo
          seller={product.userId}
          onClose={() => setShowSellerModal(false)}
        />
      )}
    </>
  );
};

export default ProductDetailPage;
