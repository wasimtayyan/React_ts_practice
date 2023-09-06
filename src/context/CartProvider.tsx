import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

export type CartStateType = { cart: CartItemType[] }
const initCartState: CartStateType = { cart: [] }

export const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUNTATY",
    SUBMIT: "SUBMIT"
}
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reduce = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.paylode missing in ADD action')
            }
            const { sku, name, price } = action.payload
            const filterdItems: CartItemType[] = state.cart.filter((item) => item.sku !== sku)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)
            const qty = itemExists ? itemExists.qty + 1 : 1
            return { ...state, cart: [...filterdItems, { sku, name, price, qty }] }

        } break;
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.paylode missing  in REMOVE action')
            }
            const { sku } = action.payload
            const filterdItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return { ...state, cart: [...filterdItems] }

        } break;

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.paylode missing  in QUANTITY action')
            }
            const { sku, qty } = action.payload
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if (!itemExists) {
                throw new Error('Item not found')
            }
            const updatedCart: CartItemType = { ...itemExists, qty }

            const filterdItems: CartItemType[] = state.cart.filter((item) => item.sku !== sku)
            return { ...state, cart: [...filterdItems, updatedCart] }
        }
            break;
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        default:
            throw new Error("action type not find")
    }
}

const useCartContext = (initStat: CartStateType) => {
    const [state, dispatch] = useReducer(reduce, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.cart.reduce((previousValue, curent) => previousValue + curent.qty, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0))

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}
export type UseCartContextType = ReturnType<typeof useCartContext>

const initContextCart: UseCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: "",
    cart: []
}

export const cartContxt = createContext<UseCartContextType>(initContextCart)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <cartContxt.Provider value={useCartContext(initCartState)}>
            {children}
        </cartContxt.Provider>
    )
}
export default cartContxt