import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Cart = (props) => {
    // const cartItem = props.cartItems
    // const handlePlaceOrder = props.handlePlaceOrder

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    let totalPrice = 0
    let totalCaffeine = 0

    if (props.cartItems) {
        props.cartItems.forEach((item) => {
            totalPrice += Number(item.price) || 0
            totalCaffeine += Number(item.caffeine) || 0
        })
    }

    const onSubmit = async () => {
        if (!props.cartItems || props.cartItems.length === 0) {
            return setErrorMessage('You cart is emty')
        }

        setErrorMessage('')
        if (handlePlaceOrder) {
            await props.handlePlaceOrder(totalPrice, totalCaffeine, navigate)

        }
    }

    return (
        <div>
            <div class='cart-container'>
            {props.cartItems.map((item) => (
                <div key={item._id}>
                    <div className="img-container">
                        <img src={item.img} alt={item.name} className="menu-img" />
                    </div>
                    <p>{item.name}</p>
                </div>
            ))}
            </div>

            <div>
                <p>Total Caffeine {totalCaffeine}</p>
                <p>Total Price {totalPrice.toFixed(2)} BHD</p>

                {errorMessage && <p>{errorMessage}</p>}

                <Link to="/menu-items">Add more item</Link>
                <button onClick={onSubmit}>Place Order</button>
            </div>

        </div>
    )
}

export default Cart;