import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import RatingStars from "../RatingStars";

interface ProductSidebarProps {
  products: Product[];
  title?: string;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  products,
  title = "Sản phẩm nổi bật",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-1 sticky top-20">
      <h3 className="font-bold text-base mb-2 text-gray-900">{title}</h3>
      <div className="space-y-2">
        {products.slice(0, 4).map((product) => {
          const rating = product.rating?.rate || 0;
          const ratingCount = product.rating?.count || 0;
          return (
            <Link
              key={product.id}
              to={`/san-pham/${product.id}`}
              className="flex gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors group"
            >
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/64x64?text=No+Image";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors leading-[1.2]">
                  {product.title}
                </span>
                <div className="mb-1">
                  <RatingStars rating={rating} count={0} size="sm" showCount={false} />
                </div>
                {ratingCount > 0 && (
                  <div className="text-xs text-gray-500 mb-1">
                    Đã bán {ratingCount.toLocaleString("vi-VN")}
                  </div>
                )}
                <div className="text-sm font-bold text-red-600">
                  {product.price.toLocaleString("vi-VN")}₫
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSidebar;
