import { useContext } from "react";
import cartContxt from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

const useCart = (): UseCartContextType => {
    return useContext(cartContxt)
}

export default useCart