import React, { useRef, useEffect, useState } from "react"
import { Cursor } from "../styles/globalStyles"
import { useGlobalStateContext } from "../context/globalContext"

const CustomCursor = () => {
  const { cursorType: cType, isHomePage } = useGlobalStateContext()
  const [mouseCords, setMouseCords] = useState({
    top: -100,
    left: -100,
  })

  const scrollDeltaX = useRef(0)
  const scrollDeltaY = useRef(0)

  const cursorRef = useRef(null)

  const handleMouseMove = evt => {
    setMouseCords({
      left: evt.pageX,
      top: evt.pageY,
    })
  }

  const handleScroll = () => {
    const deltaX = window.scrollX - scrollDeltaX.current
    const deltaY = window.scrollY - scrollDeltaY.current

    scrollDeltaX.current = window.scrollX
    scrollDeltaY.current = window.scrollY

    setMouseCords(oldCords => ({
      left: oldCords.left + deltaX,
      top: oldCords.top + deltaY,
    }))
  }

  useEffect(() => {
    if (window.innerWidth < 768) return

    document.addEventListener("mousemove", handleMouseMove, {passive: true})
    document.addEventListener("scroll", handleScroll, {passive: true})

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
          left: mouseCords.left + "px",
          top: mouseCords.top + "px",
        }}
        className={`${cType} md:block hidden`}
        isHomePage={isHomePage}
      />
    </div>
  )
}

export default CustomCursor
