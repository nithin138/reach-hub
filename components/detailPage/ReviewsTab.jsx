export default function ReviewsTab({ reviews }) {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Average Rating Summary */}
      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {reviews.length} reviews
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">
                    {review.user}
                  </span>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="mt-3 text-gray-700">{review.comment}</p>

            {/* Images (if any) */}
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review-img"
                    className="w-24 h-20 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            {/* Helpful Count */}
            <div className="flex items-center space-x-2 mt-3 text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful} found this helpful</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}