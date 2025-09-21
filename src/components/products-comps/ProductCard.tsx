"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/app/types/product.model";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";
import { log } from "console";
import { getAddproduct, removeproduct } from "@/app/actions/Cart.action";
import toast from "react-hot-toast";
import { UseCart } from "@/app/context/Cartcontext";
import { Input } from "../ui/input";
import { AddWhishlist } from "@/app/actions/whishlist";
export default function ProductCard({ product }: { product: products }) {

    const {getCartDetails}= UseCart();
    const {getWhishlistDetails}=UseCart()

  async function handleAddtoCart(productId:string) {


    const response=await getAddproduct(productId);


    console.log(response);
    toast.success(<p className="text-green-600">{response?.message}</p> );
    
    await getCartDetails();
     
  }

    async function handleAddtoWhishlist(productId:string) {


    const response=await AddWhishlist(productId);


    console.log(response);
    toast.success(<p className="text-green-600">{response?.message}</p> );
    
     await getWhishlistDetails();
  }



  



  return (
    <div>

      <Card className=" relative hover:shadow-xl duration-500 hover:shadow-green-400 border-0 hover:text-green-600 group overflow-hidden">
        <div className=" absolute z-1  top-[100px] right-[-100] flex-col flex gap-3 duration-400 group-hover:right-0">
          <button onClick={()=>handleAddtoCart(product._id)} className="p-2 text-black bg-slate-200 duration-150 hover:text-green-500 cursor-pointer">
            <ShoppingCart />
          </button>
          <button onClick={()=>handleAddtoWhishlist(product._id)} className="p-2 text-black bg-slate-200 duration-150 hover:text-red-500 cursor-pointer">
            <Heart />
          </button>
          <button className="p-2 text-black bg-slate-200 duration-150 hover:text-blue-500 cursor-pointer">
            <Link href={`/products/${product._id}`}>
              <ZoomIn />
            </Link>
          </button>
        </div>
        <CardHeader>
          <CardTitle>
            {product.title.split(" ").splice(0, 2).join(" ")}
          </CardTitle>
          <CardDescription>
            {product.description.split(" ").splice(0, 7).join(" ")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full relative h-[250]">
            <Image
              src={product.imageCover}
              alt={product.description}
              property=""
              fill
              sizes="(max-width:768px) 100vw ,(max-width:1200px) 50vw , 25vw "
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <p className="text-lg font-bold  ">
            Price <span>{product.price} EGP</span>
          </p>

          <StarRating
            initialRating={Math.floor(product.ratingsAverage)}
            dimension={6}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
