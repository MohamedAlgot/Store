import ProductCategories from "@/components/products-comps/ProductCategories";
import React from "react";

export default function Pagecategories() {
  return (
    <div className="container mx-auto w-[90%]  my-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
        <ProductCategories />
      </div>
    </div>
  );
}
