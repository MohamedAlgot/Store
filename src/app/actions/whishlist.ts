"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";


async function getWhishlist() {
  const token = await getUserToken();

  console.log(token, "tokeeen");

  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "whishlist");

    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status,
        message: error?.response?.data.message || "An Error Occured",
      };
    }
  }
}


async function AddWhishlist(productId:string) {
  const token = await getUserToken();

  console.log(token, "tokeeen");

  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",{productId},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "whishlist");

    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status,
        message: error?.response?.data.message || "An Error Occured",
      };
    }
  }
}

async function removeWhishlist(productId: string) {
  const token = await getUserToken();
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
 
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "removeremove");

    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status,
        message: error?.response?.data.message || "An Error Occured",
      };
    }
  }
}


export{
    getWhishlist,AddWhishlist,removeWhishlist
}