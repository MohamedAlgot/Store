"use client";
import { products } from "@/app/types/product.model";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";

export default function ProductGridSystem({
  products,
}: {
  products: products[];
}) {

  const [Search, setSearch] = useState(null)

  return (
    <div className="container mx-auto mt-25">
      <Input
        type="search"
        placeholder="Search"
        className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-10
        border-green-500  focus:shadow-green-500 "
      />

      <h2 className="text-4xl font-extrabold text-start mt-25 my-3 text-green-700">
        Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:col-end-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
