import { useEffect } from "react"

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    let lenis
    let rafId

    const init = async () => {
      const { default: Lenis } = await import("lenis")

      lenis = new Lenis({
        duration: 1.25,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      // Expose globally so gatsby-browser shouldUpdateScroll can use it
      window.__lenis = lenis

      const raf = time => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.destroy()
        window.__lenis = null
      }
    }
  }, [])

  return children
}

export default SmoothScrollProvider
