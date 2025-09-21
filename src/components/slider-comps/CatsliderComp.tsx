"use client";
import { categories } from "@/app/types/categort.model";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
export default function CatsliderComp({
  category,
}: {
  category: categories[];
}) {
  return (
    <div>
      <h2 className="text-start text-3xl font-extrabold mt-[80px] my-7 text-green-800">Category Slider </h2>
      {" "}
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {category.map((cat) => (
          <>
            <SwiperSlide key={cat._id} className=" rounded-2xl">
              <div className="relative h-[250px] w-full ">
                <Image
                  src={cat.image}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width:768px)100vw(max-width:1200px)50vw,25vw"
                  alt="error slider"
                  className="object-fit"
                />
              </div>
              <p className="font-bold text-center">{cat.name}</p>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
