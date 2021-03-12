"use strict"
import Link  from "next/link"
import React from "react"
import {
    Container,
    Nav,
    NavItem,
}            from "reactstrap"

const Layout = ({ children }) => (
    <div>
        <header>
            <Nav className="navbar navbar-dark bg-dark">
                <NavItem>
                    <Link href="/">
                        <a className="navbar-brand">Home</a>
                    </Link>
                </NavItem>

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
            </Nav>
        </header>

        <Container>
            {children}
        </Container>
    </div>
)

export default Layout
