import React, { forwardRef, useRef } from 'react'
import Lottie from 'lottie-react';

// const MyInput = forwardRef(function MyInput(props, ref) {

const LottieMedia = forwardRef(
  function LottieMedia({ externalRef=true, autoplay=true, loop=false, className, 
    animationData, interactivity=undefined, onMouseOver, animateOnHover, 
    width, height, onClick, onLoadedImages},ref)  {

const internalRef = useRef()

const handleMouseOver = () => {
  if(typeof onMouseOver === 'function') onMouseOver()
  if(animateOnHover && !externalRef) {
    internalRef.current.goToAndPlay(0)
  }
}

return (
  <div className={className} onMouseEnter={handleMouseOver} onClick={onClick}>
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