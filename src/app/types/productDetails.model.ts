export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // id of category
}

export interface IProductDetails {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: unknown; // if you have review interface you can replace `any[]`
  brand: IBrand;
  category: ICategory;
  subcategory: ISubCategory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
