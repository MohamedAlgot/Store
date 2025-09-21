"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }
  const [Iserror, Setiserror] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      Setiserror(null);
      console.log(response);
      if (response?.data?.message === "success") {
        router.push("./login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        Setiserror(error.response?.data.message);
      }
    }
  }
  return (
    <>      <div className=" w-1/2 mx-auto shadow-2xl my-10 pb-5 rounded-xl">
        <h2 className="font-bold text-4xl text-green-500 text-start p-7">
          Register
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
            {...register("name", { required: "Passowrd is required" })}
          />
          {errors.name && <p className="text-red-800">{errors.name.message}</p>}

          <Input
            type="email"
            placeholder="Your Email"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-800">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Your Passowrd"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("password", { required: "Passowrd is required" })}
          />
          {errors.password && (
            <p className="text-red-800">{errors.password.message}</p>
          )}
          <Input
            type="password"
            placeholder="Your Re passowrd"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300 "
            {...register("rePassword", { required: "RePassword is required" })}
          />
          {errors.rePassword && (
            <p className="text-red-800">{errors.rePassword.message}</p>
          )}

          <Input
            type="tel"
            placeholder="Your Phone"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
             focus:border-green-500  focus:shadow-green-300 border-gray-300"
            {...register("phone", { required: "phone is required" })}
          />
          {errors.phone && (
            <p className="text-red-800">{errors.phone.message}</p>
          )}
          <Button
            type="submit"
            className="px-7 py-5 duration-300 hover:bg-green-500  cursor-pointer hover:text-white border-1   border-gray-300 font-bold"
          >
            Register
          </Button>
        </form>
      </div>

    </>
  );
}
