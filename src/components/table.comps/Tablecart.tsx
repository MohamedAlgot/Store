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
import { Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
import {
  removeproduct,
  UpdateProduct,
} from "@/app/actions/Cart.action";
import Link from "next/link";

export default function Tablecart() {
  const { CartDetails, getCartDetails } = UseCart();

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<"remove" | "update" | null>(
    null
  );

  async function handleRemoveCart(productId: string) {
    if (loadingProductId) return;

    try {
      setLoadingProductId(productId);
      setLoadingAction("remove");

      await removeproduct(productId);
      await getCartDetails();

      toast.success("Deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  }

  async function UpdateCartProduct(productId: string, count: number) {
    if (loadingProductId || count < 1) return;

    try {
      setLoadingProductId(productId);
      setLoadingAction("update");

      await UpdateProduct(productId, count);
      await getCartDetails();

      toast.success("Product Updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setLoadingProductId(null);
      setLoadingAction(null);
    }
  }

  if (!CartDetails?.numOfCartItems) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <h2 className="text-center text-2xl font-extrabold text-green-500 sm:text-3xl md:text-4xl">
          You need to add products to cart
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 w-[95%] sm:w-[92%] lg:w-3/4">
      {/* Desktop / Tablet Table */}
      <div className="hidden overflow-x-auto md:block">
        <Table className="mb-20 min-w-[750px]">
          <TableHeader>
            <TableRow>
              <TableHead className="p-4 text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                Product
              </TableHead>

              <TableHead className="p-4 text-center text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                Price
              </TableHead>

              <TableHead className="p-4 text-center text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                Quantity
              </TableHead>

              <TableHead className="p-4 text-center text-lg font-bold text-green-700 lg:p-6 lg:text-2xl">
                SubTotal
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {CartDetails.data.products.map((product) => (
              <TableRow key={product.product._id}>
                <TableCell className="p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.product.imageCover}
                      width={100}
                      height={100}
                      alt={product.product.title}
                      className="rounded-md object-contain"
                    />

                    <div>
                      <p className="text-lg font-bold text-gray-500 lg:text-2xl">
                        {product.product.title
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                      </p>

                      <Button
                        onClick={() =>
                          handleRemoveCart(product.product._id)
                        }
                        disabled={loadingProductId === product.product._id}
                        className="mt-4 cursor-pointer border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        {loadingProductId === product.product._id &&
                        loadingAction === "remove" ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            Remove
                            <Trash size={18} />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center text-lg font-bold text-green-500 lg:text-xl">
                  {product.price} EGP
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      disabled={loadingProductId === product.product._id}
                      onClick={() =>
                        UpdateCartProduct(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="cursor-pointer border border-green-500 text-lg font-bold hover:bg-green-400 hover:text-white"
                    >
                      +
                    </Button>

                    <p className="min-w-6 text-lg font-bold">
                      {product.count}
                    </p>

                    <Button
                      disabled={
                        loadingProductId === product.product._id ||
                        product.count <= 1
                      }
                      onClick={() =>
                        UpdateCartProduct(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="cursor-pointer border border-green-500 text-lg font-bold hover:bg-green-400 hover:text-white"
                    >
                      -
                    </Button>
                  </div>
                </TableCell>

                <TableCell className="text-center text-lg font-bold text-green-500 lg:text-xl">
                  {product.price * product.count} EGP
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-slate-100">
              <TableCell className="p-4 text-lg font-bold text-green-500 lg:p-5 lg:text-2xl">
                Total Price
              </TableCell>

              <TableCell
                className="p-4 text-lg font-bold text-green-500 lg:p-5 lg:text-2xl"
                colSpan={2}
              >
                {CartDetails.data.totalCartPrice} EGP
              </TableCell>

              <TableCell className="p-4 text-center lg:p-5">
                <Button className="cursor-pointer border border-black bg-black px-5 py-6 text-base font-bold text-white hover:bg-white hover:text-black lg:text-lg">
                  <Link href="/checkout">CheckOut</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cart */}
      <div className="block space-y-4 md:hidden">
        {CartDetails.data.products.map((product) => (
          <div
            key={product.product._id}
            className="rounded-xl border p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="relative h-24 w-24 shrink-0">
                <Image
                  src={product.product.imageCover}
                  alt={product.product.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-gray-500">
                  {product.product.title
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
                </p>

                <p className="mt-1 text-base font-bold text-green-500">
                  {product.price} EGP
                </p>

                <Button
                  onClick={() =>
                    handleRemoveCart(product.product._id)
                  }
                  disabled={loadingProductId === product.product._id}
                  className="mt-3 cursor-pointer border border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  {loadingProductId === product.product._id &&
                  loadingAction === "remove" ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <>
                      Remove
                      <Trash size={17} />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-3">
                <Button
                  disabled={
                    loadingProductId === product.product._id ||
                    product.count <= 1
                  }
                  onClick={() =>
                    UpdateCartProduct(
                      product.product._id,
                      product.count - 1
                    )
                  }
                  className="h-9 w-9 cursor-pointer border border-green-500 p-0 text-lg font-bold hover:bg-green-400 hover:text-white"
                >
                  -
                </Button>

                <span className="font-bold">{product.count}</span>

                <Button
                  disabled={loadingProductId === product.product._id}
                  onClick={() =>
                    UpdateCartProduct(
                      product.product._id,
                      product.count + 1
                    )
                  }
                  className="h-9 w-9 cursor-pointer border border-green-500 p-0 text-lg font-bold hover:bg-green-400 hover:text-white"
                >
                  +
                </Button>
              </div>

              <p className="text-base font-bold text-green-500">
                {product.price * product.count} EGP
              </p>
            </div>
          </div>
        ))}

        {/* Mobile Total */}
        <div className="rounded-xl bg-slate-100 p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-500">
              Total Price
            </span>

            <span className="text-lg font-bold text-green-500">
              {CartDetails.data.totalCartPrice} EGP
            </span>
          </div>

          <Button className="mt-4 w-full cursor-pointer border border-black bg-black py-6 text-lg font-bold text-white hover:bg-white hover:text-black">
            <Link href="/checkout">CheckOut</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
