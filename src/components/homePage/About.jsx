import React, { useState, useEffect } from "react"
import {
  AboutContainer,
  AboutText,
  AboutAccordion,
  ServiceHead,
  ServiceList,
} from "../../styles/homeStyles"
import { serviceList } from "../../content/videoList"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import { useGlobalDispatchContext } from "../../context/globalContext"
import { Link } from "gatsby"
import AnimatedText from "../AnimatedText"

const About = () => {
  const [shouldExpand, setShouldExpand] = useState(0)

  const animation = useAnimation()
  const [aboutRef, isInView] = useInView({
    triggerOnce: true,
    rootMargin: (typeof window === 'object' && window?.innerWidth > 768) ? "-200px" : "-50px",
  })

  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    console.log('cursor!')
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  useEffect(() => {
    if (isInView) {
      animation.start("visible")
    }
  }, [isInView])

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
        <div className="about-text-head">
          <p>
          Proalfa Dynamic Pre-Engineered Building (PEB) solution are tailormade to fit the customer's needs and requirements.
          </p>
        </div>
        <div className="about-text-foot">
          {/* <p>
            We offer complete solution from concept to implementation. This mode of construction uses standard section and connection, 
            reducing design time significantly. PEB's are flexible enough to suit different building dimensions as they are expandable, 
            resistant to harsh climatic conditions and come with maintenance-free exteriors
          </p> */}
          <AnimatedText
            className={'w-full h-full flex items-center justify-center mt-10'} 
            text={`We offer complete solution from concept to implementation. This mode of construction uses standard section and connection, reducing design time significantly. PEB's are flexible enough to suit different building dimensions as they are expandable, resistant to harsh climatic conditions and come with maintenance-free exteriors`}
          />
        </div>
        <Link
          to="/about-us"
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={setCursor}
        >
          <div 
            className="about-text-foot primary-color"
          >
            <p style={{fontSize: '24px'}}>
              Know More          
            </p>
          </div>
        </Link>
      </AboutText>
      <AboutAccordion>
        <div className="accordion-head">Services</div>
        {serviceList.map(service => (
          <div
            className="service"
            key={service.id}
            onClick={() => toggleExpand(service.id)}
          >
            <ServiceHead >
              <div className="arrow">
                <span id="span-one"></span>
                <span id="span-two"></span>
              </div>
              <p className="service-title">{service.title}</p>
            </ServiceHead>
            {/* <ServiceList expand={shouldExpand === service.id}>
              <ul>
                {service.results.map(result => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </ServiceList> */}
          </div>
        ))}
      </AboutAccordion>
    </AboutContainer>
  )
}

export default About
