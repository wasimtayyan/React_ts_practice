import { ProductType } from "../context/productProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo } from "react"

interface PropsType {
    inCart: boolean,
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType

}

const Product = ({ inCart, product, dispatch, REDUCER_ACTIONS }: PropsType): ReactElement => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAdd = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } })

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    return (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAdd}>Add to cart</button>
        </article>
    )
}
function areItemsEqule({ product: preProduct, inCart: preInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return (
        Object.keys(preProduct).every(key => {
            return preProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
        }) && preInCart === nextInCart
    )
}

const MemoizedProduct = memo<typeof Product>(Product, areItemsEqule)
export default MemoizedProduct