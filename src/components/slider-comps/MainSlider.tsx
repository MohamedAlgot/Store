"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles

// Swiper modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function MainSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        effect="fade"
        navigation
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="
              relative
              h-[400px]
              w-full
              sm:h-[450px]
              md:h-[500px]
              lg:h-[550px]
              xl:h-[600px]
            "
          >
            <Image
              src="/slider/1 (1).jpg"
              fill
              priority
              sizes="100vw"
              alt="Summer Collection"
              className="object-cover"
            />

            <div
              className="
                absolute
                left-5
                top-1/2
                w-[85%]
                -translate-y-1/2
                sm:left-10
                sm:w-[70%]
                md:left-16
                md:w-[60%]
                lg:left-20
                lg:w-[55%]
                xl:left-24
                xl:w-[50%]
              "
            >
              <h2
                className="
                  my-3
                  text-3xl
                  font-bold
                  leading-tight
                  text-blue-950
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Summer Collection
              </h2>

              <p
                className="
                  my-3
                  text-sm
                  font-bold
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                "
              >
                Fresh styles made for the season, shop now
              </p>

              <Button
                className="
                  cursor-pointer
                  border
                  border-black
                  bg-black
                  p-4
                  text-sm
                  text-white
                  duration-300
                  hover:border-black
                  hover:bg-transparent
                  hover:text-black
                  sm:p-5
                  sm:text-base
                  md:p-6
                  md:text-lg
                "
              >
                Shop Now
                <MoveRight className="ml-1" />
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="
              relative
              h-[400px]
              w-full
              sm:h-[450px]
              md:h-[500px]
              lg:h-[550px]
              xl:h-[600px]
            "
          >
            <Image
              src="/slider/1 (2).jpg"
              fill
              sizes="100vw"
              alt="Summer Collection"
              className="object-cover"
            />

            <div
              className="
                absolute
                left-5
                top-1/2
                w-[85%]
                -translate-y-1/2
                sm:left-10
                sm:w-[70%]
                md:left-16
                md:w-[60%]
                lg:left-20
                lg:w-[55%]
                xl:left-24
                xl:w-[50%]
              "
            >
              <h2
                className="
                  my-3
                  text-3xl
                  font-bold
                  leading-tight
                  text-blue-950
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Summer Collection
              </h2>

              <p
                className="
                  my-3
                  text-sm
                  font-bold
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                "
              >
                Fresh styles made for the season, shop now
              </p>

              <Button
                className="
                  cursor-pointer
                  border
                  border-black
                  bg-black
                  p-4
                  text-sm
                  text-white
                  duration-300
                  hover:border-black
                  hover:bg-transparent
                  hover:text-black
                  sm:p-5
                  sm:text-base
                  md:p-6
                  md:text-lg
                "
              >
                Shop Now
                <MoveRight className="ml-1" />
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="
              relative
              h-[400px]
              w-full
              sm:h-[450px]
              md:h-[500px]
              lg:h-[550px]
              xl:h-[600px]
            "
          >
            <Image
              src="/slider/4.png"
              fill
              sizes="100vw"
              alt="Summer Collection"
              className="object-cover"
            />

            <div
              className="
                absolute
                left-5
                top-1/2
                w-[85%]
                -translate-y-1/2
                sm:left-10
                sm:w-[70%]
                md:left-16
                md:w-[60%]
                lg:left-20
                lg:w-[55%]
                xl:left-24
                xl:w-[50%]
              "
            >
              <h2
                className="
                  my-3
                  text-3xl
                  font-bold
                  leading-tight
                  text-blue-950
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Summer Collection
              </h2>

              <p
                className="
                  my-3
                  text-sm
                  font-bold
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                "
              >
                Fresh styles made for the season, shop now
              </p>

              <Button
                className="
                  cursor-pointer
                  border
                  border-black
                  bg-black
                  p-4
                  text-sm
                  text-white
                  duration-300
                  hover:border-black
                  hover:bg-transparent
                  hover:text-black
                  sm:p-5
                  sm:text-base
                  md:p-6
                  md:text-lg
                "
              >
                Shop Now
                <MoveRight className="ml-1" />
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
