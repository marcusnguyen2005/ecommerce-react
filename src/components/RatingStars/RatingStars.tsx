import React from "react";

interface RatingStarsProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  showCount = true,
  size = "md",
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <svg
            key={`full-${index}`}
            className={`${sizeClasses[size]} text-yellow-400 fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <svg
              className={`${sizeClasses[size]} text-gray-300 fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <svg
              className={`${sizeClasses[size]} text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden`}
              style={{ width: "50%" }}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <svg
            key={`empty-${index}`}
            className={`${sizeClasses[size]} text-gray-300 fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>

      {/* Rating number and count */}
      {showCount && (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="font-medium text-yellow-600">{rating.toFixed(1)}</span>
          {count !== undefined && count > 0 && (
            <>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">Đã bán {count.toLocaleString()}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingStars;

