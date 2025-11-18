import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerSlider from "../../components/BannerSlider";
import ProductList from "../../components/ProductList";
import FlashSaleSection from "../../components/FlashSaleSection";
import { mockApi } from "../../apis";
import { Product } from "../../types";

const Page1: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await mockApi.getAll();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Placeholder slides - bạn có thể thay thế bằng ảnh thật sau
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
      title: "Chào mừng đến với",
      subtitle: "Thời trang Việt Nam",
      description: "Khám phá bộ sưu tập trang phục dân tộc đặc sắc",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
      title: "Áo dài truyền thống",
      subtitle: "Vẻ đẹp vượt thời gian",
      description: "Nét đẹp thanh lịch và quyến rũ của trang phục Việt Nam",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
      title: "Trang phục dân tộc",
      subtitle: "Bảo tồn văn hóa",
      description: "Giữ gìn và phát huy giá trị văn hóa dân tộc",
    },
  ];

  const features = [
    {
      icon: "👗",
      title: "Áo dài",
      description: "Trang phục truyền thống thanh lịch và quyến rũ",
      link: "/sanpham?category=Áo",
    },
    {
      icon: "👔",
      title: "Áo nam",
      description: "Trang phục nam giới hiện đại và lịch sự",
      link: "/sanpham?category=Áo",
    },
    {
      icon: "🧢",
      title: "Nón",
      description: "Phụ kiện thời trang đa dạng và phong phú",
      link: "/sanpham?category=Nón",
    },
    {
      icon: "👖",
      title: "Quần",
      description: "Quần áo thời trang chất lượng cao",
      link: "/sanpham?category=Quần",
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

      {/* Flash Sale Section - Full Width */}
      <FlashSaleSection products={allProducts} loading={loading} />

      {/* Features Section */}
      <section className="mb-3">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Danh mục sản phẩm
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Khám phá các danh mục thời trang đa dạng
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

      {/* All Products Section */}
      <section className="py-3 bg-white">
        <div className="max-w-7xl mx-auto px-3">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tất cả sản phẩm
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập trang phục dân tộc Việt Nam đặc sắc
            </p>
          </div>

          <ProductList
            products={allProducts}
            loading={loading}
            columns={5}
          />
        </div>
      </section>
    </div>
  );
};

export default Page1;
