"use strict"
import Link       from "next/link"
import React, {
    Fragment,
    useContext,
}                 from "react"
import {
    Container,
    Nav,
    NavItem,
}                 from "reactstrap"
import AppContext from "../contexts/AppContext"
import { logout } from "../lib/auth"

const Layout = ({ children }) => {
    const { user, setUser } = useContext(AppContext)

    return (
        <div>
            <header>
                <Nav className="navbar navbar-dark bg-dark">
                    <NavItem>
                        <Link href="/">
                            <a className="navbar-brand">Home</a>
                        </Link>
                    </NavItem>

                    {user ? (
                        <Fragment>
                            <NavItem className="ml-auto">
                                <h5>{user.username}</h5>
                            </NavItem>

                            <NavItem>
                                <Link href="/">
                                    <a className="nav-link"
                                       onClick={async () => {
                                           await logout()
                                           setUser(null)
                                       }}>
                                        Logout
                                    </a>
                                </Link>
                            </NavItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <NavItem className="ml-auto">
                                <Link href="/login">
                                    <a className="nav-link">Sign In</a>
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link href="/register">
                                    <a className="nav-link">Sign Up</a>
                                </Link>
                            </NavItem>
                        </Fragment>
                    )}
                </Nav>
            </header>

            <Container>
                {children}
            </Container>
        </div>
    )
}

export default Layout
