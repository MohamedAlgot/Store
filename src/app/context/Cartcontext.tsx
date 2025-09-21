import { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from "../actions/Cart.action";
import { log } from "console";
import { Cartdata } from "../types/cart.model";
import { getWhishlist } from "../actions/whishlist";
import { BrandResponse } from "../types/whishlist.model";

interface carttype {
  CartDetails: Cartdata | null;
  whishlist: BrandResponse | null;
  getCartDetails: () => Promise<void>;
  setCartDetails: (cart: Cartdata | null) => void;
  setwhishlist: (cart: BrandResponse | null) => void;
  getWhishlistDetails: () => Promise<void>;
}

const CartContext = createContext<carttype>({
  CartDetails: null,
  whishlist: null,
  getCartDetails: async () => {},
  setCartDetails: () => {},
  setwhishlist: () => {},
  getWhishlistDetails: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [CartDetails, setCartDetails] = useState<Cartdata | null>(null);
  const [whishlist, setwhishlist] = useState<BrandResponse | null>(null);

  async function getWhishlistDetails() {
    const response = await getWhishlist();
    setwhishlist(response?.data);
  }

  async function getCartDetails() {
    const response = await getUserCart();

    console.log(response?.data, "tttttttttttttttttt");

    setCartDetails(response?.data);
  }

  useEffect(() => {
    getCartDetails();
    getWhishlistDetails();
  }, []);

  return (
    <CartContext.Provider
      value={{
        setCartDetails,
        setwhishlist,
        CartDetails,
        whishlist,
        getCartDetails,
        getWhishlistDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function UseCart() {
  const mycontext = useContext(CartContext);

  return mycontext;
}
