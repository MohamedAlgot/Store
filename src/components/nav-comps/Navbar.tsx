"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ShoppingCart, Heart, ShoppingBag, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { sign } from "crypto";
import { log } from "console";
import { Badge } from "../ui/badge";
import { UseCart } from "@/app/context/Cartcontext";
import WhishList from "@/app/whishlist/page";

export default function Navbar() {
  const session = useSession();

  const { CartDetails } = UseCart();
  const { whishlist } = UseCart();

  return (
    <>
      <NavigationMenu className=" shadow-xl bg-green-600   max-w-9xl p-5   ">
        <div className="container px-7 mx-auto flex justify-between items-center ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/"
                className=" text-4xl font-bold text-white tracking-tighter focus:text-red-600 flex  hover:text-red-600 duration-500"
              >
                <ShoppingBag className="mt-2 mr-2" size={30} />
                Fresh Cart<span className=" text-3xl">.</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="gap-4 text-lg">
            <NavigationMenuItem>
              <Link
                href="/"
                className=" hover:text-red-500 focus:text-red-600 font-bold text-white duration-500"
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/products"
                className="hover:text-red-500 focus:text-red-600  font-bold text-white  duration-500"
              >
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/cart"
                className=" hover:text-red-500  font-bold text-white  duration-500"
              >
                Cart
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/whishlist"
                className=" hover:text-red-500 focus:text-red-600  font-bold text-white  duration-500"
              >
                Wish list
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/cat"
                className=" hover:text-red-500 focus:text-red-600  font-bold text-white  duration-500"
              >
                Categories
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/brand"
                className="hover:text-red-500 focus:text-red-600  font-bold text-white  duration-500"
              >
                Brands
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className=" gap-4">
            <NavigationMenuItem>
              <Link
                href="/cart"
                className="   text-white   hover:text-blue-600 duration-500"
              >
                <button className=" cursor-pointer relative">
                  {CartDetails?.numOfCartItems?                  <Badge
                    variant="default"
                    className=" text-white absolute top-[-20px] bg-black  right-[-17px]"
                  >
                    {CartDetails?.numOfCartItems}
                  </Badge>:null}

                  <ShoppingCart />
                </button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/whishlist"
                className="   text-white   hover:text-red-600 duration-500"
              >
                <button className=" cursor-pointer relative">
                  {whishlist?.count?                  <Badge
                    variant="default"
                    className=" text-white absolute top-[-20px] bg-black right-[-17px]"
                  >
                    {whishlist?.count}
                  </Badge>:null}
                  <Heart />
                </button>
              </Link>
            </NavigationMenuItem>
            {session.data ? (
              <NavigationMenuItem>
                <Link
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  href="/"
                  className="hover:text-red-600 flex gap-1   font-bold text-white  duration-500"
                >
                  Logout    <LogOut />

                </Link>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link
                    href="/login"
                    className="hover:text-blue-700   font-bold text-white  duration-500"
                  >
                    Login
                  </Link>
                </NavigationMenuItem>{" "}
                <NavigationMenuItem>
                  <Link
                    href="/register"
                    className="hover:text-blue-700   font-bold text-white  duration-500"
                  >
                    Register
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </>
  );
}
