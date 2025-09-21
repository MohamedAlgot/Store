"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { isAxiosError } from "axios";
import { log } from "console";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  interface Inputs {
    email: string;
    password: string;
  }
  const [errorlogin, seterrorlogin] = useState(" ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  async function onSubmit(values: Inputs) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(response);
      if (response?.ok === true) {
        router.push("/");
        seterrorlogin(" ");
      } else if (response?.ok === false) {
        seterrorlogin("Invalid email or password. Please try again.");

      }

    } catch (error) {
      console.log(error);
    }

    console.log(values);
  }

  return (
    <div className=" w-1/2 mx-auto shadow-2xl my-10 pb-5 rounded-xl">
      <h2 className="font-bold text-4xl text-green-500 text-start p-7">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-9">
        <Input
          type="email"
          placeholder="Your Email"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 p-5 my-3
                   focus:border-green-500  focus:shadow-green-300 border-gray-300 "
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}

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

        {errorlogin ===" "?errorlogin :<p className="text-center font-bold  my-2 text-red-600">{errorlogin}</p>}
        <Button
          type="submit"
          className="px-7 py-5 duration-300 hover:bg-green-500  cursor-pointer hover:text-white border-1   border-gray-300 font-bold"
        >
          Login
        </Button>

        <Link href="forgetpassword">

          <p className="my-2 font-bold text-blue-800  underline-offset-5 ">Forget Passowrd ?</p> 

        </Link>
      </form>
    </div>
  );
}
