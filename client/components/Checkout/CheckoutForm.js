"use strict"
import {
    CardElement,
    useElements,
    useStripe,
}                     from "@stripe/react-stripe-js"
import fetch          from "isomorphic-fetch"
import cookies        from "js-cookie"
import { useRouter }  from "next/router"
import React, {
    useContext,
    useState,
}                     from "react"
import {
    Form,
    FormGroup,
    Input,
    Label,
}                     from "reactstrap"
import { API_URL }    from "../../config/app.config"
import AppContext     from "../../contexts/AppContext"
import CreditCardForm from "./CreditCardForm"

const DEFAULT_FORM = {
    address: "",
    city: "",
    state: "",
    stripeId: "",
}

const CheckoutForm = () => {
    const [data, setData] = useState(DEFAULT_FORM)
    const [error, setError] = useState("")
    const stripe = useStripe()
    const stripeElements = useElements()
    const { cart, isAuthenticated, clearCart } = useContext(AppContext)
    const router = useRouter()

    const handleOnChange = (event) => {
        const { name, value } = event.target

        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const clearData = () => {
        setData(DEFAULT_FORM)
        clearCart()
    }

    const submitOrder = async (event) => {
        event.preventDefault()

        if (!isAuthenticated) {
            return
        }

        if (!data.address || !data.city || !data.state) {
            setError("Please complete the form.")
            return
        }

        const cardElement = stripeElements.getElement(CardElement)

        // // Pass the Element directly to other Stripe.js methods:
        // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
        // get token back from stripe to process credit card
        const stripeResponse = await stripe.createToken(cardElement)
        if (stripeResponse.error) {
            setError(stripeResponse.error.message)
            return
        }

        const userToken = cookies.get("token")

        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: userToken && {
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                amount: Number(Math.round(cart.total) + "e2") + "e-2",
                dishes: cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                stripe_token: stripeResponse.token.id,
                payment: stripeResponse.token,
            }),
        })

        if (!response.ok) {
            setError(response.statusText)
        }

        // OTHER stripe methods you can use depending on app
        // // or createPaymentMethod - https://stripe.com/docs/js/payment_intents/create_payment_method
        // stripe.createPaymentMethod({
        //   type: "card",
        //   card: cardElement,
        // });

        // // or confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
        // stripe.confirmCardPayment(paymentIntentClientSecret, {
        //   payment_method: {
        //     card: cardElement,
        //   },
        // });

        clearData()
        await router.push("/")
    }

    return (
        <div className="checkout-form">
            <div className="paper">
                <h5>Your Information:</h5>
                <hr/>

                <Form>
                    <FormGroup>
                        <div>
                            <Label>Address</Label>
                            <Input name="address" value={data.address} onChange={handleOnChange}/>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div>
                            <Label>City</Label>
                            <Input name="city" value={data.city} onChange={handleOnChange}/>
                        </div>

                        <div>
                            <Label>State</Label>
                            <Input name="state" value={data.state} onChange={handleOnChange}/>
                        </div>
                    </FormGroup>

                    <CreditCardForm data={data} stripeError={error} submitOrder={submitOrder}/>
                </Form>
            </div>
        </div>
    )
}

export default CheckoutForm
