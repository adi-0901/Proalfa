import React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import { AnimatePresence } from "framer-motion"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>
}

// https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/
export const wrapPageElement = ({ element, props }) => {
  return (
    <AnimatePresence mode="wait">
      <React.Fragment key={props.location.pathname}>{element}</React.Fragment>
    </AnimatePresence>
  )
}

export const shouldUpdateScroll = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
  return false
}
