import React, { forwardRef, useEffect, useRef } from "react"
import Lottie from "lottie-react"

// const MyInput = forwardRef(function MyInput(props, ref) {

const LottieMedia = forwardRef(function LottieMedia(
  {
    externalRef = true,
    autoplay = true,
    loop = false,
    className,
    animationData,
    interactivity = undefined,
    onMouseOver,
    animateOnHover,
    width,
    height,
    onClick,
    onLoadedImages,
    onDivSizeChange,
    style,
  },
  ref,
) {
  const internalRef = useRef()

  const handleMouseOver = () => {
    if (typeof onMouseOver === "function") onMouseOver()
    if (animateOnHover && !externalRef) {
      internalRef.current.goToAndPlay(0)
    }
  }

  const divRef = useRef(null)

  useEffect(() => {}, [divRef])

  // Start observing the element when the component is mounted
  useEffect(() => {
    const element = divRef?.current

    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      // 👉 Do something when the element is resized
      if (typeof onDivSizeChange === "function") onDivSizeChange(element)
    })

    observer.observe(element)
    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect()
    }
  }, [divRef])

  return (
    <div
      className={className}
      onMouseEnter={handleMouseOver}
      onClick={onClick}
      ref={divRef}
      style={style}
    >
      <Lottie
        lottieRef={externalRef ? ref : internalRef}
        animationData={animationData}
        autoplay={autoplay}
        loop={loop}
        interactivity={interactivity}
        width={width}
        height={height}
        onLoadedImages={() =>
          typeof onLoadedImages === "function" && onLoadedImages()
        }
      />
    </div>
  )
})

export default LottieMedia
