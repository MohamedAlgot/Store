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
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { UseCart } from "@/app/context/Cartcontext";
import toast from "react-hot-toast";
import {
  getAddproduct,
  removeproduct,
  UpdateProduct,
} from "@/app/actions/Cart.action";
import Link from "next/link";
export default function Tablecart() {
  const { CartDetails } = UseCart();

  const { getCartDetails } = UseCart();

  async function handleRemoveCart(productId: string) {
    const response = await removeproduct(productId);
    console.log(response, "remove");
    await getCartDetails();
    toast.success(<p className="text-red-800 ">Deleted</p>);
  }

  async function UpdateCartProduct(productId: string, count: number) {
    const response = await UpdateProduct(productId, count);
    console.log(response, "update");
    await getCartDetails();
    toast.success(<p className="text-green-500 ">Product Update</p>);
  }

  return (
    <>
    
    
    {CartDetails?.numOfCartItems!=0?    <div className="container mx-auto w-3/4 mt-[50px] ">
      <Table className="mb-48">
        <TableHeader>
          <TableRow className="">
            <TableHead className="p-6 text-2xl text-green-700 font-bold ">
              Product
            </TableHead>
            <TableHead className="p-6 text-2xl text-green-700 font-bold text-center">
              Price
            </TableHead>
            <TableHead className="p-6 text-2xl text-green-700 font-bold text-center">
              Quantity
            </TableHead>
            <TableHead className="p-6 text-2xl text-green-700 font-bold text-center">
              SubTotal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CartDetails?.data?.products.map((product) => (
            <TableRow key={product.product._id}>
              <TableCell className="font-medium p-3">
                <div className="flex p-2 gap-1 items-center">
                  <div className="box_image">
                    <Image
                      src={product.product.imageCover}
                      width="120"
                      height="120"
                      alt="error image"
                    />
                  </div>

                  <div className=" ">
                    <p className="text-gray-500 text-2xl font-bold">
                      {product.product.title.split(" ").slice(0, 2).join(" ")}
                    </p>

                    <div className=" flex mt-[50px]">
                      <Button
                        onClick={() => handleRemoveCart(product.product._id)}
                        className=" cursor-pointer border border-red-500 hover:bg-red-600 hover:text-white"
                      >
                        Remove <Trash size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xl font-bold text-center text-green-500">
                {product.price} EGP
              </TableCell>
              <TableCell className="text-xl font-bold text-center">
                <div className="flex gap-4  justify-center">
                  <Button
                    onClick={() =>
                      UpdateCartProduct(product.product._id, product.count + 1)
                    }
                    className="text-xl font-bold border border-green-500 hover:bg-green-400 hover:text-white cursor-pointer"
                  >
                    +
                  </Button>
                  <p>{product.count}</p>
                  <Button
                    onClick={() =>
                      UpdateCartProduct(product.product._id, product.count - 1)
                    }
                    className="text-xl font-bold border border-green-500 hover:bg-green-400 hover:text-white cursor-pointer"
                  >
                    -
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-xl font-bold text-center text-green-500">
                {product.price * product.count} EGP
              </TableCell>
            </TableRow>
          ))}

          <TableRow className="bg-slate-100 t">
            <TableCell className="text-2xl font-bold  text-green-500 p-5  ">
              Total Price
            </TableCell>
            <TableCell
              className="text-2xl font-bold  text-green-500 p-5 px-9"
              colSpan={2}
            >
              {CartDetails?.data.totalCartPrice} EGP
            </TableCell>
            <TableCell className="p-5 text-center">
              <Button className=" duration-200 py-7 border border-black bg-black text-white cursor-pointer  font-bold text-lg  hover:bg-white hover:text-black ">
                <Link href="/checkout">CheckOut</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>:<div className=" h-36"><h2 className="text-center text-green-500 text-4xl my-10 font-extrabold ">You need to add products to cart </h2></div>}
    
    
    
    
    </>
  );
}
