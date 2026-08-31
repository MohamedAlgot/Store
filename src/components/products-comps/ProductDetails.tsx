"use client";

import { IProductDetails } from "@/app/types/productDetails.model";
import Image from "next/image";
import React, { useState } from "react";
import { StarRating } from "react-flexible-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles


// Swiper modules
import { Navigation, Pagination } from "swiper/modules";

import { getAddproduct } from "@/app/actions/Cart.action";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
import { Loader2, ShoppingCart } from "lucide-react";

export default function ProductDetails({
  Productdetails,
}: {
  Productdetails: IProductDetails;
}) {
  const { getCartDetails } = UseCart();

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddtoCart(productId: string) {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await getAddproduct(productId);

      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success("Product added to cart successfully");
      }

      await getCartDetails();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="
        container
        mx-auto
        mt-8
        w-[92%]
        rounded-2xl
        p-4
        shadow-lg
        shadow-green-400
        sm:mt-12
        sm:p-5
        md:mt-20
        lg:mt-24
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-8
          md:flex-row
          md:gap-6
          lg:gap-10
        "
      >
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            navigation
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
            className="w-full"
          >
            {Productdetails.images.map((src, index) => (
              <SwiperSlide key={`${src}-${index}`}>
                <div
                  className="
                    relative
                    h-[240px]
                    w-full
                    sm:h-[300px]
                    md:h-[340px]
                    lg:h-[380px]
                    xl:h-[420px]
                    overflow-hidden
                    rounded-2xl
                    bg-white
                  "
                >
                  <Image
                    src={src}
                    alt={`${Productdetails.title} image ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="
                      (max-width: 640px) 92vw,
                      (max-width: 768px) 85vw,
                      (max-width: 1024px) 45vw,
                      40vw
                    "
                    className="
                      object-contain
                      p-3
                      sm:p-4
                      md:p-5
                    "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2">
          <h2
            className="
              text-2xl
              font-bold
              leading-tight
              tracking-tighter
              sm:text-3xl
              lg:text-4xl
            "
          >
            {Productdetails.title}
          </h2>

          <p
            className="
              pt-3
              text-base
              leading-relaxed
              text-slate-500
              sm:text-lg
            "
          >
            {Productdetails.description}
          </p>

          <div
            className="
              my-6
              flex
              flex-col
              gap-4
              sm:my-7
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Category & Price */}
            <div>
              <p className="my-2 text-base font-bold sm:text-lg">
                Product Name:{" "}
                <span className="text-green-500">
                  {Productdetails?.category?.name}
                </span>
              </p>

              <p className="my-2 text-base font-bold sm:text-lg">
                Price:{" "}
                <span className="text-green-500">
                  {Productdetails.price} EGP
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating
                initialRating={Math.floor(Productdetails.ratingsAverage)}
                dimension={6}
              />

              <span className="text-sm font-semibold sm:text-base">
                {Productdetails.ratingsAverage}
              </span>
            </div>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={() => handleAddtoCart(Productdetails._id)}
            disabled={isLoading}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-green-500
              bg-green-500
              p-3
              font-bold
              text-white
              transition-all
              duration-300
              hover:bg-transparent
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-70
              sm:p-4
            "
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add To Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
