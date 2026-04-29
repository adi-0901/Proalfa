import React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>
}

export const wrapPageElement = ({ element }) => {
  return element
}

export const shouldUpdateScroll = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
  return false
}
