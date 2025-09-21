"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UseCart } from "../context/Cartcontext";
import { getCashPayment, getOnlinePayment } from "../actions/Payment.action";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface IShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export default function Checkoutpage() {
  interface Inputs {
    details: string;
    phone: string;
    city: string;
  }
  const [Iserror, Setiserror] = useState(null);

  const router = useRouter();
  const { CartDetails, setCartDetails } = UseCart();

  const cartId = CartDetails?.cartId;

  const [PaymentMethod, setPaymentMethod] = useState<"online"| "Cash"| null >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {

    if(PaymentMethod ==="Cash")
    {
    try {
      const response = await getCashPayment(cartId as string,{
        shippingAddress:values
      } );
      

      if (response?.data.status === "success") {
        setCartDetails(null);
        router.push("/");
      }

      console.log(response, "checkout");
    } catch (error) {
      console.log(error);
      console.log(cartId, "id");
    }
    }
    
    else if(PaymentMethod==="online"){

          try {
      const response = await getOnlinePayment(cartId as string, values);
      
      console.log(response, "checkout");
      

      if (response?.data.status === "success") {
        // setCartDetails(null);
        window.location.href=response.data.session.url
      }


    } catch (error) {
      console.log(error);
      console.log(cartId, "id");
    }

    }


  }
  return (
    <>
      {" "}
      <div className=" w-1/2 mx-auto shadow-2xl my-10 pb-5 rounded-xl">
        <h2 className="font-bold text-4xl text-black text-start p-7">
          Payment
        </h2>
        {Iserror && (
          <p className="text-red-500 text-center font-bold">{Iserror}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-9">
          <Input
            type="text"
            placeholder="Your Name"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("details", { required: "Passowrd is required" })}
          />
          {errors.details && (
            <p className="text-red-800">{errors.details.message}</p>
          )}

          <Input
            type="tel"
            placeholder="Your phone"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("phone", { required: "phone is required" })}
          />
          {errors.phone && (
            <p className="text-red-800">{errors.phone.message}</p>
          )}

          <Input
            type="text"
            placeholder="Your city"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("city", { required: "city is required" })}
          />
          {errors.city && <p className="text-red-800">{errors.city.message}</p>}

          <RadioGroup onValueChange={(val)=>setPaymentMethod(val as "online"|"Cash")} className="font-bold" >
            <div className="flex items-center space-x-2 mt-1">
              <RadioGroupItem value="Cash" id="Cash"  />
              <Label htmlFor="Cash" className="font-bold " >Cash Payment</Label>
            </div>
            <div  className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="online" id="online"  />
              <Label htmlFor="online" className="font-bold ">Online Payment</Label>
            </div>
          </RadioGroup>
          <Button
            type="submit"
            className="px-7 py-5 duration-300 hover:bg-black  cursor-pointer hover:text-white border-1   border-gray-300 font-bold"
          >
            Pay Now
          </Button>
        </form>
      </div>
    </>
  );
}
