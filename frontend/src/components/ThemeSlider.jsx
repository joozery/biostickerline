import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ThemeSlider() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await axios.get(
          'https://biosticker-api-f6c2a14f3a26.herokuapp.com/api/themes?q=cute&offset=0&limit=10'
        );
        setThemes(res.data.items || []);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
  }, []);

  // 🔧 สร้าง URL รูปภาพจาก UUID
  const getThemeImageUrl = (uuid) => {
    if (!uuid || uuid.length < 6) return null;
    const folder = `${uuid.slice(0, 2)}/${uuid.slice(2, 4)}/${uuid.slice(4, 6)}`;
    return `https://shop.line-scdn.net/themeshop/v1/products/${folder}/${uuid}/1/WEBSTORE/icon_198x278.png`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white font-prompt">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
          🌈 ธีมไลน์น่ารัก ๆ ที่คุณไม่ควรพลาด
        </h2>

        {themes.length > 0 ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Navigation, Pagination]}
          >
            {themes.map((theme, index) => {
              const title = theme.title || 'ไม่ทราบชื่อธีม';
              const uuid = theme.id;
              const storeUrl = theme.linkUrl || '#';
              const imageUrl = getThemeImageUrl(uuid);

              return (
                <SwiperSlide key={index}>
                  <a
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl border border-green-100 shadow hover:shadow-xl transition-all block overflow-hidden"
                  >
                    {imageUrl ? (
                      <div className="relative w-full h-[220px] flex items-center justify-center overflow-hidden bg-gray-50">
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full shadow font-semibold">
                          New
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                        ไม่มีภาพ
                      </div>
                    )}
                    <div className="p-3 text-center">
                      <p className="text-sm font-medium text-green-700 leading-snug line-clamp-2">
                        {title}
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p className="text-center text-gray-400">ไม่พบธีมในขณะนี้</p>
        )}
      </div>
    </section>
  );
}
