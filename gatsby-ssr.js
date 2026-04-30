const React = require("react")
const { GlobalProvider } = require("./src/context/globalContext")

exports.wrapRootElement = ({ element }) => {
  return <GlobalProvider>{element}</GlobalProvider>
}

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // DNS prefetch for any future external resources
    <link key="dns-self" rel="dns-prefetch" href="https://www.proalfa.in" />,
    // Tell the browser the logo SVG in the header is important (it's the LCP)
    <link
      key="preload-logo"
      rel="preload"
      as="image"
      href="/static/logo_white.svg"
      type="image/svg+xml"
    />,
  ])
}
