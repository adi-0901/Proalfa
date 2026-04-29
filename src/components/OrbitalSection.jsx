import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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

const RX = 360
const RY = 140
const CARD_W = 240
const CARD_H = 200

const OrbitalCard = ({ item, index, total, rotation }) => {
  const baseAngle = -(index / total) * Math.PI * 2

  const x = useTransform(rotation, r => Math.cos(r + baseAngle) * RX)
  const y = useTransform(rotation, r => Math.sin(r + baseAngle) * RY)

  // sin = 1 → front, sin = -1 → back
  const scale = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return 0.65 + ((s + 1) / 2) * 0.35   // 0.65 → 1.0
  })

  const opacity = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return 0.38 + ((s + 1) / 2) * 0.62   // 0.38 → 1.0
  })

  // z-index via MotionValue so front cards paint over back cards
  const zIndex = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return Math.round(s * 50 + 51)
  })

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
        border: "1px solid rgba(200, 50, 50, 0.14)",
        padding: "1.75rem",
        boxShadow:
          "0 28px 72px rgba(0,0,0,0.65), 0 0 50px rgba(120,0,0,0.1) inset",
        userSelect: "none",
        cursor: "default",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#5c1c1c",
          marginBottom: "1.1rem",
          fontFamily: "monospace",
        }}
      >
        {item.number}
      </p>

      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#f0d8d8",
          lineHeight: 1.2,
          marginBottom: "0.85rem",
        }}
      >
        {item.title}
      </h3>

      <div
        style={{
          height: "1px",
          background: "rgba(200,60,60,0.1)",
          marginBottom: "0.85rem",
        }}
      />

      <p style={{ fontSize: "0.775rem", color: "#8a5050", lineHeight: 1.75 }}>
        {item.sub}
      </p>
    </motion.div>
  )
}

const OrbitalSection = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Card 0 starts front-center (sin=1). One full revolution over the scroll range.
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI / 2, Math.PI / 2 + Math.PI * 2]
  )

  return (
    <div
      ref={containerRef}
      style={{ height: "220vh", position: "relative", background: "#191919" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
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
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#555",
              marginBottom: "1.25rem",
            }}
          >
            Our Capabilities
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#e5e5e5",
              lineHeight: 1.05,
            }}
          >
            What we build, end-to-end
          </h2>
        </div>

        {/* Orbit ring */}
        <div
          style={{
            position: "relative",
            flex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {CAPABILITIES.map((item, i) => (
            <OrbitalCard
              key={item.number}
              item={item}
              index={i}
              total={CAPABILITIES.length}
              rotation={rotation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrbitalSection
