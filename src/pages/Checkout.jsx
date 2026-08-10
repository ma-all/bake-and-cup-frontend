import { loadStripe } from "@stripe/stripe-js"
import { Elements, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"

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

const Checkout = () => {
    return (
        <>
        </>
    )
}

export default Checkout