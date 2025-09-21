import React  from "react";
import {
  Card,
  CardContent,
  CardFooter,

} from "@/components/ui/card";
import Image from "next/image";
import { getCategories } from "@/app/actions/categories.action";


export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export default async function ProductCategories() {
  
  const response = await getCategories();

  console.log(response);

  return (
    < >
      {response?.data.map((cat:ICategory) => (
        <Card key={cat._id} className="hover:shadow-lg cursor-pointer duration-500 hover:shadow-green-300 border-0" >
          <CardContent>
            <div className="w-full relative h-[250px]">
              <Image
                src={cat.image}
                alt="image error"
                fill
                sizes="(max-width:768px) 100vw ,(max-width:1200px) 50vw , 25vw "
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="font-bold hover:text-green-500 ">{cat.name}</p>
          </CardFooter>
        </Card>
      ))}

    </>
  );
}
