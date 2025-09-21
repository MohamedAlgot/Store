"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {  useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePassword() {
  interface Inputs {
    email: string;
    newPassword: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
        
      );
          toast.success(<p className="text-green-600">{"The change was completed successfully"}</p>);

      if (response.statusText === "OK") {
        router.push("login");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }

  return (
    <div className=" w-1/2 mx-auto shadow-2xl my-10 pb-5 rounded-xl">
      <h2 className="font-bold text-4xl text-green-500 text-start p-7">
        Change password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-9">
        <Input
          type="email"
          placeholder="Your Email"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
                   focus:border-green-500  focus:shadow-green-300 border-gray-300 "
          {...register("email", { required: "Email is required" })}
        />

        <Input
          type="password"
          placeholder="Your New Password"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
                   focus:border-green-500  focus:shadow-green-300 border-gray-300 "
          {...register("newPassword", { required: "newPassword is required" })}
        />

        {errors.newPassword && <p className="text-red-800">{errors.newPassword.message}</p>}

        <Button
          type="submit"
          className="px-7 py-5 duration-300 hover:bg-green-500  cursor-pointer hover:text-white border-1   border-gray-300 font-bold"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
