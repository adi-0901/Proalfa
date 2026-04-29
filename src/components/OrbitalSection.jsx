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

const RX = 370  // horizontal orbit radius (px)
const RY = 150  // vertical orbit radius (px)
const CARD_W = 240
const CARD_H = 200

const OrbitalCard = ({ item, index, total, rotation }) => {
  const baseAngle = -(index / total) * Math.PI * 2

  const x = useTransform(rotation, r => Math.cos(r + baseAngle) * RX)
  const y = useTransform(rotation, r => Math.sin(r + baseAngle) * RY)

  const scale = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)   // -1 = back, 1 = front
    return 0.52 + ((s + 1) / 2) * 0.48 // 0.52 → 1.0
  })

  const opacity = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return 0.12 + ((s + 1) / 2) * 0.88  // 0.12 → 1.0
  })

  const zIndex = useTransform(rotation, r => {
    const s = Math.sin(r + baseAngle)
    return Math.round(s * 50 + 51)       // 1 → 101
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
        background: "linear-gradient(145deg, #191919 0%, #111 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "1.75rem",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset",
        userSelect: "none",
        cursor: "default",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#3a3a3a",
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
          color: "#e5e5e5",
          lineHeight: 1.2,
          marginBottom: "0.85rem",
        }}
      >
        {item.title}
      </h3>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          marginBottom: "0.85rem",
        }}
      />

      <p style={{ fontSize: "0.775rem", color: "#555", lineHeight: 1.75 }}>
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

  // Start: card 0 at front (sin=1 → bottom of ellipse), complete one full rotation
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI / 2, Math.PI / 2 + Math.PI * 2]
  )

  return (
    <div
      ref={containerRef}
      style={{ height: "300vh", position: "relative", background: "#191919" }}
    >
      {/* Sticky viewport */}
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
