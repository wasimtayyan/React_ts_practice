import { ReactElement, createContext, useState, } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

const initState: ProductType[] = [
    {
        "sku": "item0001",
        "name": "Widget",
        "price": 9.99
    },
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
    }
]
export type UseProductsContextType = { products: ProductType[] }

const initProductsState: UseProductsContextType = {
    products: []
}

export const productsContext = createContext<UseProductsContextType>(initProductsState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {

    const [products] = useState<ProductType[]>(initState)

    return (
        <productsContext.Provider value={{ products }}>
            {children}
        </productsContext.Provider>
    )
}
export default productsContext