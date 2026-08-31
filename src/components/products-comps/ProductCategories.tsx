import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { getCategories } from "@/app/actions/categories.action";
import { categories } from "@/app/types/categort.model";



export default async function ProductCategories() {
  const response = await getCategories();

  return (
    <>
      {response?.data.map((cat: categories) => (
        <Card
          key={cat._id}
          className="
            w-full
            h-full
            overflow-hidden
            border-0
            cursor-pointer
          "
        >
          <CardContent className="p-0">
            <div
              className="
                relative
                w-full
                h-[140px]
                overflow-hidden
                sm:h-[170px]
                md:h-[190px]
                lg:h-[220px]
                xl:h-[240px]
              "
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="
                  object-contain
                "
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 768px) 33vw,
                  (max-width: 1024px) 25vw,
                  (max-width: 1280px) 20vw,
                  16.66vw
                "
              />
            </div>
          </CardContent>

          <CardFooter
            className="
              flex
              min-h-[55px]
              items-center
              justify-center
              px-2
              py-3
              sm:min-h-[60px]
              sm:px-3
              sm:py-4
            "
          >
            <p
              className="
                w-full
                text-center
                font-bold
                text-base
                leading-tight
                sm:text-lg
                md:text-xl
              "
            >
              {cat.name}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
