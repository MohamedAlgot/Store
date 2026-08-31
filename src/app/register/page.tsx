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
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  async function onSubmit(values: Inputs) {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (response?.data?.message === "success") {
        toast.success("Account created successfully");

        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Registration failed";

        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 pb-6 sm:mx-9 sm:px-0"
        >
          {/* Name */}
          <Input
            type="text"
            placeholder="Your Name"
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
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-800">
              {errors.name.message}
            </p>
          )}

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

          {/* Password */}
          <Input
            type="password"
            placeholder="Your Password"
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-800">
              {errors.password.message}
            </p>
          )}

          {/* Re Password */}
          <Input
            type="password"
            placeholder="Your Re Password"
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
            {...register("rePassword", {
              required: "RePassword is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {errors.rePassword && (
            <p className="text-sm text-red-800">
              {errors.rePassword.message}
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

          {/* Register Button */}
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
