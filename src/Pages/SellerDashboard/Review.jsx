import React, { useEffect, useState } from 'react';
import ReviewCard from '../../Components/ReviewCard';
import { StarIcon } from '@heroicons/react/24/solid';
import { ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const response = await fetch(`${apiUrl}/api/users/product-ratings`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data.ratings || []);
        
        if (data.ratings?.length > 0) {
          const avg = data.ratings.reduce((sum, review) => sum + parseFloat(review.score || 0), 0) / data.ratings.length;
          setAverageRating(avg);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const numericRating = typeof rating === 'number' ? rating : parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= fullStars) {
            return <StarIcon key={star} className="h-5 w-5 text-yellow-400" />;
          } else if (star === fullStars + 1 && hasHalfStar) {
            return <StarIcon key={star} className="h-5 w-5 text-yellow-400" />;
          }
          return <StarIcon key={star} className="h-5 w-5 text-gray-300" />;
        })}
        <span className="ml-2 text-gray-600">{numericRating.toFixed(1)}</span>
      </div>
    );
  };



  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-red-50 rounded-lg">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Error loading reviews</h3>
        <p className="text-red-600 text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="mt-2 text-gray-600">Feedback from our valued customers</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Overall Rating</h2>
              <p className="mt-1 text-gray-500">
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="text-5xl font-bold text-gray-900 mr-4">
                  {averageRating.toFixed(1)}
                </span>
                {renderStars(averageRating)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">All Reviews</h3>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  reviewer={{
                    id: review._id,
                    name: review.rater?.fullName || 'Anonymous',
                    profilePic: review.rater?.profilePhoto ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.rater?.fullName
                    )}&background=random`, 
                    rating: parseFloat(review.score) || 0,
                    comment: review.comment || 'No comment provided',
                    date: review.createdAt ? 
                      new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Date not available'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ClockIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500 text-center max-w-md">
                Be the first to leave a review for our products. Your feedback helps us improve!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;