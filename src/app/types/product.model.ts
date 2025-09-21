export interface products {
  sold: number;
  images: string[];
  subcategory: cat[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: category;
  brand: category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface cat {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
