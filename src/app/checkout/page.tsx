"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UseCart } from "../context/Cartcontext";
import {
  getCashPayment,
  getOnlinePayment,
} from "../actions/Payment.action";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export interface IShippingAddress {
  details: string;
  city: string;
  phone: string;
}

interface Inputs {
  details: string;
  phone: string;
  city: string;
}

export default function Checkoutpage() {
  const router = useRouter();

  const { CartDetails, setCartDetails } = UseCart();

  const cartId = CartDetails?.cartId;

  const [paymentMethod, setPaymentMethod] = useState<
    "online" | "Cash" | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!cartId) {
      toast.error("Cart not found");
      return;
    }

    try {
      setIsLoading(true);

      if (paymentMethod === "Cash") {
        const response = await getCashPayment(cartId, {
          shippingAddress: values,
        });

        console.log(response, "cash checkout");

        if (response?.data?.status === "success") {
          toast.success("Order placed successfully");

          setCartDetails(null);

          router.push("/");
        } else {
          toast.error("Failed to place order");
        }
      }

      if (paymentMethod === "online") {
        const response = await getOnlinePayment(cartId, values);

        console.log(response, "online checkout");

        if (response?.data?.status === "success") {
          toast.success("Redirecting to payment...");

          window.location.href = response.data.session.url;
        } else {
          toast.error("Failed to create payment session");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="
        mx-auto
        my-8
        w-[92%]
        max-w-2xl
        rounded-xl
        shadow-2xl
        sm:my-10
        sm:w-[85%]
      "
    >
      <h2
        className="
          p-5
          text-3xl
          font-bold
          text-black
          sm:p-7
          sm:text-4xl
        "
      >
        Payment
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 pb-6 sm:mx-9 sm:px-0 sm:pb-8"
      >
        {/* Details */}
        <Input
          type="text"
          placeholder="Your Address Details"
          className="
            my-3
            w-full
            p-5
            border-gray-300
            focus:border-green-500
            focus:shadow-green-300
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          {...register("details", {
            required: "Address details are required",
          })}
        />

        {errors.details && (
          <p className="text-sm text-red-800">
            {errors.details.message}
          </p>
        )}

        {/* Phone */}
        <Input
          type="tel"
          placeholder="Your Phone"
          className="
            my-3
            w-full
            p-5
            border-gray-300
            focus:border-green-500
            focus:shadow-green-300
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          {...register("phone", {
            required: "Phone is required",
          })}
        />

        {errors.phone && (
          <p className="text-sm text-red-800">
            {errors.phone.message}
          </p>
        )}

        {/* City */}
        <Input
          type="text"
          placeholder="Your City"
          className="
            my-3
            w-full
            p-5
            border-gray-300
            focus:border-green-500
            focus:shadow-green-300
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          {...register("city", {
            required: "City is required",
          })}
        />

        {errors.city && (
          <p className="text-sm text-red-800">
            {errors.city.message}
          </p>
        )}

        {/* Payment Method */}
        <RadioGroup
          value={paymentMethod ?? ""}
          onValueChange={(value) =>
            setPaymentMethod(value as "online" | "Cash")
          }
          className="my-4 font-bold"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Cash" id="Cash" />
            <Label htmlFor="Cash" className="cursor-pointer font-bold">
              Cash Payment
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="cursor-pointer font-bold">
              Online Payment
            </Label>
          </div>
        </RadioGroup>

        {/* Pay Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="
            mt-2
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            border
            border-gray-300
            px-7
            py-5
            font-bold
            duration-300
            hover:bg-black
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-70
            sm:w-auto
          "
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </form>
    </div>
  );
}
