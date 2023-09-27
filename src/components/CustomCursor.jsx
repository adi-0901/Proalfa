import React, { useRef, useEffect, useState } from "react"
import { Cursor } from "../styles/globalStyles"
import { useGlobalStateContext } from "../context/globalContext"

const CustomCursor = () => {

  const { cursorType: cType, isHomePage } = useGlobalStateContext()
  const [mouseCords, setMouseCords] = useState({
    top: -100,
    left: -100,
  })

  const scrollDeltaX = useRef(window.scrollX)
  const scrollDeltaY = useRef(window.scrollY)

  const cursorRef = useRef(null)

  const handleMouseMove = evt => {
    setMouseCords({
      left: evt.pageX,
      top: evt.pageY
    })
  }

  const handleScroll = () => {
    // Calculate the new mouse position considering scrolling
    //  https://stackoverflow.com/a/6728432
    // ChatGPT helped
    const deltaX =  window.scrollX - scrollDeltaX.current;
    const deltaY =  window.scrollY - scrollDeltaY.current;

    scrollDeltaX.current = window.scrollX
    scrollDeltaY.current = window.scrollY

    setMouseCords((oldCords) => ({
      left: oldCords.left + deltaX,
      top: oldCords.top + deltaY
    }))

  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener('scroll', handleScroll);    

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div>
      <Cursor
        ref={cursorRef}
        style={{
          left: mouseCords.left + 'px',
          top: mouseCords.top + 'px'
        }}
        className={cType}
        isHomePage={isHomePage}
      />
    </div>
  )
}

export default CustomCursor
