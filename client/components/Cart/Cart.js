"use strict"

import Link                  from "next/link"
import React, { useContext } from "react"
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
}                            from "reactstrap"
import AppContext            from "../../contexts/AppContext"

const Cart = () => {
    const {
        cart,
        isAuthenticated,
        addItemToCart,
        removeItemFromCart,
    } = useContext(AppContext)

    return (
        <div className="cart">
            <Card>
                <CardTitle>Your Order:</CardTitle>
                <hr/>

                <CardBody>
                    <div>
                        <p>Items:</p>
                    </div>

                    <div className="items">
                        {cart.items.length ? cart.items.map((item) => (
                            <div className="item" key={item.id}>
                                <div>
                                    <span className="item-name">{item.name}</span> -
                                    <span className="item-price">${item.price}</span>
                                </div>

                                <div>
                                    <Button className="add-button" color="link" onClick={() => addItemToCart(item)}>
                                        +
                                    </Button>
                                    <Button className="remove-button" color="link" onClick={() => removeItemFromCart(item)}>
                                        -
                                    </Button>

                                    <span className="item-quantity">{item.quantity}x</span>
                                </div>
                            </div>
                        )) : (
                            <p>No items in cart</p>
                        )}
                    </div>

                    {isAuthenticated ? (cart.items.length ? (
                        <div className="total-wrapper">
                            <Badge color="light">
                                <span className="total-label">Total: </span>
                                <span className="total">${cart.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </Badge>

                            <div className="order-btn-wrapper">
                                <Link href="/checkout">
                                    <Button block={true} color="secondary">
                                        Order
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : "") : (
                        <h5>Login to order</h5>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}

export default Cart
