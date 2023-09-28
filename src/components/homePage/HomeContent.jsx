import React, { useEffect } from "react"
import { HomeContentContainer, ContentText } from "../../styles/homeStyles"

import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"
import MobileSidebar from "../MobileSidebar"

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
        <p className="text-xl">
          We're on a mission to improve the quality of Pre-Engineered buildings
          in India. We will provide customized designs and implement them with
          perfect care. The quality is assured at each stage of production and
          it is based on strict values.
        </p>
      </ContentText>
    </HomeContentContainer>
  )
}

export default HomeContent
