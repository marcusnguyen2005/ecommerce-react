import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mockApi } from "../../apis";
import { Product } from "../../types";
import ProductList from "../../components/ProductList";
import CategorySidebar from "../../components/CategorySidebar";
import ProductSidebar from "../../components/ProductSidebar";
import FlashSaleSection from "../../components/FlashSaleSection";
import EventSlider from "../../components/EventSlider";

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await mockApi.getAll();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        const mainCategory = product.category?.toLowerCase();
        const categories = product.categories?.map((c) => c.toLowerCase()) || [];
        return (
          mainCategory === selectedCategory.toLowerCase() ||
          categories.includes(selectedCategory.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Get categories with counts
  const categories = React.useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach((product) => {
      const mainCategory = product.category || "Khác";
      categoryMap.set(mainCategory, (categoryMap.get(mainCategory) || 0) + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      id: name.toLowerCase(),
      name,
      count,
    }));
  }, [products]);

  // Get featured products for sidebar (top rated)
  const featuredProducts = React.useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const ratingA = a.rating?.rate || 0;
        const ratingB = b.rating?.rate || 0;
        return ratingB - ratingA;
      })
      .slice(0, 4);
  }, [products]);

  // Events data
  const events = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
      title: "BLACK FRIDAY SALE",
      subtitle: "Sự kiện",
      description: "Giảm giá lên đến 50% cho tất cả sản phẩm. Ưu đãi cực sốc chỉ trong tháng này!",
      link: "/san-pham",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      title: "Mở thêm chuỗi cửa hàng",
      subtitle: "Tin tức",
      description: "Chúng tôi vui mừng thông báo mở thêm 5 cửa hàng mới tại các thành phố lớn.",
      link: "/ve-chung-toi",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
      title: "Sản phẩm mới",
      subtitle: "Bộ sưu tập",
      description: "Khám phá bộ sưu tập áo dài mới nhất với thiết kế hiện đại và thanh lịch.",
      link: "/thoi-trang",
    },
  ];

  return (
    <div className="mb-3">
      {/* Flash Sale Section - Full Width */}
      <FlashSaleSection products={products} loading={loading} />

      <div className="max-w-7xl mx-auto px-3 mb-3">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Danh sách sản phẩm
          </h1>
          <p className="text-sm text-gray-600">
            Khám phá bộ sưu tập trang phục dân tộc Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {/* Sidebar - Category */}
          <div className="col-span-12 lg:col-span-2">
            <CategorySidebar categories={categories} />
          </div>

          {/* Main Content - Product List */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-8">
            <ProductList
              products={filteredProducts}
              loading={loading}
              columns={5}
            />
          </div>

          {/* Right Sidebar - Featured Products */}
          <div className="col-span-12 lg:col-span-3 xl:col-span-2">
            <ProductSidebar products={featuredProducts} title="Sản phẩm nổi bật" />
          </div>
        </div>
      </div>

      {/* Events Section - Cuối cùng */}
      <EventSlider events={events} />
    </div>
  );
};

export default ListProducts;
