import { getProductDetails } from "@/app/actions/product.action";
import ProductDetails from "@/components/products-comps/ProductDetails";
import React from "react";

export default async function productDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const response=await getProductDetails(id);

  const Productdetails=response?.data || [];
  
    console.log(Productdetails,"server id");

  return <>

    <ProductDetails Productdetails={Productdetails}/>
  </>;
}
