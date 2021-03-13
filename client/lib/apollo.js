"use strict"

import {
    ApolloClient,
    InMemoryCache,
}                     from "@apollo/client"
import { withApollo } from "next-apollo"
import { API_URL }    from "../config/app.config"

const apolloClient = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
