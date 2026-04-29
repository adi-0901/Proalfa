import React, {
  useState,
  useEffect,
  useLayoutEffect as useRealLayoutEffect,
  useRef,
} from "react"
import { motion, AnimatePresence } from "framer-motion"
import logoIcon from "../assets/images/logo-icon.png"

const curtainEase = [0.76, 0, 0.24, 1]

// useLayoutEffect is not available in SSR — fall back to useEffect on the server
const useLayoutEffect =
  typeof window !== "undefined" ? useRealLayoutEffect : useEffect

const IntroLoader = () => {
  const [iconVisible, setIconVisible] = useState(false)
  // Always start as true so the SSR HTML includes the curtain, preventing FOUC
  const [curtainVisible, setCurtainVisible] = useState(true)
  const skipAnim = useRef(false)

  // Runs synchronously before the first browser paint.
  // For returning visitors this dismisses the curtain instantly — no flash.
  useLayoutEffect(() => {
    const isDev = process.env.NODE_ENV === "development"
    if (!isDev && sessionStorage.getItem("proalfa_intro")) {
      skipAnim.current = true
      setCurtainVisible(false)
    }
  }, [])

  useEffect(() => {
    if (!curtainVisible) return

    const isDev = process.env.NODE_ENV === "development"
    if (!isDev) sessionStorage.setItem("proalfa_intro", "1")
    document.body.style.overflow = "hidden"

    const t1 = setTimeout(() => setIconVisible(true), 100)
    const t2 = setTimeout(() => setIconVisible(false), 1900)
    const t3 = setTimeout(() => setCurtainVisible(false), 2200)

    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <>
      {/* Icon — simple fade + scale, no clipping */}
      <AnimatePresence>
        {iconVisible && (
          <motion.div
            key="icon"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              x: "160%",
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <img
              src={logoIcon}
              alt="Proalfa Dynamic"
              draggable={false}
              style={{
                width: "clamp(64px, 10vw, 110px)",
                userSelect: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* White curtain — plain div, slides straight up */}
      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = ""
        }}
      >
        {curtainVisible && (
          <motion.div
            key="curtain"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              backgroundColor: "#ffffff",
              willChange: "transform",
            }}
            exit={
              skipAnim.current
                ? { y: "-100%", transition: { duration: 0 } }
                : { y: "-100%", transition: { duration: 1.0, ease: curtainEase } }
            }
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default IntroLoader
