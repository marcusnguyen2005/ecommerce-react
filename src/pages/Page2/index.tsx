import React, { useEffect, useState } from "react";
import BannerSlider from "../../components/BannerSlider";
import { mockApi } from "../../apis";
import { Product } from "../../types";

interface Founder {
  id: number;
  hoten: string;
  lop: string;
  email: string;
  anh: string;
}

const Page2: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    content: "",
  });

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await mockApi.getAll();
        // Lấy 6 sản phẩm nổi bật (top rated)
        const featured = [...products]
          .sort((a, b) => {
            const ratingA = a.rating?.rate || 0;
            const ratingB = b.rating?.rate || 0;
            return ratingB - ratingA;
          })
          .slice(0, 6);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
    setFormData({ email: "", content: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Tạo slides từ sản phẩm nổi bật
  const slides = featuredProducts.slice(0, 3).map((product, index) => {
    let id: number;
    if (typeof product.id === 'string') {
      id = parseInt(product.id) || index + 1;
    } else {
      id = product.id;
    }
    return {
      id,
      image: product.image,
      title: product.title,
      subtitle: `Sản phẩm nổi bật #${index + 1}`,
      description: product.description || "Khám phá sản phẩm chất lượng cao",
    };
  });
  const dssv: Founder[] = [
    {
      id: 1,
      hoten: "Nguyễn Văn An111",
      lop: "K19",
      email: "abc@1234.edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/11/Anh-58-copy-min.jpg.webp",
    },
    {
      id: 2,
      hoten: "Trần Văn Bình",
      lop: "K19",
      email: "abc@1234.edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/08/Anh-cong-so-1-min.jpg.webp",
    },
    {
      id: 3,
      hoten: "Hà Thị Hiền",
      lop: "K19",
      email: "abc@cuong.edu.vn",
      anh: "https://smilemedia.vn/wp-content/uploads/2022/08/Concept-chup-anh-ca-nhan-chan-dung.jpg",
    },
    {
      id: 4,
      hoten: "Nguyễn Kiều Hải My",
      lop: "K19",
      email: "abc@cuong.edu.vn",
      anh: "https://studiochupanhdep.com//Upload/Images/Album/anh-beauty-01.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Slider Section - Sản phẩm nổi bật */}
      {slides.length > 0 && (
        <section className="mb-3">
          <div className="max-w-7xl mx-auto px-3 py-3">
            <BannerSlider slides={slides} autoPlay={true} interval={5000} />
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-3 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Về chúng tôi
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Giới thiệu
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Chúng tôi tự hào là đơn vị chuyên cung cấp các sản phẩm thời trang truyền thống Việt Nam, 
                đặc biệt là áo dài và các trang phục dân tộc. Với mong muốn gìn giữ và phát huy những 
                giá trị văn hóa dân tộc, chúng tôi luôn nỗ lực mang đến những sản phẩm chất lượng cao, 
                đẹp mắt và phù hợp với xu hướng hiện đại.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sứ mệnh
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sứ mệnh của chúng tôi là bảo tồn và phát triển văn hóa thời trang truyền thống Việt Nam, 
                đồng thời mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời nhất. Chúng tôi 
                cam kết cung cấp sản phẩm chất lượng, dịch vụ chuyên nghiệp và giá cả hợp lý.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Giá trị cốt lõi
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Chất lượng sản phẩm luôn được đặt lên hàng đầu</li>
                <li>Tôn trọng và gìn giữ văn hóa truyền thống</li>
                <li>Đổi mới và sáng tạo trong thiết kế</li>
                <li>Phục vụ khách hàng tận tâm và chuyên nghiệp</li>
                <li>Giá cả hợp lý và minh bạch</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Liên hệ
              </h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
                <p><strong>Điện thoại:</strong> 0123 456 789</p>
                <p><strong>Email:</strong> info@example.com</p>
                <p><strong>Giờ làm việc:</strong> 8:00 - 20:00 (Thứ 2 - Chủ nhật)</p>
              </div>
            </section>
          </div>
        </div>

        {/* Đồng sáng lập Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Đồng sáng lập
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Đội ngũ những người đã góp phần xây dựng và phát triển công ty
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dssv.map((founder) => (
              <div
                key={founder.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1.5" }}>
                  <img
                    src={founder.anh}
                    alt={founder.hoten}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {founder.hoten}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{founder.lop}</p>
                  <p className="text-xs text-gray-500 break-all">{founder.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Hãy gửi tin nhắn cho chúng tôi, chúng tôi sẽ phản hồi sớm nhất có thể
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Nhập nội dung tin nhắn của bạn..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Gửi tin nhắn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page2;
