import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import RatingStars from "../RatingStars";
import { useSlugUrl } from "../../hooks/useSlugUrl";
import { toSlug } from "../../utils/slug";

interface ProductCardProps {
  product: Product;
  productSlug?: string; // Optional: pass slug directly to avoid API call
}

const ProductCard: React.FC<ProductCardProps> = ({ product, productSlug }) => {
  const slugUrl = useSlugUrl("product", product.id, product.title);
  const productUrl = productSlug || slugUrl || `/san-pham/${toSlug(product.title)}`;
  
  const rating = product.rating?.rate || 0;
  const ratingCount = product.rating?.count || 0;
  const isOnSale = product.onSale && product.originalPrice;
  const displayPrice = isOnSale ? product.price : product.price;
  const originalPrice = product.originalPrice || product.price;

  return (
    <Link
      to={productUrl}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/* Product Image - Tỉ lệ 1:1.4 */}
      <div className="relative w-full bg-gray-100 overflow-hidden" style={{ aspectRatio: "1 / 1.4" }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        {/* Discount badge */}
        {isOnSale && product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2.5">
        {/* Category */}
        {product.category && (
          <div className="text-xs text-gray-500 mb-1 uppercase">
            {product.category}
          </div>
        )}

        {/* Title */}
        <span className="block text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors leading-[1.2]">
          {product.title}
        </span>

        {/* Rating */}
        <div className="mb-1.5">
          <RatingStars rating={rating} count={0} size="sm" showCount={false} />
        </div>

        {/* Sold count */}
        {ratingCount > 0 && (
          <div className="text-xs text-gray-500 mb-1.5">
            Đã bán {ratingCount.toLocaleString("vi-VN")}
          </div>
        )}

        {/* Price */}
        {isOnSale ? (
          <div className="flex flex-col">
            {/* Giá gốc - nhỏ, text-muted, gạch ngang + badge */}
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-xs text-gray-500 line-through">
                {originalPrice.toLocaleString("vi-VN")}₫
              </span>
              {product.discount && (
                <span className="inline-block bg-red-500 text-white text-xs px-1 py-0.5 rounded font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>
            {/* Giá sale - màu đỏ hồng */}
            <span className="text-sm font-bold text-pink-600">
              {displayPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-sm font-bold text-gray-900">
              {displayPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
