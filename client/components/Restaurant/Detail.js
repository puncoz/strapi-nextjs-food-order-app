"use strict"

import React, { useContext } from "react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row,
}                            from "reactstrap"
import { API_URL }           from "../../config/app.config"
import AppContext            from "../../contexts/AppContext"
import { Cart }              from "../Cart"

const RestaurantDetail = ({ restaurant }) => {
    const { addItemToCart } = useContext(AppContext)

    return (
        <div className="restaurant-detail">
            <Row>
                <Col xs="6" sm="2">
                    <img className="img-thumbnail" src={`${API_URL}${restaurant.image.url}`} alt={restaurant.name}/>
                </Col>
                <Col>
                    <h1>{restaurant.name}</h1>

                    <p className="description">{restaurant.description}</p>
                </Col>
            </Row>

            <h2>Dishes</h2>

            <Row>
                <Col xs="6" sm="9">
                    <Row>
                        {restaurant.dishes.map((dish) => (
                            <Col xs="6" sm="4" key={dish.id}>
                                <Card>
                                    <CardImg top={true}
                                             src={`${API_URL}${dish.image.url}`}/>

                                    <CardBody>
                                        <CardTitle>{dish.name}</CardTitle>

                                        <CardText>{dish.description}</CardText>
                                    </CardBody>

                                    <CardFooter>
                                        <Button outline color="primary" onClick={() => addItemToCart(dish)}>
                                            + Add to cart
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        ))}

                        {!restaurant.dishes.length && (
                            <p>No dishes found.</p>
                        )}
                    </Row>
                </Col>

                <Col xs="3">
                    <Cart/>
                </Col>
            </Row>
        </div>
    )
}

export default RestaurantDetail
