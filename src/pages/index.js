import * as React from "react"
import Layout from "../components/Layout"
import HomeCanvas from "../components/homePage/HomeCanvas"
import HomeContent from "../components/homePage/HomeContent"
import Projects from "../components/Projects"
import About from "../components/homePage/About"
import Footer from "../components/Footer"
import Seo from "../components/seo"
import HorizontalScroll from "../components/HorizontalScroll"

const IndexPage = props => {
  return (
    <Layout>
      <Seo title="Home" />
      <HomeCanvas />
      <HomeContent />
      {/* <Projects /> */}
      <About />
      <HorizontalScroll />
    </Layout>
  )
}

export default IndexPage
