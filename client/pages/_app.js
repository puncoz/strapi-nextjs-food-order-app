import cookie      from "js-cookie"
import Head        from "next/head"
import React, {
    useEffect,
    useState,
}                  from "react"
import Layout      from "../components/Layout"
import { API_URL } from "../config/app.config"
import AppContext  from "../contexts/AppContext"
import withApollo  from "../lib/apollo"
import "../styles/styles.scss"

const MyApp = ({ Component, pageProps }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // grab the token from cookie
        const token = cookie.get("token")

        if (token) {
            // authenticate the token on the server and place set user object
            fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async (res) => {
                // if response comes back not valid, token is not valid
                // delete the token and log the user out on client
                if (!res.ok) {
                    cookie.remove("token")
                    setUser(null)

                    return
                }

                const user = await res.json()
                setUser(user)
            })
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                setUser,
            }}>
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
        </AppContext.Provider>
    )
}

export default withApollo({ ssr: true })(MyApp)
