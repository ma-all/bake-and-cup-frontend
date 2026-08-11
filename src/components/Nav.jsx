import { Link } from "react-router"
import { LogOut, ShoppingBasket } from "lucide-react"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/">Bake & Cup</Link>
            {props.user ? (
                <>
                    <ul className="center-navbar">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to='/menu-items'>Menu</Link>
                        </li>
                        <li>
                            <Link to='/orders'>Orders</Link>
                        </li>
                    </ul>
                    <ul className="right-navbar">
                        <li >
                            <Link to='cart' class='cart-icon-container'>
                                <ShoppingBasket size={25} />
                                {props.cartItems.length > 0 && <span className="cart-icon">
                                    {props.cartItems.length}
                                </span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={handleSignOut}>
                                <LogOut size={24} />
                            </Link>
                        </li>
                    </ul>
                </>
            ) : (
                <ul className="right-navbar">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/sign-in'>Sign In</Link>
                    </li>
                </ul>
            )
            }

        </nav >
    )
}

export default Nav