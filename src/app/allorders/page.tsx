import React from "react";
import { Store } from "lucide-react";

export default function AllOrders() {
  return (
    <>
      <div className="container mx-auto text-center my-28 mb-56 ">
        <div className="flex justify-center items-center gap-3  ">
          {" "}
          <h2 className="text-green-500 font-bold text-6xl">
            Payment Made 
          </h2>
          <Store className="text-green-500 " size={50}/>
        </div>
      </div>
    </>
  );
}
