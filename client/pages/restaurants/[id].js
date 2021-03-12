"use strict"
import {
    gql,
    useQuery,
}                           from "@apollo/client"
import { useRouter }        from "next/router"
import React                from "react"
import { RestaurantDetail } from "../../components/Restaurant"

const QUERY = gql`
    query ($id: ID!) {
        restaurant(id: $id) {
            id
            name
            description
            image {
                url
            }
            dishes {
                id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }
`

const RestaurantDetailPage = () => {
    const router = useRouter()
    const { id } = router.query

    const { loading, error, data } = useQuery(QUERY, {
        variables: { id },
    })

    if (error) {
        return "Error loading restaurant detail."
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (!data.restaurant) {
        return (
            <h1>No restaurant information.</h1>
        )
    }

    const { restaurant } = data

    return (
        <RestaurantDetail restaurant={restaurant}/>
    )
}

export default RestaurantDetailPage
