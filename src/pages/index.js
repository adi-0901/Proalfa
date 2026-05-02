import * as React from "react"
import { useEffect } from "react"
import Layout from "../components/Layout"
import IntroLoader from "../components/IntroLoader"
import HomeCanvas from "../components/homePage/HomeCanvas"
import HomeContent from "../components/homePage/HomeContent"
import About from "../components/homePage/About"
import Seo from "../components/seo"
import HorizontalScroll from "../components/HorizontalScroll"
import OrbitalSection from "../components/OrbitalSection"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import HomeOurClients from "../components/homePage/HomeOurClients"

import Services from "../components/Services"

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
      <IntroLoader />
      <Seo
        title="Home"
        path="/"
        description="Proalfa Dynamic — Pune's turnkey industrial EPC developer. We design, build and deliver large-scale industrial facilities across Maharashtra and India."
        keywords="warehouse construction company in Pune, warehouse builder in Pune, warehouse contractor Pune, industrial warehouse construction Pune, godown construction Pune, godown builder Pune, godown contractor Pune, logistics warehouse construction Pune, turnkey industrial project contractor Pune, turnkey warehouse construction Pune, turnkey factory construction Pune, end to end industrial construction Pune, complete industrial project contractor Pune, MIDC construction contractor Pune, industrial construction company Maharashtra, warehouse construction Chakan, warehouse construction Talegaon, warehouse construction Ranjangaon, factory construction Pune district, industrial construction Maharashtra, steel structure warehouse Pune, steel structure factory Pune, prefabricated warehouse Pune, steel building construction Pune"
      />
      <HomeCanvas />
      <HomeContent />
      {/* <Projects /> */}
      <About />
      <HomeOurClients />
      <HorizontalScroll />
      <div className="hidden md:block">
        <OrbitalSection />
      </div>
      <Services />
    </Layout>
  )
}

export default IndexPage
