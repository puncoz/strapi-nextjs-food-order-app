"use strict"

import Link             from "next/link"
import { useRouter }    from "next/router"
import React, {
    useContext,
    useEffect,
    useState,
}                       from "react"
import {
    Button,
    FormGroup,
    Input,
    Label,
}                       from "reactstrap"
import AuthLayout       from "../components/AuthLayout"
import AppContext       from "../contexts/AppContext"
import { registerUser } from "../lib/auth"

const Register = () => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ email: "", username: "", password: "" })
    const { setUser, isAuthenticated } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/").then()
        }
    }, [])

    const handleOnChange = (event) => {
        const { name, value } = event.target

        setData(d => ({ ...d, [name]: value }))
    }

    const handleOnSubmit = async () => {
        setLoading(true)

        try {
            const { user } = await registerUser(data.username, data.email, data.password)

            setUser(user)
        } catch (e) {
            setErrors(e.response.data)
        }

        setLoading(false)
    }

    return (
        <AuthLayout errors={errors}>
            <fieldset disabled={loading}>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                        disabled={loading}
                        onChange={handleOnChange}
                        value={data.username}
                        type="text"
                        name="username"/>
                </FormGroup>

                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        disabled={loading}
                        onChange={handleOnChange}
                        value={data.email}
                        type="email"
                        name="email"/>
                </FormGroup>

                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        disabled={loading}
                        onChange={handleOnChange}
                        value={data.password}
                        type="password"
                        name="password"/>
                </FormGroup>

                <FormGroup className="action-buttons">
                    <div>
                        <Link href="/login">
                            <a>
                                <small>Login</small>
                            </a>
                        </Link>
                    </div>

                    <Button color="primary"
                            disabled={loading}
                            onClick={handleOnSubmit}>
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </FormGroup>
            </fieldset>
        </AuthLayout>
    )
}

export default Register
