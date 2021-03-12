import Head                from "next/head"
import React, { Fragment } from "react"
import Layout              from "../components/Layout"
import "../styles/styles.scss"

const MyApp = ({ Component, pageProps }) => (
    <Fragment>
        <Head>
            <title>Food Ordering App</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <script src="https://js.stripe.com/v3"/>
            <link rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                  crossOrigin="anonymous"/>
        </Head>

        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Fragment>
)

export default MyApp
