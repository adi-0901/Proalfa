import React from "react"
import PropTypes from "prop-types"
import CustomCursor from "./CustomCursor"
import { GlobalStyle } from "../styles/globalStyles"
import { ThemeProvider } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import { ToastContainer } from "react-toastify"

// gatsby hates randomness
// https://spectrum.chat/gatsby-js/general/random-value-at-build-time~0dfc465a-c52a-45de-97e3-f9380a1c0cf6
// const pastelColors = [
//   'aquamarine', 'blueviolet', 'coral', 'cornflowerblue','lightcoral',
//   'lightpink','lightsalmon','lightseagreen','lightpink','lightseagreen',
//   'mediumslateblue','mediumturquoise','palevioletred','tomato'
// ]
// const randomPrimaryColor = pastelColors[Math.round(Math.random() * pastelColors.length)]

const universalTheme = {
  red: "crimson",
}

const darkTheme = {
  name: "dark",
  background: "#191919",
  color: "#ffffff",
  ...universalTheme,
}
const lightTheme = {
  name: "light",
  background: "#fff",
  color: "#000",
  ...universalTheme,
}

const Layout = ({ children, hideFooter }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  // const { currentTheme } = useGlobalStateContext()

  return (
    <ThemeProvider
      theme={{
        current: darkTheme,
        anti: lightTheme,
        // current: currentTheme === "dark" ? darkTheme : lightTheme,
        // anti: currentTheme === "dark" ? lightTheme : darkTheme,
      }}
    >
      <div className="overflow-hidden">
        <GlobalStyle />
        <CustomCursor />
        <Header />
        <main className="overflow-hidden">{children}</main>
        {!hideFooter && <Footer />}
        <ToastContainer />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
