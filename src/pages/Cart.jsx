import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Cart = (props) => {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const groupCartItems = props.cartItems ? props.cartItems.reduce((amount, item) => {
        const current = amount.find((amtItem) => 
        amtItem._id === item._id)
        if (current) {
            current.quantity += 1
        } else {
            amount.push({...item, quantity: 1})
        }
        return amount
    }, []) : []

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
            return setErrorMessage('You cart is empty')
        }

        setErrorMessage('')
        if (props.handlePlaceOrder) {
            await props.handlePlaceOrder(totalPrice, totalCaffeine, navigate)

   setErrorMessage('')
  if (props.handlePlaceOrder) {
    await props.handlePlaceOrder(totalPrice, totalCaffeine, navigate)
  }
  

        // if (handlePlaceOrder) {
        //     await props.handlePlaceOrder(totalPrice, totalCaffeine, navigate)

        // }
    }

    return (
        <div className="cart-page">
            <div className='cart-container'>
                <div className="cartItems-titles">
                    <p>Product</p>
                    <p>Price</p>
                    <p>Quantity</p>
                </div>
                {groupCartItems.map((item) => (
                    <div key={item._id} className="cart-items">
                        <div className="cart-items-left">
                            <div className="img-container">
                                <img src={item.img} alt={item.name} className="cart-img" />
                            </div>
                            <p>{item.name}</p>
                        </div>
                        <p>{(Number(item.price) * item.quantity).toFixed(2)} BHD</p>
                        <div className="quantity-item">
                            <button onClick={() => props.handleDeleteItem(item._id)}> - </button>
                            <p>{item.quantity}</p>
                            <button onClick={() => props.handleAddToCart(item)}> + </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-total">
                <h2>{props.user.username}'s Cart</h2>
                <p>Total Items: {props.cartItems ? props.cartItems.length : 0}</p>
                <p>Total Caffeine {totalCaffeine}</p>
                <p>Total Price {totalPrice.toFixed(2)} BHD</p>
                
                {errorMessage && <p>{errorMessage}</p>}

                <div className="cart-link-button">
                    <button onClick={() => navigate('/menu-items')}>Add more items </button>

                    <button onClick={() => navigate('/checkout')}>Place Order</button>
                </div>
            </div>

        </div>
    )
}

export default Cart