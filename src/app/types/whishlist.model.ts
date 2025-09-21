export interface BrandResponse {
  count: number;
  data: Product[];
  status: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brand: Brand;
  category: Category;
  subcategory: SubCategory[];
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
