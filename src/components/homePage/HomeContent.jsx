import React, { useEffect } from "react"
import { HomeContentContainer, ContentText } from "../../styles/homeStyles"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"

const HomeContent = () => {
  const animation = useAnimation()
  const [contentRef, isInView] = useInView({
    triggerOnce: true,
    rootMargin:
      (typeof window === "object" && window?.innerWidth) > 768
        ? "-200px"
        : "-50px",
  })

  useEffect(() => {
    if (isInView) {
      animation.start("visible")
    }
  }, [isInView, animation])

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
      </ContentText>
    </HomeContentContainer>
  )
}

export default HomeContent
