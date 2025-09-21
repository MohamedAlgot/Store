// Product inside the cart
interface CartProduct {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    ratingsAverage: number;
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
  };
  id: string; 
}

export interface Cartdata {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    totalCartPrice: number;
    createdAt: string;  // ISO date
    updatedAt: string;  // ISO date
    __v: number;
  };
}
