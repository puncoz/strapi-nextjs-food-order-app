"use strict"

import Link        from "next/link"
import React, {
    Fragment,
    useContext,
}                  from "react"
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardTitle,
}                  from "reactstrap"
import { API_URL } from "../../config/app.config"
import AppContext  from "../../contexts/AppContext"

const Cart = ({ checkout }) => {
    const {
        cart,
        addItemToCart,
        removeItemFromCart,
        decreaseItemFromCart,
        isAuthenticated,
    } = useContext(AppContext)

    return (
        <div className="cart">
            <Card>
                <CardTitle>Your Order:</CardTitle>
                <hr/>

                <CardBody>
                    {cart.items.length ? (
                        <div>
                            <p>Items:</p>
                        </div>
                    ) : ""}

                    <div className="items">
                        {cart.items.length ? cart.items.map((item) => (
                            <div className="item" key={item.id}>
                                <Button className="close" onClick={() => removeItemFromCart(item)}>x</Button>

                                <div className="item-image">
                                    <img src={`${API_URL}${item.image.url}`} alt={item.id}/>
                                </div>

                                <div className="item-details">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-description">{item.description}</p>

                                    <div className="quantity-price-wrapper">
                                        <div className="quantity-btn">
                                            <Button className="minus" onClick={() => decreaseItemFromCart(item)}>
                                                -
                                            </Button>

                                            <span className="item-quantity">{item.quantity}</span>

                                            <Button className="plus" onClick={() => addItemToCart(item)}>
                                                +
                                            </Button>
                                        </div>

                                        <div className="item-price">
                                            x ${item.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p>No items in cart.</p>
                        )}
                    </div>

                    {cart.total ? (
                        <Fragment>
                            <div className="total-wrapper">
                                <Badge color="light">
                                    <span className="total-label">Total: </span>
                                    <span className="total">${cart.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </Badge>
                            </div>

                            <div className="order-btn-wrapper">
                                {checkout ? (isAuthenticated ? "" : (
                                    <Link href="/login">
                                        <Button block={true} color="secondary">
                                            Login to checkout
                                        </Button>
                                    </Link>
                                )) : (
                                    <Link href="/checkout">
                                        <Button block={true} color="secondary">
                                            Checkout
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Fragment>
                    ) : ""}
                </CardBody>
            </Card>
        </div>
    )
}

export default Cart
