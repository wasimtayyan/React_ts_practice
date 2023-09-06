type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {

    const Button = viewCart ? <button onClick={() => setViewCart(false)}>View Producte</button>
        : <button onClick={() => setViewCart(true)}>View Cart</button>

    const Content = (
        <nav className="nav">
            {Button}
        </nav>
    )
    return Content
}

export default Nav