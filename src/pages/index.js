import * as React from "react"
import Layout from "../components/Layout"
import HomeCanvas from "../components/homePage/HomeCanvas"
import HomeContent from "../components/homePage/HomeContent"
import About from "../components/homePage/About"
import Seo from "../components/seo"
import HorizontalScroll from "../components/HorizontalScroll"
import Services from "../components/Services"
import { useEffect } from "react"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import HomeOurClients from "../components/homePage/HomeOurClients"

const IndexPage = props => {
  const dispatch = useGlobalDispatchContext()
  const { isHomePage } = useGlobalStateContext()

  useEffect(() => {
    if (!isHomePage) {
      dispatch({ type: "IS_HOME_PAGE", value: true })
    }
  }, [])

  return (
    <Layout>
      <Seo
        title="Home"
        description="Proalfa Dynamic—turnkey industrial infrastructure and integrated EPC. Large-scale facilities from foundation to operations-ready assets."
      />
      <HomeCanvas />
      <HomeContent />
      {/* <Projects /> */}
      <About />
      <HomeOurClients />
      <HorizontalScroll />
      <Services />
    </Layout>
  )
}

export default IndexPage
