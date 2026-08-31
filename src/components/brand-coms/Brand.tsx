import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { getAllBrand } from "@/app/actions/brand.action";

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default async function Brand() {
  const response = await getAllBrand();

  return (
    <>
      {response?.data.data.map((bra: IBrand) => (
        <Card
          key={bra._id}
          className="
            group
            w-full
            h-full
            overflow-hidden
            border-0
            cursor-pointer
            transition-all
            duration-500
            hover:shadow-xl
            hover:shadow-green-300
            hover:text-green-500
          "
        >
          <CardContent className="p-0">
            <div
              className="
                relative
                w-full
                h-[150px]
                sm:h-[170px]
                md:h-[190px]
                lg:h-[210px]
                xl:h-[230px]
                overflow-hidden
                bg-white
              "
            >
              <Image
                src={bra.image}
                alt={bra.name}
                fill
                className="
                  object-contain
                  p-3
                  sm:p-4
                  md:p-5
                  lg:p-6
                  transition-transform
                  duration-500
                  group-hover:scale-105
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
              items-center
              justify-center
              min-h-[55px]
              px-2
              py-3
              sm:min-h-[60px]
              md:min-h-[65px]
            "
          >
            <p
              className="
                w-full
                text-center
                font-bold
                leading-tight
                text-base
                sm:text-lg
                md:text-xl
                lg:text-xl
                xl:text-2xl
                break-words
              "
            >
              {bra.name}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
