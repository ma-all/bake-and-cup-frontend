import { loadStripe } from "@stripe/stripe-js"
import { Elements, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as orderService from '../services/orderService'

const stripeTest = loadStripe('pk_test_51U2oSv1BBbV4XQC4I2Pv75fjSNqTwTO0NhNeLQlHpks9blzWr2Qyx7vn7ASCawmaByN9gy4fHktU8hLHVOVUxSkA00STtcPe7K')

const StripeForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()

    const [orderProcessing, setOrderProcessing] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements)
            return

        setOrderProcessing(true)
        
        const processed = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })

        if (processed.error) {
            console.log('Failed to process')
            setOrderProcessing(false)
        } else {
            props.onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={orderProcessing || !stripe}>
                {orderProcessing ? 'Order Processing..' : 'Pay'}
            </button>
        </form>
    )
}

const Checkout = (props) => {

    const [paymentMethod, setPaymentMethod] = useState('cash')

    const [orderPlaced, setOrderPlaced] = useState(false)

    const [orderCreatedId, setOrderCreatedId] = useState(null)

    const [clientSecret, setClientSecret] = useState('')

    const navigate = useNavigate()

    const totalItems = props.cartItems ? props.cartItems.length : 0

    const totalPrice = props.cartItems ? props.cartItems.reduce((total, item) => 
    total + (Number(item.price) || 0), 0) : 0

    const totalCaffeine = props.cartItems ? props.cartItems.reduce((total, item) => 
    total + (Number(item.caffeine) || 0), 0) : 0

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const clientData = await orderService.createPayment(totalPrice)
                setClientSecret(clientData.clientSecret)
            } catch (error) {
                console.log('No client data', error)
            }
        }

        if (paymentMethod === 'online' && totalPrice > 0) {
            getClientSecret()
        }
    }, [paymentMethod, totalPrice])

    const orderCompleted = async () => {
        const newOrder = await props.handlePlaceOrder(totalPrice, totalCaffeine, paymentMethod)

        if (newOrder && newOrder._id) {
            setOrderCreatedId(newOrder._id)
        }
        setOrderPlaced(true)
    }

    //this should only show if the user pays and it goes trough
    if (orderPlaced) {
        return (
            <>
                <h2>Order Placed.</h2>

                <button onClick={() => navigate(`/orders/${orderCreatedId}`)}>
                    View Order Details
                </button>
            </>
        )
    }

    return (
        <>
            <h2>Checkout</h2>
            <br/>
            <h3>Order Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Items: {totalPrice.toFixed(2)} BHD</p>
            <br/>

            <h3>Choose Payment MEthod:</h3>

            Cash on Delivery
            <input type='radio' name='payment' value='cash' checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />

            Online Payment (Stripe)
            <input type='radio' name='payment' value='online' checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />

            {paymentMethod === 'cash' && (
                <button onClick={orderCompleted}> Confirm Order</button>
            )}

            {paymentMethod === 'online' && clientSecret && (
                <Elements stripe={stripeTest} options={{ clientSecret }}>
                    <StripeForm onSuccess={orderCompleted} />
                </Elements>
            )}

        </>
    )
}

export default Checkout