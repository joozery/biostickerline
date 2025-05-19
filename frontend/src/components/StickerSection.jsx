import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StickerSection() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3001/api/stickers?q=cute&offset=0&limit=30'
        );
        setStickers(res.data.items || []);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickers();
  }, []);

  return (
    <section className="px-6 py-10 bg-[#f8fef9] font-prompt">
      <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-6">
        ✨ สติกเกอร์น่ารักๆ
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {stickers.map((sticker) => (
          <a
            key={sticker.id}
            href={`https://store.line.me/stickershop/product/${sticker.id}/th`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-2 flex flex-col items-center text-center group"
          >
            <img
              src={`https://stickershop.line-scdn.net/stickershop/v1/product/${sticker.id}/LINEStorePC/main.png`}
              alt={sticker.title || 'sticker'}
              className="w-[90px] h-auto sm:w-[100px] md:w-[110px] rounded-md mb-2 transition-transform group-hover:scale-105"
            />
            <p className="text-xs text-green-700 font-medium leading-snug line-clamp-2">
              {sticker.title || 'ไม่พบชื่อ'}
            </p>
            <p className="text-[10px] text-gray-400">
              {sticker.author || 'ไม่ทราบผู้สร้าง'}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
