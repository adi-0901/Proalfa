import React, { useEffect } from "react"
import { HomeContentContainer, ContentText } from "../../styles/homeStyles"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"

const HomeContent = () => {
  const animation = useAnimation()
  const [contentRef, isInView] = useInView({
    triggerOnce: true,
    rootMargin: "-200px",
  })

  useEffect(() => {
    if (isInView) {
      animation.start("visible")
    }
  }, [isInView])

  return (
    <HomeContentContainer>
      <ContentText
        ref={contentRef}
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
        We're is on a mission to improve the quality of Pre-Engineered buildings in India. 
        We will provide customized designs and implement them with perfect care. 
        The quality is assured at each stage of production and it is based on strict values.
      </ContentText>
    </HomeContentContainer>
  )
}

export default HomeContent
