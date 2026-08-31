"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Inputs {
  email: string;
  newPassword: string;
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

      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      if (response.status === 200) {
        toast.success("The change was completed successfully");
        router.push("/login");
      }
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to change password"
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
          text-3xl
          font-bold
          text-green-500
          sm:p-7
          sm:text-4xl
        "
      >
        Change password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 pb-6 sm:mx-9 sm:px-0"
      >
        {/* Email */}
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

        {/* New Password */}
        <Input
          type="password"
          placeholder="Your New Password"
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
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.newPassword && (
          <p className="text-sm text-red-800">
            {errors.newPassword.message}
          </p>
        )}

        {/* Save */}
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
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
}
