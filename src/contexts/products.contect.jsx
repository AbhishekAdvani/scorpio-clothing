import { createContext, useState } from "react";

import PRODUCTS from "../../src/components/shop-data.json";

export const ProductContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  console.log(value, "value");

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
