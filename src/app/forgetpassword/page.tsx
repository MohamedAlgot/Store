"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Inputs {
  email: string;
}

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  async function onSubmit(values: Inputs) {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      if (response.status === 200) {
        toast.success("Verification code sent successfully");

        router.push("/codeChangePassword");
      }
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "This email is not registered"
        );
      } else {
        toast.error("Something went wrong");
      }
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
          text-2xl
          font-bold
          text-green-500
          sm:p-7
          sm:text-3xl
        "
      >
        Please enter your email
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 pb-6 sm:mx-9 sm:px-0"
      >
        <Input
          type="email"
          placeholder="Your Email"
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
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <p className="text-sm text-red-800">
            {errors.email.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="
            mt-2
            flex
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
            hover:bg-green-500
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </div>
  );
}
