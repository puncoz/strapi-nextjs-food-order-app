"use strict"
import {
    gql,
    useQuery,
}                  from "@apollo/client"
import Link        from "next/link"
import React       from "react"
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row,
}                  from "reactstrap"
import { API_URL } from "../../config/app.config"

const QUERY = gql`
    {
        restaurants {
            id
            name
            description
            image {
                url
            }
        }
    }
`

const RestaurantList = ({ search }) => {
    const { loading, error, data } = useQuery(QUERY)

    if (error) {
        return "Error loading restaurants"
    }

    if (loading) {
        return (
            <h1>Fetching...</h1>
        )
    }

    const restaurants = data.restaurants

    if (!restaurants || restaurants.length === 0) {
        return (
            <h5>Add Restaurants</h5>
        )
    }

    const filtered = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(search))

    if (filtered.length === 0) {
        return (
            <h1>No Restaurants Found.</h1>
        )
    }

    return (
        <Row className="restaurants-list">
            {filtered.map((restaurant) => (
                <Col xs="6" sm="4" key={restaurant.id}>
                    <Card>
                        <CardImg top={true}
                                 src={`${API_URL}${restaurant.image.url}`}/>

                        <CardBody>
                            <CardTitle>
                                <Link href={`/restaurants/${restaurant.id}`}>
                                    <a>
                                        {restaurant.name}

                                    </a>
                                </Link>
                            </CardTitle>

                            <CardText>{restaurant.description}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default RestaurantList
