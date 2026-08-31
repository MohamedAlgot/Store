"use client";

import { categories } from "@/app/types/categort.model";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";



// Swiper modules
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";

export default function CatsliderComp({
  category,
}: {
  category: categories[];
}) {
  return (
    <div className="container mx-auto w-[92%]">
      <h2
        className="
          mt-12
          mb-6
          text-start
          text-2xl
          font-extrabold
          text-green-800
          sm:mt-16
          sm:text-3xl
          md:mt-20
        "
      >
        Category Slider
      </h2>

      <Swiper
        spaceBetween={12}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          // Mobile
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          // Small screens
          480: {
            slidesPerView: 2,
            spaceBetween: 12,
          },

          // Tablet
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },

          // Desktop
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },

          // Large screens
          1280: {
            slidesPerView: 5,
            spaceBetween: 18,
          },
        }}
        className="w-full"
      >
        {category.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="overflow-hidden rounded-2xl bg-white">
              <div
                className="
                  relative
                  h-[180px]
                  w-full
                  sm:h-[200px]
                  md:h-[220px]
                  lg:h-[240px]
                  xl:h-[250px]
                "
              >
                <Image
                  src={cat.image}
                  fill
                  priority={false}
                  sizes="
                    (max-width: 480px) 100vw,
                    (max-width: 767px) 50vw,
                    (max-width: 1023px) 33vw,
                    (max-width: 1279px) 25vw,
                    20vw
                  "
                  alt={cat.name}
                  className="object-cover"
                />
              </div>

              <p
                className="
                  py-3
                  text-center
                  text-sm
                  font-bold
                  sm:text-base
                  md:text-lg
                "
              >
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
