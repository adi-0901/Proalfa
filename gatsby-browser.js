import React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import SmoothScrollProvider from "./src/components/SmoothScrollProvider"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalProvider>
      <SmoothScrollProvider>{element}</SmoothScrollProvider>
    </GlobalProvider>
  )
}

export const wrapPageElement = ({ element }) => element

export const shouldUpdateScroll = () => {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true })
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0 })
  }
  return false
}
