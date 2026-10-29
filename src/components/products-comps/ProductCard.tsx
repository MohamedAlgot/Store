
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/app/types/product.model";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart, ShoppingCart, Loader2 } from "lucide-react";
import { getAddproduct } from "@/app/actions/Cart.action";
import toast from "react-hot-toast";
import { UseCart } from "@/app/context/Cartcontext";
import { AddWhishlist } from "@/app/actions/whishlist";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductCard({
  product,
}: {
  product: products;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  const { getCartDetails, getWhishlistDetails } = UseCart();

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  function requireLogin() {
    if (status === "loading") {
      return false;
    }

    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return false;
    }

    return true;
  }

  async function handleAddtoCart(productId: string) {
    if (isCartLoading || !requireLogin()) return;

    try {
      setIsCartLoading(true);

      const response = await getAddproduct(productId);

      toast.success(response?.message || "Product added to cart");

      await getCartDetails();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsCartLoading(false);
    }
  }

  async function handleAddtoWhishlist(productId: string) {
    if (isWishlistLoading || !requireLogin()) return;

    try {
      setIsWishlistLoading(true);

      const response = await AddWhishlist(productId);

      toast.success(response?.message || "Product added to wishlist");

      await getWhishlistDetails();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  }

  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if (target.closest("button")) return;

    router.push(`/products/${product._id}`);
  }

  return (
    <Card
      onClick={handleCardClick}
      className="
        relative h-full w-full cursor-pointer overflow-hidden
        border-0 transition-all duration-500 group
        hover:text-green-600 hover:shadow-xl hover:shadow-green-400
      "
    >
      <CardHeader className="px-4 py-3">
        <CardTitle className="line-clamp-2 text-sm sm:text-base">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-xs sm:text-sm">
          {product.description.split(" ").slice(0, 7).join(" ")}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <div
          className="
            relative h-[140px] w-full overflow-hidden
            sm:h-[160px] md:h-[175px] lg:h-[190px] xl:h-[200px]
          "
        >
          <Image
            src={product.imageCover}
            alt={product.description}
            fill
            className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 768px) 33vw,
              (max-width: 1024px) 25vw,
              20vw
            "
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 px-4 pb-4 pt-2">
        <p className="text-sm font-bold sm:text-base">
          Price <span>{product.price} EGP</span>
        </p>

        <div className="flex items-center gap-2">
          <StarRating
            initialRating={Math.floor(product.ratingsAverage)}
            dimension={5}
          />
          <span className="text-xs font-medium sm:text-sm">
            {product.ratingsAverage}
          </span>
        </div>

        <div className="flex w-full items-center gap-2">
          <Button
            type="button"
            disabled={isCartLoading || status === "loading"}
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product._id);
            }}
            className="
              flex-1 cursor-pointer bg-green-600 px-3 py-2
              text-sm font-bold text-white
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isCartLoading ? (
              <>
                <Loader2 className="mr-1 animate-spin" size={16} />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1" size={16} />
                Add Product
              </>
            )}
          </Button>

          <Button
            type="button"
            disabled={isWishlistLoading || status === "loading"}
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoWhishlist(product._id);
            }}
            aria-label="Add to wishlist"
            className="
              h-9 w-9 shrink-0 cursor-pointer bg-white
              p-0 text-black hover:bg-white
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isWishlistLoading ? (
              <Loader2 className="animate-spin" size={17} />
            ) : (
              <Heart size={18} />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
