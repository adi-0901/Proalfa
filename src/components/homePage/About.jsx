import React, { useState, useEffect } from "react"
import {
  AboutContainer,
  AboutText,
  AboutAccordion,
  ServiceHead,
} from "../../styles/homeStyles"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import { useGlobalDispatchContext } from "../../context/globalContext"
import { Link } from "gatsby"
import AnimatedText from "../AnimatedText"
import { serviceList } from "../../constants"

const About = () => {
  const [shouldExpand, setShouldExpand] = useState(0)

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

  const toggleExpand = id => {
    console.log(id)
    setShouldExpand(shouldExpand === id ? -1 : id)
  }

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
      <AboutText>
        <div className="about-text-head border-r border-[#444] mr-3.5">
          <p>
            Proalfa Dynamic Pre-Engineered Building (PEB) solution are
            tailormade to fit the customer's needs and requirements.
          </p>
        </div>
        <div className="about-text-foot font-normal leading-6 text-[#ababab]">
          {/* <p>
            We offer complete solution from concept to implementation. This mode of construction uses standard section and connection, 
            reducing design time significantly. PEB's are flexible enough to suit different building dimensions as they are expandable, 
            resistant to harsh climatic conditions and come with maintenance-free exteriors
          </p> */}

          <div className="flex flex-col gap-4 items-start">
            <AnimatedText
                className={"w-full h-full flex items-center justify-center max-w-[1000px] font-normal"}
                text={`We're on a mission to improve the quality of Pre-Engineered buildings in India. We will provide customized designs and implement them with perfect care. The quality is assured at each stage of production and it is based on strict values. We offer complete solution from concept to implementation. This mode of construction uses standard section and connection, reducing design time significantly. PEB's are flexible enough to suit different building dimensions as they are expandable, resistant to harsh climatic conditions and come with maintenance-free exteriors`}
              />
              {/* <AnimatedText
                className={"w-full h-full flex items-center justify-center mt-10"}
                text={`We offer complete solution from concept to implementation. This mode of construction uses standard section and connection, reducing design time significantly. PEB's are flexible enough to suit different building dimensions as they are expandable, resistant to harsh climatic conditions and come with maintenance-free exteriors`}
              /> */}
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
      {/* <AboutAccordion>
        <div className="accordion-head">Services</div>
        {serviceList.map(service => (
          <div
            className="service"
            key={service.id}
            onClick={() => toggleExpand(service.id)}
          >
            <ServiceHead>
              <div className="arrow">
                <span id="span-one"></span>
                <span id="span-two"></span>
              </div>
              <p className="service-title">{service.title}</p>
            </ServiceHead>
          </div>
        ))}
      </AboutAccordion> */}
    </AboutContainer>
  )
}

export default About
