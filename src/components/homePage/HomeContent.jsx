import React, { useEffect, useRef } from "react"

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3M+", label: "Sq Ft Built" },
  { value: "5", label: "States" },
  { value: "10+", label: "Years of Execution" },
]

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
      { threshold: 0.15 },
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
        transform: "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const HomeContent = () => {
  return (
    <div className="bg-[#191919]">
      {/* Statement section */}
      <div className="border-t border-[#2a2a2a] px-10 md:px-20 pt-24 pb-20">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-8">
            What we do
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="md:text-[3.5rem] text-[2rem] font-bold leading-[1.05] text-[#e5e5e5] max-w-4xl">
            End-to-end industrial infrastructure—designed, engineered, and
            delivered under one roof.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 text-[#777] md:text-lg text-base leading-[1.7] max-w-xl">
            Proalfa Dynamic handles every interface—from earthworks and
            foundations to PEB erection, utilities, and handover. One team,
            one contract, zero coordination risk.
          </p>
        </FadeIn>
      </div>

      {/* Stats bar */}
      <div className="border-t border-[#2a2a2a]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div
                className="px-10 md:px-12 py-14 border-b md:border-b-0 border-r border-[#2a2a2a] last:border-r-0"
                style={{ borderRightColor: "#2a2a2a" }}
              >
                <p className="md:text-[3.5rem] text-[2.5rem] font-bold text-[#e5e5e5] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#555]">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeContent
