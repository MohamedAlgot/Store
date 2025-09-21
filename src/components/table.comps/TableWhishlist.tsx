"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Heart, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
import {
  getAddproduct,
  removeproduct,
  UpdateProduct,
} from "@/app/actions/Cart.action";
import Link from "next/link";
import { getWhishlist, removeWhishlist } from "@/app/actions/whishlist";
import { log } from "console";
import { StarRating } from "react-flexible-star-rating";
import productDetails from "@/app/products/[id]/page";
import WhishList from "@/app/whishlist/page";
export default function Tablewishlist() {
  const { whishlist } = UseCart();

  const { getCartDetails } = UseCart();

  const {getWhishlistDetails}=UseCart();

  console.log(whishlist, "wwwwwwwwwwww");

  async function handleAddtoCart(productId: string) {
    const response = await getAddproduct(productId);

    console.log(response);
    toast.success(<p className="text-green-600">{response?.message}</p>);

    await getCartDetails();
  }

    async function handleRemoveCart(productId: string) {
      const response = await removeWhishlist(productId);
      console.log(response, "remove");
      await getWhishlistDetails();
      toast.success(<p className="text-red-800 ">Deleted</p>);
    }

  return (
      <>

    {whishlist?.data ?   <div className="container mx-auto w-3/4 mt-[50px]">
        <Table className=" mb-48">
          <TableHeader>
            <TableRow>
              <TableHead className="p-6 text-2xl text-green-700 font-bold flex">
                My Whish list <Heart className="mt-2 mx-3" />
              </TableHead>
              <TableHead className="p-6 text-2xl text-green-700 font-bold text-center">
                Price
              </TableHead>
              <TableHead className="p-6 text-2xl text-green-700 font-bold text-center">
                Add to cart
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {whishlist?.data.map((whish) => (
              <TableRow key={whish._id}>
                <TableCell className="font-medium p-3">
                  <div className="flex p-2 gap-1 items-center">
                    <div className="box_image">
                      <Image
                        src={whish.imageCover}
                        width="120"
                        height="120"
                        alt="error image"
                      />
                    </div>
                    <div className="mx-3">
                      <p className="text-gray-500 text-2xl font-bold">
                        {whish.title.split(" ").slice(0,2).join(" ")}
                      </p>
                      <div className="flex flex-col mt-[40px]">
                        <div className="mb-5 flex gap-3">
                          <StarRating
                            initialRating={Math.floor(whish.ratingsAverage)}
                            dimension={6}
                          />
                          <span className="text-xl">
                            {whish.ratingsAverage}
                          </span>
                        </div>
                        <Button onClick={()=>handleRemoveCart(whish._id)} className="cursor-pointer border border-red-500 hover:bg-red-600 hover:text-white">
                          Remove <Trash size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xl font-bold text-center text-green-500">
                  {whish.price} EGP
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleAddtoCart(whish._id)}
                    className="bg-green-500 text-white rounded-lg cursor-pointer font-bold w-full duration-300 p-3 hover:bg-transparent border hover:border-green-500 hover:text-black"
                  >
                    + Add To Cart
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>: <div className="h-52"><h2 className="text-center text-green-500 text-4xl my-10 font-extrabold">You need to add products to Whish List </h2></div>}

   
    </>
  );
}
