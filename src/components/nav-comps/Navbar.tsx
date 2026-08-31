"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  ShoppingBag,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { UseCart } from "@/app/context/Cartcontext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();
  const { CartDetails, whishlist } = UseCart();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-green-600 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7">

        {/* Main Navbar */}
        <div className="flex min-h-[80px] items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="
              flex
              shrink-0
              items-center
              text-2xl
              font-bold
              tracking-tighter
              text-white
              transition
              duration-300
              hover:text-red-500
              sm:text-3xl
              lg:text-4xl
            "
          >
            <ShoppingBag
              size={28}
              className="mr-2 shrink-0"
            />

            <span className="whitespace-nowrap">
              Fresh Cart<span className="text-2xl">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            <Link
              href="/"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Products
            </Link>

            <Link
              href="/cart"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Cart
            </Link>

            <Link
              href="/whishlist"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Wish list
            </Link>

            <Link
              href="/cat"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Categories
            </Link>

            <Link
              href="/brand"
              className="font-bold text-white transition duration-300 hover:text-red-500"
            >
              Brands
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative text-white transition duration-300 hover:text-blue-400"
            >
              {CartDetails?.numOfCartItems ? (
                <Badge
                  className="
                    absolute
                    -right-3
                    -top-3
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    bg-black
                    px-1
                    text-xs
                    text-white
                  "
                >
                  {CartDetails.numOfCartItems}
                </Badge>
              ) : null}

              <ShoppingCart size={22} />
            </Link>

            {/* Wishlist */}
            <Link
              href="/whishlist"
              aria-label="Wishlist"
              className="relative text-white transition duration-300 hover:text-red-400"
            >
              {whishlist?.count ? (
                <Badge
                  className="
                    absolute
                    -right-3
                    -top-3
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    bg-black
                    px-1
                    text-xs
                    text-white
                  "
                >
                  {whishlist.count}
                </Badge>
              ) : null}

              <Heart size={22} />
            </Link>

            {/* Desktop Login / Register / Logout */}
            {session.data ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="
                  hidden
                  cursor-pointer
                  items-center
                  gap-1
                  font-bold
                  text-white
                  transition
                  duration-300
                  hover:text-red-500
                  lg:flex
                "
              >
                Logout
                <LogOut size={19} />
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="
                    hidden
                    font-bold
                    text-white
                    transition
                    duration-300
                    hover:text-blue-400
                    lg:block
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    hidden
                    font-bold
                    text-white
                    transition
                    duration-300
                    hover:text-blue-400
                    lg:block
                  "
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="flex cursor-pointer text-white lg:hidden"
            >
              {isMenuOpen ? <X size={27} /> : <Menu size={27} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            lg:hidden
            ${
              isMenuOpen
                ? "max-h-[500px] border-t border-white/20 opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="flex flex-col gap-1 py-3">

            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Products
            </Link>

            <Link
              href="/cart"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Cart
            </Link>

            <Link
              href="/whishlist"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Wish list
            </Link>

            <Link
              href="/cat"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Categories
            </Link>

            <Link
              href="/brand"
              onClick={closeMenu}
              className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
            >
              Brands
            </Link>

            <div className="my-1 border-t border-white/20" />

            {session.data ? (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  signOut({ callbackUrl: "/login" });
                }}
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-md
                  px-3
                  py-2
                  font-bold
                  text-white
                  hover:bg-white/10
                "
              >
                Logout
                <LogOut size={18} />
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-md px-3 py-2 font-bold text-white hover:bg-white/10"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
