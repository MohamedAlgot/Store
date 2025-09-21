"use server";

import axios from "axios";

async function getAllBrand() {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    console.log(response.data);
    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
    };
  } catch (error) {
    console.log(error);
  }
}

export { getAllBrand };
