import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockApi, slugApi } from "../../apis";
import { Product } from "../../types";
import RatingStars from "../../components/RatingStars";
import ProductList from "../../components/ProductList";
import Container from "../../components/Container";
import NotFound from "../Error/NotFound";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Resolve slug to get entityId
        const slugData = await slugApi.findByPrefixAndSlug("san-pham", slug);
        
        if (!slugData) {
          // If slug not found, check if it's a numeric ID (backward compatibility)
          if (/^\d+$/.test(slug)) {
            const data = await mockApi.getById(slug);
            setProduct(data);
          } else {
            setNotFound(true);
          }
        } else {
          // Use entityId from slug
          const data = await mockApi.getById(slugData.entity_id);
          setProduct(data);
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "Không thể tải sản phẩm!");
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product || !product.category) return;

      setLoadingRelated(true);
      try {
        const allProducts = await mockApi.getAll();
        // Lọc sản phẩm cùng category, loại trừ sản phẩm hiện tại
        const related = allProducts.filter((p) => {
          const sameCategory = 
            p.category?.toLowerCase() === product.category?.toLowerCase() ||
            p.categories?.some(c => c.toLowerCase() === product.category?.toLowerCase());
          return sameCategory && String(p.id) !== String(product.id);
        });
        // Giới hạn 8 sản phẩm
        setRelatedProducts(related.slice(0, 8));
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (notFound || (!product && !loading)) {
    return <NotFound />;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Không tìm thấy sản phẩm!
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại Trang chủ
          </button>
        </div>
      </div>
    );
  }

  const rating = product.rating?.rate || product.rating_rate || 0;
  const ratingCount = product.rating?.count || product.rating_count || 0;

  return (
    <Container className="px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10 xl:p-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-6 lg:p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-auto max-h-[600px] lg:max-h-[700px] object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/500x500?text=No+Image";
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <div className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <RatingStars rating={rating} count={ratingCount} size="lg" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {product.price > 100 && (
                <span className="text-xl lg:text-2xl text-gray-500 line-through">
                  {(product.price * 1.25).toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => alert("Đã thêm vào giỏ hàng!")}
                className="flex-1 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => alert("Đã mua ngay!")}
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mua ngay
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Đổi trả trong 7 ngày</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Bảo hành chính hãng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Bạn có thể quan tâm
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Các sản phẩm cùng danh mục
            </p>
          </div>
          <ProductList
            products={relatedProducts}
            loading={loadingRelated}
            columns={5}
          />
        </section>
      )}
    </Container>
  );
};

export default ProductDetail;
