import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { useSlugUrl } from "../../hooks/useSlugUrl";
import { toSlug } from "../../utils/slug";

interface FlashSaleCardProps {
  product: Product;
  productSlug?: string; // Optional: pass slug directly to avoid API call
}

const FlashSaleCard: React.FC<FlashSaleCardProps> = ({ product, productSlug }) => {
  const slugUrl = useSlugUrl("product", product.id, product.title);
  const productUrl = productSlug || slugUrl || `/san-pham/${toSlug(product.title)}`;
  
  const displayPrice = product.price || 0;
  const originalPrice = product.originalPrice || displayPrice;
  const isOnSale = product.onSale || false;

  return (
    <Link
      to={productUrl}
      className="block group relative h-full"
      title={product.title}
    >
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Image - Square aspect ratio */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        </div>

        {/* Price Info */}
        <div className="p-2.5 flex-1 flex flex-col justify-end">
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
      </div>
    </Link>
  );
};

export default FlashSaleCard;

