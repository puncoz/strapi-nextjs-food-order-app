import fetch       from "isomorphic-fetch"
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
    const [cart, setCart] = useState({
        items: [],
        total: 0,
    })

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

    useEffect(() => {
        // restore cart from cookie, this could also be tracked in a db
        const cart = cookie.get("cart")

        // if items in cart, set items and total to state
        if (typeof cart === "string" && cart !== "undefined") {
            const cartData = JSON.parse(cart)
            const total = cartData.reduce((total, item) => total + item.price * item.quantity, 0)

            setCart({ items: cartData, total })
        }
    }, [])

    useEffect(() => {
        cookie.set("cart", JSON.stringify(cart.items))
    }, [cart])

    const addItemToCart = (item) => {
        // check for item already in cart
        // if not in cart, add item else if item is found increment quantity
        const itemExists = cart.items.find(i => i.id === item.id)

        if (!itemExists) {
            setCart(prevCart => ({
                items: [...prevCart.items, { ...item, quantity: 1 }],
                total: prevCart.total + item.price,
            }))

            return
        }

        setCart(
            prevCart => ({
                items: prevCart.items.map(i => {
                    if (i.id === item.id) {
                        return { ...i, quantity: i.quantity + 1 }
                    }

                    return i
                }),
                total: prevCart.total + item.price,
            }),
        )
    }

    const removeItemFromCart = (item) => {
        setCart(prevCart => {
            const items = prevCart.items
            const index = items.findIndex(i => i.id === item.id)

            items.splice(index, 1)

            const total = items.reduce((t, i) => t + (i.quantity * i.price), 0)

            return { items, total }
        })
    }

    const decreaseItemFromCart = (item) => {
        // check for item already in cart
        // if quantity is more then  in cart, subtract item else remove item
        const itemInCart = cart.items.find(i => i.id === item.id)

        if (!itemInCart) {
            return
        }

        if (itemInCart.quantity === 1) {
            removeItemFromCart(item)

            return
        }

        setCart(prevCart => ({
            items: prevCart.items.map(i => {
                if (i.id === item.id) {
                    return { ...i, quantity: item.quantity - 1 }
                }

                return i
            }),
            total: prevCart.total - item.price,
        }))
    }

    return (
        <AppContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                setUser,
                cart,
                addItemToCart,
                removeItemFromCart,
                decreaseItemFromCart,
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
