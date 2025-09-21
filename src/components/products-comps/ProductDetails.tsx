"use client";
import { IProductDetails } from "@/app/types/productDetails.model";
import Image from "next/image";
import React from "react";
import { StarRating } from "react-flexible-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { getAddproduct } from "@/app/actions/Cart.action";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
export default function ProductDetails({
  Productdetails,
}: {
  Productdetails: IProductDetails;
}) {




    const {getCartDetails}= UseCart();


  async function handleAddtoCart(productId:string) {


    const response=await getAddproduct(productId);


    console.log(response);
    toast.success(response?.message);
    
    await getCartDetails();
     
  }


  return (
    <>
      <div className="container mx-auto w-[90%] mt-32 shadow-lg  shadow-green-400 rounded-2xl p-5">
        <div className="flex justify-between items-center gap-3 ">
          <div className="w-full md:w-1/2">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={16}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
                  className="mySwiper"
                >
                  {Productdetails.images.map((src,index) => (
                    <>
                      <SwiperSlide key={index} className=" rounded-2xl">
                        <div className="relative h-[330px] w-full ">
                          <Image
                            src={src}
                            fill
                            priority
                            loading="eager"
                            sizes="(max-width:768px)100vw(max-width:1200px)50vw,25vw"
                            alt="error slider"
                            className="object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tighter">
              {Productdetails.title}
            </h2>
            <p className="text-lg pt-3 text-slate-500 tracking-tighter">
              {Productdetails.description}
            </p>

            <div className="flex justify-between items-center my-7">
              <div className="catprice">
                <p className="text-lg my-2 font-bold">
                  Product Name:{" "}
                  <span className="text-green-500">
                    {Productdetails?.category?.name}
                  </span>{" "}
                </p>
                <p className="text-lg my-2 font-bold">
                  {" "}
                  Price:{" "}
                  <span className="text-green-500">
                    {Productdetails.price} EGP
                  </span>
                </p>
              </div>

              <div className=" flex gap-2">
                <StarRating
                  initialRating={Math.floor(Productdetails.ratingsAverage)}
                  dimension={6}
                />
                <span>{Productdetails.ratingsAverage}</span>
              </div>
            </div>
            <button onClick={()=>handleAddtoCart(Productdetails._id)} className="bg-green-500 text-white rounded-lg cursor-pointer font-bold w-full duration-300 p-3 hover:bg-transparent border hover:border-green-500 hover:text-black">
              {" "}
              + Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
