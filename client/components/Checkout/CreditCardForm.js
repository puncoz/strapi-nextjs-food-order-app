"use strict"

import { CardElement } from "@stripe/react-stripe-js"
import React           from "react"

const CreditCardForm = ({ submitOrder, stripeError }) => (
    <div>
        <div>
            <label htmlFor="card-element">Credit or debit card</label>

            <div>
                <fieldset>
                    <div className="form-row">
                        <div id="card-element" style={{ width: "100%" }}>
                            <CardElement options={{
                                style: { base: { fontSize: "18px" } },
                            }}/>
                        </div>

                        <div className="order-button-wrapper">
                            <button onClick={submitOrder}>Confirm Order</button>
                        </div>

                        {stripeError ? (
                            <div>{stripeError.toString()}</div>
                        ) : null}

                        <div id="card-errors" role="alert"/>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
)

export default CreditCardForm
