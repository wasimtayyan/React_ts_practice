import useCart from "../hooks/useCart"
import CartLineItem from "./CartLineItem"
import { useState } from "react"

const Cart = () => {
    const [confirm, setConfirm] = useState(false)
    const { dispatch, REDUCER_ACTIONS, cart, totalItems, totalPrice } = useCart()

    const onSubmit = () => {
        dispatch({ type: REDUCER_ACTIONS.SUBMIT })
        setConfirm(true)
    }
    const pageContent = confirm ? <h2>Thank you for your order.</h2>
        : (<>
            <h2 className="offscreen">Cart</h2>
            <ul className="cart">
                {cart.map(item => {
                    return <CartLineItem
                        key={item.sku}
                        item={item}
                        dispatch={dispatch}
                        REDUCER_ACTIONS={REDUCER_ACTIONS}
                    />
                })}
            </ul>
            <div className="cart__totals">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice}</p>
                <button className="cart__submit"
                    disabled={!totalItems}
                    onClick={onSubmit}
                >Place order</button>
            </div>
        </>)
    return (
        <main className="main main--cart">
            {pageContent}
        </main>
    )
}

export default Cart