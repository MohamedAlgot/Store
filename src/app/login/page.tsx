"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
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

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log(response);

      if (response?.ok) {
        toast.success("Login successful");

        router.push("/");
        router.refresh();
      } else {
        toast.error("Invalid email or password");
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
        max-w-xl
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
        Login
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 pb-6 sm:px-9 sm:pb-8"
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
            focus-visible:ring-0
            focus-visible:ring-offset-0
            focus:shadow-green-300
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
            focus-visible:ring-0
            focus-visible:ring-offset-0
            focus:shadow-green-300
          "
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="text-sm text-red-800">
            {errors.password.message}
          </p>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="
            mt-3
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* Forget Password */}
        <Link href="/forgetpassword">
          <p
            className="
              my-3
              font-bold
              text-blue-800
              underline-offset-4
              hover:underline
            "
          >
            Forget Password?
          </p>
        </Link>
      </form>
    </div>
  );
}
