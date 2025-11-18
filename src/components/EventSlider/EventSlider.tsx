import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Event {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
}

interface EventSliderProps {
  events: Event[];
}

const EventSlider: React.FC<EventSliderProps> = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="mb-3">
      <div className="max-w-7xl mx-auto px-3">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Các sự kiện của trang web
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Khám phá các sự kiện và ưu đãi đặc biệt
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            loop={events.length > 1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 1,
              },
            }}
            className="event-swiper"
          >
            {events.map((event) => {
              const content = (
                <div className="relative h-[300px] md:h-[350px] rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/800x400?text=Event+Image";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-sm font-medium text-yellow-300 mb-2">
                      {event.subtitle}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              );

              if (event.link) {
                return (
                  <SwiperSlide key={event.id}>
                    <Link to={event.link}>{content}</Link>
                  </SwiperSlide>
                );
              }

              return <SwiperSlide key={event.id}>{content}</SwiperSlide>;
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default EventSlider;

