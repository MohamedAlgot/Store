"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Heart, Trash, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
import { getAddproduct } from "@/app/actions/Cart.action";
import {
  removeWhishlist,
} from "@/app/actions/whishlist";
import { StarRating } from "react-flexible-star-rating";

export default function Tablewishlist() {
  const {
    whishlist,
    getCartDetails,
    getWhishlistDetails,
  } = UseCart();

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<
    "cart" | "remove" | null
  >(null);

  async function handleAddtoCart(productId: string) {
    if (loadingProductId) return;

    try {
      setLoadingProductId(productId);
      setLoadingAction("cart");

      const response = await getAddproduct(productId);

      toast.success(response?.message || "Product added to cart");

      await getCartDetails();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  }

  async function handleRemoveWishlist(productId: string) {
    if (loadingProductId) return;

    try {
      setLoadingProductId(productId);
      setLoadingAction("remove");

      await removeWhishlist(productId);
      await getWhishlistDetails();

      toast.success("Deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  }

  if (!whishlist?.data?.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <h2 className="text-center text-2xl font-extrabold text-green-500 sm:text-3xl md:text-4xl">
          You need to add products to Wish List
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 w-[95%] sm:w-[92%] lg:w-3/4">
      {/* Desktop / Tablet */}
      <div className="hidden overflow-x-auto md:block">
        <Table className="mb-20 min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                <div className="flex items-center">
                  My Wish List
                  <Heart className="ml-3" />
                </div>
              </TableHead>

              <TableHead className="p-4 text-center text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                Price
              </TableHead>

              <TableHead className="p-4 text-center text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                Add to Cart
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {whishlist.data.map((whish) => (
              <TableRow key={whish._id}>
                <TableCell className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-[100px] w-[100px] shrink-0 lg:h-[120px] lg:w-[120px]">
                      <Image
                        src={whish.imageCover}
                        alt={whish.title}
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-lg font-bold text-gray-500 lg:text-2xl">
                        {whish.title.split(" ").slice(0, 2).join(" ")}
                      </p>

                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <StarRating
                            initialRating={Math.floor(
                              whish.ratingsAverage
                            )}
                            dimension={6}
                          />

                          <span className="text-base lg:text-xl">
                            {whish.ratingsAverage}
                          </span>
                        </div>

                        <Button
                          onClick={() =>
                            handleRemoveWishlist(whish._id)
                          }
                          disabled={loadingProductId === whish._id}
                          className="w-fit cursor-pointer border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          {loadingProductId === whish._id &&
                          loadingAction === "remove" ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : (
                            <>
                              Remove
                              <Trash size={18} />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center text-lg font-bold text-green-500 lg:text-xl">
                  {whish.price} EGP
                </TableCell>

                <TableCell className="p-3">
                  <Button
                    onClick={() => handleAddtoCart(whish._id)}
                    disabled={loadingProductId === whish._id}
                    className="
                      w-full
                      cursor-pointer
                      border
                      border-green-500
                      bg-green-500
                      font-bold
                      text-white
                      hover:bg-transparent
                      hover:text-black
                    "
                  >
                    {loadingProductId === whish._id &&
                    loadingAction === "cart" ? (
                      <>
                        <Loader2
                          size={18}
                          className="mr-2 animate-spin"
                        />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add To Cart
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="block space-y-4 md:hidden">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <h2 className="text-2xl font-extrabold">My Wish List</h2>
          <Heart size={24} />
        </div>

        {whishlist.data.map((whish) => (
          <div
            key={whish._id}
            className="rounded-xl border p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="relative h-24 w-24 shrink-0">
                <Image
                  src={whish.imageCover}
                  alt={whish.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-base font-bold text-gray-500">
                  {whish.title.split(" ").slice(0, 3).join(" ")}
                </p>

                <p className="mt-2 text-base font-bold text-green-500">
                  {whish.price} EGP
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <StarRating
                    initialRating={Math.floor(
                      whish.ratingsAverage
                    )}
                    dimension={5}
                  />

                  <span className="text-sm">
                    {whish.ratingsAverage}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t pt-4">
              <Button
                onClick={() => handleRemoveWishlist(whish._id)}
                disabled={loadingProductId === whish._id}
                className="
                  flex-1
                  cursor-pointer
                  border
                  border-red-500
                  text-red-600
                  hover:bg-red-600
                  hover:text-white
                "
              >
                {loadingProductId === whish._id &&
                loadingAction === "remove" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Remove
                    <Trash size={18} />
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleAddtoCart(whish._id)}
                disabled={loadingProductId === whish._id}
                className="
                  flex-1
                  cursor-pointer
                  bg-green-500
                  font-bold
                  text-white
                  hover:bg-green-600
                "
              >
                {loadingProductId === whish._id &&
                loadingAction === "cart" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
