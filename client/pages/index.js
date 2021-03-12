import React, { useState } from "react"
import {
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
}                          from "reactstrap"
import { RestaurantList }  from "../components/Restaurant"

const Home = () => {
    const [query, setQuery] = useState("")

    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupAddon addonType="append">Search</InputGroupAddon>
                            <Input onChange={e => setQuery(e.target.value.toLocaleLowerCase())}
                                   value={query}/>
                        </InputGroup>
                    </div>

                    <RestaurantList search={query}/>
                </Col>
            </Row>
        </div>
    )
}

export default Home
