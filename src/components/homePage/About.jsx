import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useGlobalDispatchContext } from "../../context/globalContext"

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = 1
          el.style.transform = "translateY(0)"
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const About = () => {
  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType =>
    dispatch({ type: "CURSOR_TYPE", value: typeof cursorType === "string" ? cursorType : null })

  return (
    <div className="bg-[#191919] border-t border-[#2a2a2a]">
      <div className="px-10 md:px-20 py-24">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-8">
            About Proalfa Dynamic
          </p>
        </FadeIn>

        <div className="flex flex-col md:flex-row md:gap-20 gap-12">
          {/* Left: big statement */}
          <div className="md:w-1/2">
            <FadeIn delay={0.1}>
              <h2 className="md:text-[2.5rem] text-[1.75rem] font-bold text-[#e5e5e5] leading-[1.1]">
                Proalfa Dynamic is an end-to-end turnkey industrial
                infrastructure developer—delivering integrated EPC from
                concept to commissioning.
              </h2>
            </FadeIn>
          </div>

          {/* Right: body + link */}
          <div className="md:w-1/2 flex flex-col justify-between gap-10">
            <FadeIn delay={0.18}>
              <p className="text-[#777] text-lg leading-[1.75]">
                We design, engineer, and build large-scale industrial
                facilities—PEB, civil and RCC, utilities, warehousing, and
                sustainable systems—under single-point accountability. Our
                focus is speed, quality, and lifecycle value for manufacturing,
                logistics, energy, and heavy industrial clients across India.
              </p>
            </FadeIn>

            <FadeIn delay={0.26}>
              <Link
                to="/about-us"
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={setCursor}
                className="group inline-flex items-center gap-3 text-[#e5e5e5] text-base font-medium border-b border-[#444] pb-1 hover:border-white transition-colors duration-300"
              >
                Our story
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
