import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const RateReview = ({ user, productId, token, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    if (!productId || !token) {
      setError("Missing required information. Please try again.");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userId = decodedPayload.id || decodedPayload._id;
  
      if (!userId) {
        throw new Error("Invalid token: user ID not found.");
      }
  
      const reviewData = {
        productId,
        userId,
        score: rating,
        comment,
        fullName: `${user?.firstName} ${user?.lastName}` 
      };
  
      const response = await fetch(
        `${apiUrl}/api/ratings/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || "Failed to submit review");
      }
  
      const data = await response.json();
      const completeReview = {
        ...data.rating,
        userEmail: user?.email,
        userId,
        fullName: `${user?.firstName} ${user?.lastName}`,
        profilePic: user?.profilePic, 
        createdAt: new Date().toISOString(),
      };
  
      onReviewAdded(completeReview);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(error.message || "An error occurred while submitting your review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rate & Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          {user?.profilePic ? (
            <img
              src={
                user.profilePic.startsWith("http") ||
                user.profilePic.startsWith("/")
                  ? user.profilePic
                  : `${apiUrl}${user.profilePic}`
              }
              alt={`${user?.firstName} ${user?.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              {`${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase()}
            </div>
          )}
          <div className="mt-2 text-center">
            <h3 className="font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-600 text-center mb-2">
            Share your experience with this product
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`focus:outline-none transition-colors ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  disabled={isSubmitting}
                >
                  <StarIcon className="w-8 h-8" />
                </button>
              ))}
            </div>
            {!rating && error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
              placeholder="Share details about your experience with this product..."
              disabled={isSubmitting}
            ></textarea>
          </div>

          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400"
              disabled={isSubmitting || !rating}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateReview;