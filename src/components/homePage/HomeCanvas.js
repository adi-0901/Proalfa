import React, { useEffect, useRef, useState } from "react"
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
  const [videoSource, setVideoSource] = useState(null);

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

  useEffect(() => {
    const setSourceBasedOnScreenSize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        // Set video source for smaller screens
        setVideoSource(
          require('../../assets/video/homepage_video_mobile.mp4').default);
      } 
      else {
        // Set video source for larger screens
        setVideoSource(require('../../assets/video/homepage_video.mp4').default)
      }
    };

    // Initial setup
    setSourceBasedOnScreenSize();

    // Listen for screen size changes
    window.addEventListener('resize', setSourceBasedOnScreenSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', setSourceBasedOnScreenSize);
    };
  }, []);

  return (
    <div className="w-screen overflow-hidden">
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
            src={videoSource}
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
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
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85] lg:ml-20"
          >
            BUILT STRONG
          </Headline>
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen break-w lg:text-[5rem] text-[3rem] lg:leading-[0.76] leading-[0.85] lg:ml-20"
          >
            TO BUILD STRONGEST
          </Headline>
          <Headline
            variants={headlineAnimate}
            className="lg:w-auto w-screen lg:text-[1.15rem] text-[0.95rem] font-normal normal-case lg:ml-20 mt-2 lg:mt-4 max-w-xl text-white/90"
          >
            End-to-end turnkey industrial infrastructure developer
          </Headline>
        </BannerTitle>
      </Banner>
    </div>
  )
}

export default HomeCanvas
