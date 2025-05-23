import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Eye } from "lucide-react";
import Card from "../../Components/Card";
import DeleteProductButton from "../../Components/DeleteProductButton";
import IncreaseWarningButton from "../../Components/IncreaseWaringButton";
import Pagination from "../../Components/Paginations";
import AIAnalysisModal from "../../Components/AIAnalysisModel";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const fetchProducts = async () => {
    const token = getAuthToken();
    if (!token) {
      setAuthError("Authentication required. Please login.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/products`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError("Session expired. Please login again.");
          navigate("/login");
        } else {
          setAuthError("Failed to fetch products.");
        }
        return;
      }

      const data = await response.json();
      setProducts(data?.products || []);
      setFilteredProducts(data?.products || []);
      setAuthError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAuthError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAIAnalysis = async (productId) => {
    const token = getAuthToken();
    if (!token) {
      setAuthError("Authentication required. Please login.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/admin/products/${productId}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI analysis.");
      }

      const data = await response.json();
      setAiAnalysis(data.report.aiAnalysis);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      setAuthError("Something went wrong while fetching AI analysis.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
      setCurrentPage(1);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, products]);

  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
    setFilteredProducts((prev) => prev.filter((p) => p._id !== deletedId));
    if (currentProducts.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleWarningIncreased = (userId, warnings) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.userId?._id === userId
          ? {
              ...product,
              userId: {
                ...product.userId,
                warnings,
                isActive: warnings < 5,
              },
            }
          : product
      )
    );
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.userId?._id === userId
          ? {
              ...product,
              userId: {
                ...product.userId,
                warnings,
                isActive: warnings < 5,
              },
            }
          : product
      )
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewAnalysis = (product) => {
    setSelectedProduct(product);
    fetchAIAnalysis(product._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const token = getAuthToken();

  return (
    <div className="p-6 min-h-screen space-y-6">
      <h1 className="text-2xl font-medium text-gray-800">Products</h1>

      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {authError}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading Product...
        </div>
      ) : (
        <>
          <Card
            icon={<Package className="text-blue-600 w-6 h-6" />}
            label="Total Product"
            value={filteredProducts.length.toString()}
            bgColor="bg-green-50"
            textColor="text-green-700"
          />
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 overflow-x-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Product List
                </h2>
                <input
                  type="text"
                  placeholder="Search for product"
                  className="border rounded-2xl px-4 py-3 w-1/2 mb-4 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition duration-150 ease-in-out"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="min-w-full border rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-900 text-sm">
                    <th className="p-3">No.</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Seller Email</th>
                    <th className="p-3">Average Rating</th>
                    <th className="p-3">Overall Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">AI Overview</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-gray-500">
                        {searchTerm
                          ? "No products match your search"
                          : "No products found"}
                      </td>
                    </tr>
                  ) : (
                    currentProducts.map((product, index) => (
                      <tr
                        key={`${product._id}-${index}`}
                        className="text-gray-600 hover:bg-gray-50 text-sm"
                      >
                        <td className="p-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}.
                        </td>
                        <td className="p-3 flex items-center gap-2">
                          <div>
                            <div className="font-medium">{product.title}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          {product.userId?.email || "N/A"}
                        </td>
                        <td className="p-3">
                          {product.averageRating
                            ? product.averageRating.toFixed(1)
                            : "N/A"}
                        </td>
                        <td className="p-3">{product.overallScore || "N/A"}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              product.isActive
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {product.isActive ? "Available" : "Unavailable"}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleViewAnalysis(product)}
                            className="text-green-600 hover:text-green-800 flex items-center gap-1"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>
                        </td>
                        <td className="p-3 flex space-x-3">
                          <IncreaseWarningButton
                            userId={product.userId?._id}
                            token={token}
                            onWarningIncreased={(warnings) =>
                              handleWarningIncreased(
                                product.userId?._id,
                                warnings
                              )
                            }
                          />
                          <DeleteProductButton
                            productId={product._id}
                            productName={product.title}
                            onDelete={handleProductDeleted}
                            token={token}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
      <AIAnalysisModal
        isOpen={isModalOpen}
        onClose={closeModal}
        analysis={aiAnalysis}
        productName={selectedProduct?.title}
      />
    </div>
  );
};

export default Product;
