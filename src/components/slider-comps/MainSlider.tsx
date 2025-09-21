"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function MainSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative h-[600px] w-auto">
            <Image
              src="/slider/1 (1).jpg"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px)100vw(max-width:1200px)50vw,25vw"
              alt="error slider"
              className="object-fit"
            />
            <div className="absolute top-[200px] left-[100px]">
              <h2 className=" font-bold text-6xl text-blue-950  my-4">Summer Collection </h2>
              <p className=" font-bold text-xl   my-4 ">
                Fresh styles made for the season, shop now
              </p>

              <Button className=" text-white p-6 bg-black cursor-pointer hover:text-black border border-black  duration-300 hover:bg-transparent hover:border-black  ">
                <h2 className="text-xl">Shop Now</h2> <MoveRight />
              </Button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-[600px] w-full">
            <Image
              src="/slider/1 (2).jpg"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px)100vw(max-width:1200px)50vw,25vw"
              alt="error slider"
              className="object-fit"
            />

            <div className="absolute top-[200px] left-[100px]">
              <h2 className=" font-bold text-6xl text-blue-950  my-4">Summer Collection </h2>
              <p className=" font-bold text-xl   my-4 ">
                Fresh styles made for the season, shop now
              </p>

              <Button className=" text-white p-6 bg-black cursor-pointer hover:text-black border border-black  duration-300 hover:bg-transparent hover:border-black  ">
                <h2 className="text-xl">Shop Now</h2> <MoveRight />
              </Button>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="relative h-[600px] w-full">
            <Image
              src="/slider/4.png"
              fill
              priority
              loading="eager"
              sizes="(max-width:768px)100vw(max-width:1200px)50vw,25vw"
              alt="error slider"
              className="object-fit"
            />
            <div className="absolute top-[200px] left-[100px]">
              <h2 className=" font-bold text-6xl text-blue-950  my-4">Summer Collection </h2>
              <p className=" font-bold text-xl   my-4 ">
                Fresh styles made for the season, shop now
              </p>

              <Button className=" text-white p-6 bg-black cursor-pointer hover:text-black border border-black  duration-300 hover:bg-transparent hover:border-black  ">
                <h2 className="text-xl">Shop Now</h2> <MoveRight />
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
