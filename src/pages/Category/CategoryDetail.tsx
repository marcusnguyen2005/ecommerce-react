import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockApi, slugApi } from "../../apis";
import { Product } from "../../types";
import ProductList from "../../components/ProductList";
import CategorySidebar from "../../components/CategorySidebar";
import ProductSidebar from "../../components/ProductSidebar";
import FlashSaleSection from "../../components/FlashSaleSection";
import EventSlider from "../../components/EventSlider";
import NotFound from "../Error/NotFound";

const CategoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Resolve slug to get category name
        const slugData = await slugApi.findByPrefixAndSlug("danh-muc", slug);
        
        if (!slugData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // Set category name from slug entity_id
        const resolvedCategoryName = String(slugData.entity_id);
        setCategoryName(resolvedCategoryName);

        const allProducts = await mockApi.getAll();
        setProducts(allProducts);
        
        // Normalize category name for comparison (remove Vietnamese accents)
        const normalizeCategory = (name: string): string => {
          return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
        };

        const normalizedCategoryName = normalizeCategory(resolvedCategoryName);
        
        const filtered = allProducts.filter((p) => {
          // Check main category
          if (p.category) {
            const normalizedMainCategory = normalizeCategory(p.category);
            if (normalizedMainCategory === normalizedCategoryName) {
              return true;
            }
          }
          
          // Check categories array
          if (p.categories && p.categories.length > 0) {
            return p.categories.some((c) => {
              const normalizedCat = normalizeCategory(c);
              return normalizedCat === normalizedCategoryName;
            });
          }
          
          return false;
        });
        
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

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

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="mb-3">
      {/* Flash Sale Section - Full Width */}
      <FlashSaleSection products={products} loading={loading} />

      <div className="max-w-7xl mx-auto px-3 mb-3">
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Danh mục: {categoryName || "Tất cả"}
          </h1>
          <p className="text-sm text-gray-600">
            {filteredProducts.length > 0 
              ? `Tìm thấy ${filteredProducts.length} sản phẩm`
              : "Không tìm thấy sản phẩm nào"}
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

export default CategoryDetail;

