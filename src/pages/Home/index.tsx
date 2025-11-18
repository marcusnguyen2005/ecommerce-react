import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerSlider from "../../components/BannerSlider";
import ProductList from "../../components/ProductList";
import { mockApi } from "../../apis";
import { Product } from "../../types";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await mockApi.getAll();
        // Lấy 8 sản phẩm đầu tiên làm featured
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Placeholder slides - bạn có thể thay thế bằng ảnh thật sau
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
      title: "Chào mừng đến với",
      subtitle: "Hệ thống Quản lý Sản phẩm",
      description: "Giải pháp quản lý hiện đại và hiệu quả cho doanh nghiệp của bạn",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
      title: "Quản lý thông minh",
      subtitle: "Tối ưu hóa quy trình",
      description: "Công nghệ tiên tiến giúp bạn quản lý sản phẩm một cách dễ dàng",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
      title: "Hiệu quả & Nhanh chóng",
      subtitle: "Nâng cao năng suất",
      description: "Giao diện thân thiện, dễ sử dụng cho mọi người dùng",
    },
  ];

  const features = [
    {
      icon: "📦",
      title: "Quản lý Sản phẩm",
      description: "Quản lý danh mục sản phẩm một cách hiệu quả và chuyên nghiệp",
      link: "/admin/products",
    },
    {
      icon: "🛍️",
      title: "Xem Sản phẩm",
      description: "Khám phá danh sách sản phẩm đa dạng và phong phú",
      link: "/",
    },
    {
      icon: "📊",
      title: "Báo cáo & Thống kê",
      description: "Theo dõi và phân tích dữ liệu sản phẩm chi tiết",
      link: "/trang1",
    },
    {
      icon: "⚙️",
      title: "Cài đặt Hệ thống",
      description: "Tùy chỉnh và cấu hình hệ thống theo nhu cầu",
      link: "/trang2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Slider Section */}
      <section className="mb-3">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <BannerSlider slides={slides} autoPlay={true} interval={5000} />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-3">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tính năng nổi bật
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Khám phá các tính năng mạnh mẽ giúp bạn quản lý hiệu quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-2 text-center">{feature.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 text-center group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">{feature.description}</p>
                <div className="mt-2 text-center">
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    Xem thêm →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold mb-2">Bắt đầu ngay hôm nay</h2>
            <p className="text-sm text-blue-100">
              Khám phá các tính năng và bắt đầu sử dụng hệ thống
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to="/"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Xem Sản phẩm
            </Link>
            <Link
              to="/admin/products"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg border-2 border-white/20"
            >
              Quản lý Admin
            </Link>
            <Link
              to="/trang1"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-3 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sản phẩm nổi bật
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập trang phục dân tộc Việt Nam đặc sắc
            </p>
          </div>

          <ProductList
            products={featuredProducts}
            loading={loading}
            columns={4}
          />

          <div className="text-center mt-3">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Xem tất cả sản phẩm →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-3 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-xl text-gray-600">Sản phẩm</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-xl text-gray-600">Người dùng</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-xl text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
