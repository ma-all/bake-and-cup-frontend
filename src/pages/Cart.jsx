import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Cart = (props) => {
    const cartItem = props.cartItems
    const handlePlaceOrder = props.handlePlaceOrder

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    let totalPrice = 0;
    let totalCaffeine = 0;

    if (cartItem) {
        cartItem.forEach((item) => {
            totalPrice += Number(item.price) || 0;
            totalCaffeine += Number(item.caffeine) || 0;


        })
    }

    const onSubmit = async () => {
        if (!cartItem || cartItem.length === 0) {
            return setErrorMessage('You cart is emty')
        }

        setErrorMessage('')
        if (handlePlaceOrder) {
            await handlePlaceOrder(cartItem, totalPrice, totalCaffeine, navigate)

        }
    }
    const renderCartItem = () => {
        if (cartItem && cartItem.length > 0) {
            return cartItem.map((item) => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <p>{item.caffeine}</p>
                    <p>{item.price}</p>
                </div>
            ))
        }
        else {
            return <p>You cart is currently empty</p>
        }
    }


    return (
        <div>
            <div>
                {renderCartItem()}
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