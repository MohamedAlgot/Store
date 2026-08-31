"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function MainSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        navigation
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="w-full"
      >
        <SwiperSlide>
          {/* Image Container */}
          <div
            className="    relative
    w-full
    aspect-[16/9]
    sm:aspect-[16/8]
    md:aspect-[16/7]
    lg:aspect-[1920/700]"
          >
            <Image
              src="/slider/main.png"
              fill
              priority
              sizes="100vw"
              alt="Online Shopping"
              className="rounded-2xl object-cover"
            />

            {/* Shop Now Button */}
            <div
              className="
                absolute
                left-[5%]
                bottom-[8%]
                z-10
              "
            >
              <Link href="/products">
                <Button
                  className="
                  animate-bounce
      flex
      cursor-pointer
      items-center
      justify-center
      gap-1
      rounded-lg
      border
      border-green-600
      bg-green-600
      text-white
      font-bold
      shadow-lg
      duration-300
      hover:bg-transparent
      hover:text-green-600

      px-2
      py-1.5
      text-[10px]

      sm:px-3
      sm:py-2
      sm:text-xs

      md:px-4
      md:py-3
      md:text-sm

      lg:px-5
      lg:py-3
      lg:text-base
    "
                >
                  Shop Now
                  <MoveRight className="ml-0.5" size={12} />
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
