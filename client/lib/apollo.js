"use strict"

import {
    ApolloClient,
    InMemoryCache,
}                     from "@apollo/client"
import { withApollo } from "next-apollo"

export const API_URL = process.env.NEXT_PUBLIC_API_URL

const apolloClient = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
