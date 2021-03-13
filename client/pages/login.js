"use strict"

import Link          from "next/link"
import { useRouter } from "next/router"
import React, {
    useContext,
    useEffect,
    useState,
}                    from "react"
import {
    Button,
    FormGroup,
    Input,
    Label,
}                    from "reactstrap"
import AuthLayout    from "../components/AuthLayout"
import AppContext    from "../contexts/AppContext"
import { login }     from "../lib/auth"

const Login = () => {
    const [data, setData] = useState({
        identifier: "", password: "",
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false)
    const router = useRouter()
    const { isAuthenticated, setUser } = useContext(AppContext)

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
            const { user } = await login(data.identifier, data.password)

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
                        value={data.identifier}
                        type="text"
                        name="identifier"/>
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
                        <Link href="/forget-password">
                            <a>
                                <small>Forget Password?</small>
                            </a>
                        </Link>
                    </div>

                    <Button color="primary"
                            disabled={loading}
                            onClick={handleOnSubmit}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </FormGroup>
            </fieldset>
        </AuthLayout>
    )
}

export default Login
