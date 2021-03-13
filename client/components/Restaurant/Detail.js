"use strict"

import React       from "react"
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
}                  from "reactstrap"
import { API_URL } from "../../config/app.config"

const RestaurantDetail = ({ restaurant }) => (
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
                            <Button outline color="primary">
                                + Add to cart
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
            ))}

            {!restaurant.dishes.length && (
                <Col xs="6" sm="4">
                    <p>No dishes found.</p>
                </Col>
            )}
        </Row>
    </div>
)

export default RestaurantDetail
