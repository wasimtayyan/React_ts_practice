import { useContext } from "react";
import productsContext from "../context/productProvider";
import { UseProductsContextType } from "../context/productProvider";

const useProducts = (): UseProductsContextType => {
    return useContext(productsContext)
}

export default useProducts