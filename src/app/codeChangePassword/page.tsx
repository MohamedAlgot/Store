"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { isAxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CodechangePassword() {
  interface Inputs {
    resetCode: string;
  }
  const [errorcode, seterrorcode] = useState(" ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  async function onSubmit(values: Inputs) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      if (response.statusText === "OK") {
        router.push("changePassword");
        seterrorcode(" ");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      seterrorcode("This code is wrong");
    }

    console.log(values);
  }

  return (
    <div className=" w-1/2 mx-auto shadow-2xl my-10 pb-5 rounded-xl">
      <h2 className="font-bold text-2xl text-green-500 text-start p-7">
        reset your account password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-9">
        <Input
          type="text"
          placeholder="Enter the code"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
                   focus:border-green-500  focus:shadow-green-300 border-gray-300 "
          {...register("resetCode", { required: "Code is required" })}
        />
        {errors.resetCode && <p className="text-red-800 my-3">{errors.resetCode.message}</p>}

        {errorcode === " " ? (
          errorcode
        ) : (
          <p className="text-center font-bold  my-2 text-red-600">
            {errorcode}
          </p>
        )}

        <Button
          type="submit"
          className="px-7 py-5 duration-300 hover:bg-green-500  cursor-pointer hover:text-white border-1   border-gray-300 font-bold"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
