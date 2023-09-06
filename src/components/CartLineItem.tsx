import { ChangeEvent, ReactElement, memo } from "react"
import { ReducerActionType, ReducerAction, CartItemType } from "../context/CartProvider"

interface PropsType {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType

}
const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType): ReactElement => {
    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

    const lineTotal: number = (item.price * item.qty)

    const highestQty: number = 20 > item.qty ? 20 : item.qty

    const optionValue: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValue.map(val => {
        return <option
            key={`opt${val}`}
            value={val}
        >{val}</option>
    })
    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: REDUCER_ACTIONS.QUANTITY, payload: { ...item, qty: Number(e.target.value) } })
    }

    const onRemove = () => {
        dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item })
    }
    return (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>
            <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.qty}
                aria-label="Item Quantity"
                onChange={onChangeQty}
            >{options}</select>
            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
            </div>
            <button
                className="cart__button"
                onClick={onRemove}
                aria-label="Remove Item From Cart"> ❌</button>
        </li>
    )
}
function areItemsEqul({ item: prevItme }: PropsType, { item: nextItme }: PropsType) {
    return Object.keys(prevItme).every(key => {
        return prevItme[key as keyof CartItemType] === nextItme[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqul)
export default MemoizedCartLineItem