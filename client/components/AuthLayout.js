"use strict"

import React from "react"
import {
    Col,
    Container,
    Form,
    Row,
}            from "reactstrap"

const AuthLayout = ({ children, errors }) => (
    <Container className="login-register-page">
        <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
                <div className="paper">
                    <div className="header">
                        <img src="https://strapi.io/assets/strapi-logo-dark.svg" alt="strapi"/>
                    </div>

                    <div className="wrapper">
                        {Object.entries(errors).length && errors.constructor === Object ? errors.message.map((error) => (
                            <div className="errors" key={error.messages[0].id}
                                 style={{ marginBottom: 10 }}>
                                <small>
                                    {error.messages[0].message}
                                </small>
                            </div>
                        )) : ""}

                        <Form>
                            {children}
                        </Form>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
)

export default AuthLayout
