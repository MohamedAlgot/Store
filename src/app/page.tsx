import MainSlider from "@/components/slider-comps/MainSlider";
import Image from "next/image";
import { getCategories } from "./actions/categories.action";
import CatsliderComp from "@/components/slider-comps/CatsliderComp";
import { getproducts } from "./actions/product.action";
import ProductGridSystem from "@/components/products-comps/ProductGridSystem";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const response = await getCategories();
  const data=response?.data;


  const responsedata=await getproducts();

  const products=responsedata?.data||[];

  const session = await getServerSession(options);

  console.log(session,"session");
  
  
  return (
    <>
      <div className="container mx-auto p-7 w-[95%]">
        <MainSlider />

      <CatsliderComp category={data}/>
      <ProductGridSystem products={products}/>
      
        {/* <Catslider /> */}
      </div>
    </>
  );
}
