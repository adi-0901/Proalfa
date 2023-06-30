import React, { forwardRef, useEffect, useRef } from 'react'
import Lottie from 'lottie-react';

// const MyInput = forwardRef(function MyInput(props, ref) {

const LottieMedia = forwardRef(
  function LottieMedia({ externalRef=true, autoplay=true, loop=false, className, 
    animationData, interactivity=undefined, onMouseOver, animateOnHover, 
    width, height, onClick, onLoadedImages, onDivRef},ref)  {

  const internalRef = useRef()

  const handleMouseOver = () => {
    if(typeof onMouseOver === 'function') onMouseOver()
    if(animateOnHover && !externalRef) {
      internalRef.current.goToAndPlay(0)
    }
  }

  const divRef = useRef(null)

  useEffect(() => {
    if(typeof onDivRef === 'function') onDivRef(divRef.current)
  }, [divRef])

  return (
    <div className={className} onMouseEnter={handleMouseOver} onClick={onClick} ref={divRef}>
        <Lottie 
          lottieRef={externalRef ? ref : internalRef}
          animationData={animationData} 
          autoplay={autoplay}
          loop={loop}
          interactivity={interactivity}
          width={width}
          height={height}
          onLoadedImages={() => typeof onLoadedImages === 'function' && onLoadedImages()}
        />
    </div>
  )
  }
)


export default LottieMedia