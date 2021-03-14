"use strict"
import Link       from "next/link"
import React, {
    Fragment,
    useContext,
}                 from "react"
import {
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavItem,
    UncontrolledDropdown,
}                 from "reactstrap"
import AppContext from "../contexts/AppContext"
import { logout } from "../lib/auth"

const Layout = ({ children }) => {
    const { user, setUser, cart } = useContext(AppContext)

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <Link href="/">
                        <a className="navbar-brand">
                            Home
                        </a>
                    </Link>

                    <Nav navbar>
                        {cart.items.length ? (
                            <NavItem className="cart-notification">
                                <Link href="/checkout">
                                    <a className="nav-link">
                                    <span className="ic-cart">
                                        <i>{cart.items.length}</i>
                                    </span>
                                    </a>
                                </Link>
                            </NavItem>
                        ) : ""}

                        {user ? (
                            <Fragment>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav>
                                        <img className="avatar" src={`https://ui-avatars.com/api/?name=${user.username}`} alt={user.username}/>
                                    </DropdownToggle>

                                    <DropdownMenu right>
                                        <div className="dropdown-item">
                                            {user.username}
                                        </div>

                                        <DropdownItem divider/>
                                        <Link href="/">
                                            <a className="dropdown-item"
                                               onClick={async () => {
                                                   await logout()
                                                   setUser(null)
                                               }}>
                                                Logout
                                            </a>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <NavItem>
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
                </Container>
            </Navbar>

            <Container>
                {children}
            </Container>
        </div>
    )
}

export default Layout
