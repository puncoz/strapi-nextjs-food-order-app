"use strict"

import axios         from "axios"
import cookie        from "js-cookie"
import Router        from "next/router"
import { useEffect } from "react"
import { API_URL }   from "../config/app.config"

export const registerUser = async (username, email, password) => {
    // prevent function from being run on the server
    if (typeof window === "undefined") {
        return
    }

    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/local/register`, { username, email, password })

            // set the token response from strapi for server validation
            cookie.set("token", data.jwt)

            // resolve the promise to set loading to false in signup form
            resolve(data)

            // redirect back to home page for restaurant selection
            await Router.push("/")
        } catch (e) {
            // reject the promise and pass the error object back to the form
            reject(e)
        }
    })
}

export const login = async (identifier, password) => {
    // prevent function from being run on the server
    if (typeof window === "undefined") {
        return
    }

    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/local`, { identifier, password })

            // set the token response from strapi for server validation
            cookie.set("token", data.jwt)

            // resolve the promise to set loading to false in signup form
            resolve(data)

            // redirect back to home page for restaurant selection
            await Router.push("/")
        } catch (e) {
            // reject the promise and pass the error object back to the form
            reject(e)
        }
    })
}

export const logout = async () => {
    // remove token and user cookie
    cookie.remove("token")

    delete window.__user

    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now().toString())

    // redirect to the home page
    await Router.push("/")
}

// Higher order component to wrap our pages and logout simultaneously logged in tabs
export const withAuthSync = (Component) => {
    const Wrapper = (props) => {
        const syncLogout = async (event) => {
            if (event.key === "logout") {
                await Router.push("/")
            }
        }

        useEffect(() => {
            window.addEventListener("storage", syncLogout)

            return () => {
                window.removeEventListener("storage", syncLogout)
                window.localStorage.removeItem("logout")
            }
        }, [])

        return (
            <Component {...props}/>
        )
    }

    if (Component.getInitialProps) {
        Wrapper.getInitialProps = Component.getInitialProps
    }

    return Wrapper
}
