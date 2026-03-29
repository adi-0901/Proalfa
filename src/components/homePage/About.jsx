import React, { useEffect } from "react"
import { AboutContainer, AboutText } from "../../styles/homeStyles"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import { useGlobalDispatchContext } from "../../context/globalContext"
import { Link } from "gatsby"
import AnimatedText from "../AnimatedText"
const About = () => {
  const animation = useAnimation()
  const [aboutRef, isInView] = useInView({
    triggerOnce: true,
    rootMargin:
      typeof window === "object" && window?.innerWidth > 768
        ? "-200px"
        : "-50px",
  })

  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  useEffect(() => {
    if (isInView) {
      animation.start("visible")
    }
  }, [isInView, animation])

  return (
    <AboutContainer
      ref={aboutRef}
      animate={animation}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: -150 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.2 },
        },
      }}
      exit="exit"
    > 
      <AboutText className="flex-col lg:flex-row ">
        <div className="about-text-head border-[#444] mr-4 pr-3.5 border-r-transparent lg:border-r-white">
          <p>
            Proalfa Dynamic is an end-to-end turnkey industrial infrastructure
            developer—delivering integrated EPC from concept to
            commissioning.
          </p>
        </div>
        <div className="about-text-foot w-[40vw] font-normal leading-6 text-[#ababab]">
          <div className="flex flex-col gap-4 items-start">
              <AnimatedText
                className={"w-full h-full flex items-center justify-center font-normal"}
                text={`We design, engineer, and build large-scale industrial facilities—PEB, civil and RCC, utilities, warehousing, and sustainable systems—under single-point accountability. Our focus is speed, quality, and lifecycle value for manufacturing, logistics, energy, and heavy industrial clients across India.`}
              />
         
            <Link
              to="/about-us"
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <div className="mb-0 primary-color">
                <p style={{ fontSize: "18px" }}>Know More</p>
              </div>
            </Link>
            </div>
        </div>
      </AboutText>
    </AboutContainer>
  )
}

export default About
