import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Product } from "../../types";
import FlashSaleCard from "../FlashSaleCard";
import CountdownTimer from "../CountdownTimer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface FlashSaleSectionProps {
  products: Product[];
  loading?: boolean;
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products,
  loading = false,
}) => {
  // Lọc các sản phẩm đang sale
  const saleProducts = products.filter((product) => product.onSale);

  return (
    <section className="bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white py-4 mb-3 shadow-lg w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg flash-sale-title">
              FLASH SALE
            </h2>
            <p className="text-base md:text-lg text-red-50 font-medium">
              ⚡ Ưu đãi cực sốc - Giảm giá lên đến 50%
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <CountdownTimer hours={2} />
          </div>
        </div>

        {/* Products Swiper */}
        <div className="bg-white rounded-xl p-4 shadow-xl">
          {loading ? (
            <div className="flex gap-2.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg animate-pulse flex-shrink-0 w-[180px]"
                >
                  <div className="w-full aspect-square bg-gray-200"></div>
                  <div className="p-2 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : saleProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có sản phẩm flash sale</p>
            </div>
          ) : (
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={8}
                slidesPerView={1}
                slidesPerGroup={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={true}
                loop={saleProducts.length > 1}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 8,
                  },
                  640: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 8,
                  },
                  768: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 8,
                  },
                  1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                    spaceBetween: 8,
                  },
                }}
                className="flash-sale-swiper"
              >
                {saleProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <FlashSaleCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;

