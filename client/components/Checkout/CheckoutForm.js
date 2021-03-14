"use strict"
import {
    useElements,
    useStripe,
}                     from "@stripe/react-stripe-js"
import React, {
    useContext,
    useState,
}                     from "react"
import {
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap"
import AppContext     from "../../contexts/AppContext"
import CreditCardForm from "./CreditCardForm"

const CheckoutForm = () => {
    const [data, setData] = useState({
        address: "",
        city: "",
        state: "",
        stripeId: "",
    })
    const [error, setError] = useState("")
    const stripe = useStripe()
    const stripeElements = useElements()
    const appContext = useContext(AppContext)

    const handleOnChange = (event) => {
        const { name, value } = event.target

        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const submitOrder = () => {

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
