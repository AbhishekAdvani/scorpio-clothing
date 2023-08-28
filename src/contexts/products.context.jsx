import { createContext, useState } from "react";

import PRODUCTS from "../components/shop-data.json";

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  console.log(value, "value");

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};
