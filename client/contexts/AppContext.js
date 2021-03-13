"use strict"
import React, { createContext } from "react"

// Set backup default for isAuthenticated if none is provided in Provider
const AppContext = createContext({ isAuthenticated: false })

export default AppContext
