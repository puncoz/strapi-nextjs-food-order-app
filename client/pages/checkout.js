"use strict"
import { Elements }          from "@stripe/react-stripe-js"
import { loadStripe }        from "@stripe/stripe-js/pure"
import React, { useContext } from "react"
import {
    Col,
    Container,
    Row,
}                            from "reactstrap"
import { Cart }              from "../components/Cart"
import { CheckoutForm }      from "../components/Checkout"
import { STRIPE_KEY }        from "../config/app.config"
import AppContext            from "../contexts/AppContext"

const Checkout = () => {
    const { isAuthenticated, cart } = useContext(AppContext)

    // load stripe to inject into elements components
    const stripe = loadStripe(STRIPE_KEY)

    return (
        <Container className="checkout-page">
            <Row>
                <Col sm="12">
                    <h1>Checkout</h1>
                </Col>
            </Row>
            <Row>
                <Col className="cart-wrapper" sm={{ size: 4, order: 1 }}>
                    <Cart checkout={true}/>
                </Col>

                {isAuthenticated && cart.items.length ? (
                    <Col className="checkout-wrapper" sm={{ size: 6, order: 2 }}>
                        <Elements stripe={stripe}>
                            <CheckoutForm/>
                        </Elements>
                    </Col>
                ) : ""}
            </Row>
        </Container>
    )
}

export default Checkout
