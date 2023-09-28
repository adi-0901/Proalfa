import React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import { AnimatePresence } from "framer-motion"
import './src/styles/global.css'

export const wrapRootElement = ({ element }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <GlobalProvider>{element}</GlobalProvider>
    </AnimatePresence>
  )
}

// https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/
export const wrapPageElement = ({ element }) => {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
}

export const shouldUpdateScroll = () => {

  window.scrollTo({
    top:0,
    left:0,
    behavior: 'smooth'
  })
  return false
}