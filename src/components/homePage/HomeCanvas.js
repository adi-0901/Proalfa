import React, { useRef } from "react"
import {
  Banner,
  Video,
  Canvas,
  BannerTitle,
  Headline,
} from "../../styles/homeStyles"

const HomeCanvas = () => {
  const canvas = useRef(null)
  const videoRef = useRef(null)

  const headlineParent = {
    initial: { y: 800 },
    animate: { y: 0, transition: { staggerChildren: 0.2 } },
  }
  const headlineAnimate = {
    initial: { y: 800 },
    animate: {
      y: 0,
      x: 20,
      transition: { duration: 1, ease: [0.6, 0.05, -0.01, 0.9] },
    },
  }

  return (
    <div>
      <Banner exit={{ opacity: 0, transition: { duration: 0.2 } }}>
        <Video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.6, 0.05, -0.01, 0.9],
          }}
          exit={{ opacity: 0 }}
        >
          <video
            ref={videoRef}
            src={require("../../assets/video/sequence_hq.mp4").default}
            autoPlay
            loop
            muted
          ></video>
        </Video>
        <Canvas ref={canvas} />
        <BannerTitle
          variants={headlineParent}
          initial="initial"
          animate="animate"
        >
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85]"
          >
            BUILT STRONG
          </Headline>
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85]"
          >
            TO BUILD STRONGEST
          </Headline>
        </BannerTitle>
      </Banner>
    </div>
  )
}

export default HomeCanvas
