import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { UseProductsContextType } from "../context/productProvider"
import { ReactElement } from "react"
import Product from "./Product"

const ProductList = () => {

    const { products } = useProducts()
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()

    let pageContent: ReactElement | ReactElement[] = <p>Loading....</p>

    if (products?.length) {
        pageContent = products.map(product => {
            const inCart: boolean = cart.some(item => item.sku === product.sku)

            return (
                <Product
                    key={product.sku}
                    inCart={inCart}
                    product={product}
                    dispatch={dispatch}
                    REDUCER_ACTIONS={REDUCER_ACTIONS}
                />
            )
        })
    }
    return (
        <main className="main main--products">
            {pageContent}
        </main>
    )
}

export default ProductList