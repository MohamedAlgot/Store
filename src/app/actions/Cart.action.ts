"use server";

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

async function getUserCart() {
  const token = await getUserToken();

  console.log(token, "tokeeen");

  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "cart");

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

async function getAddproduct(productId: string) {
  const token = await getUserToken();


  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId
      },
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "add to cart");

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

async function removeproduct(productId: string) {
  const token = await getUserToken();


  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
 
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "add to cart");

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


async function UpdateProduct(productId: string,count:number) {
  const token = await getUserToken();


  try {
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},
    
 
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response.data, "add to cart");

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

export { getUserCart, getAddproduct,removeproduct,UpdateProduct };
