import React, { useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

const CAPABILITIES = [
  {
    number: "01",
    title: "PEB Structures",
    sub: "Large-span pre-engineered steel built for industrial duty cycles",
  },
  {
    number: "02",
    title: "Civil & RCC",
    sub: "Foundations, slabs, and supporting infrastructure coordinated end-to-end",
  },
  {
    number: "03",
    title: "Fabrication",
    sub: "Factory-controlled precision for structural and heavy packages",
  },
  {
    number: "04",
    title: "Erection",
    sub: "Safe, sequenced assembly with in-house lifting and plant resources",
  },
  {
    number: "05",
    title: "Utilities & MEP",
    sub: "Coordinated services from design through commissioning",
  },
  {
    number: "06",
    title: "EPC Delivery",
    sub: "Single-point accountability from concept to handover",
  },
]

const N = CAPABILITIES.length
const RX = 360
const RY = 140
const CARD_W = 240
const CARD_H = 200

// Card 0 at front at start, rotate until card 5 (06) is at front = 5/6 circle
const START_ANGLE = Math.PI / 2
const END_ANGLE = Math.PI / 2 + (5 / 6) * Math.PI * 2

// Total cumulative wheel delta (px) to complete the full rotation.
// ~250px per card × 5 transitions = 1250px feels satisfyingly slow on trackpad.
const TOTAL_DELTA = 1500

const getNormalizedDelta = e => {
  if (e.deltaMode === 1) return e.deltaY * 16   // line mode → px
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight  // page mode → px
  return e.deltaY                                // px mode (default)
}

const OrbitalCard = ({ item, index, rotation }) => {
  const baseAngle = -(index / N) * Math.PI * 2

  const x = useTransform(rotation, r => Math.cos(r + baseAngle) * RX)
  const y = useTransform(rotation, r => Math.sin(r + baseAngle) * RY)

  const scale = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)        // -1 = back, 1 = front
    return 0.62 + ((s + 1) / 2) * 0.38      // 0.62 → 1.0
  })

  const opacity = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return 0.35 + ((s + 1) / 2) * 0.65      // 0.35 → 1.0
  })

  const zIndex = useTransform(rotation, r =>
    Math.round(Math.sin(r + baseAngle) * 50 + 51)
  )

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: `-${CARD_W / 2}px`,
        marginTop: `-${CARD_H / 2}px`,
        width: `${CARD_W}px`,
        x,
        y,
        scale,
        opacity,
        zIndex,
        borderRadius: "16px",
        background: "linear-gradient(145deg, #2a0808 0%, #140404 100%)",
        border: "1px solid rgba(200,50,50,0.14)",
        padding: "1.75rem",
        boxShadow: "0 28px 72px rgba(0,0,0,0.65), 0 0 50px rgba(120,0,0,0.1) inset",
        userSelect: "none",
        cursor: "default",
      }}
    >
      <p style={{
        fontSize: "9px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#5c1c1c",
        marginBottom: "1.1rem",
        fontFamily: "monospace",
      }}>
        {item.number}
      </p>
      <h3 style={{
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "#f0d8d8",
        lineHeight: 1.2,
        marginBottom: "0.85rem",
      }}>
        {item.title}
      </h3>
      <div style={{ height: "1px", background: "rgba(200,60,60,0.1)", marginBottom: "0.85rem" }} />
      <p style={{ fontSize: "0.775rem", color: "#8a5050", lineHeight: 1.75 }}>
        {item.sub}
      </p>
    </motion.div>
  )
}

const OrbitalSection = () => {
  const sectionRef = useRef(null)
  const progress = useMotionValue(0)
  const rotation = useTransform(progress, [0, 1], [START_ANGLE, END_ANGLE])

  useEffect(() => {
    if (typeof window === "undefined") return

    let locked = false
    let accumulated = 0

    const lock = () => {
      if (locked) return
      locked = true
      accumulated = progress.get() * TOTAL_DELTA  // resume from current position
      window.__lenis?.stop()
    }

    const unlock = () => {
      if (!locked) return
      locked = false
      window.__lenis?.start()
    }

    const onWheel = e => {
      if (!locked) return
      accumulated += getNormalizedDelta(e)

      if (accumulated < -250) {
        // User is scrolling back up past the section — release
        progress.set(0)
        accumulated = 0
        unlock()
        return
      }

      const p = Math.min(1, Math.max(0, accumulated / TOTAL_DELTA))
      progress.set(p)

      if (p >= 1) {
        // Card 06 reached front — release scroll
        unlock()
      }
    }

    // Lock when section is ≥85% visible so it's fully in frame before we stop Lenis
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lock()
        } else {
          unlock()
        }
      },
      { threshold: 0.85 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)
    window.addEventListener("wheel", onWheel, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("wheel", onWheel)
      if (locked) window.__lenis?.start()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        background: "#191919",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "clamp(3.5rem, 7vh, 6rem)",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 200 }}>
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#555",
          marginBottom: "1.25rem",
        }}>
          Our Capabilities
        </p>
        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "#e5e5e5",
          lineHeight: 1.05,
        }}>
          What we build, end-to-end
        </h2>
      </div>

      {/* Orbit ring */}
      <div style={{
        position: "relative",
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {CAPABILITIES.map((item, i) => (
          <OrbitalCard
            key={item.number}
            item={item}
            index={i}
            rotation={rotation}
          />
        ))}
      </div>
    </section>
  )
}

export default OrbitalSection
