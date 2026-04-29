import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const rangePoints = [
  "Large-span manufacturing, warehousing, and logistics campuses",
  "Turnkey EPC — design, procurement, construction, and handover",
  "Industrial parks and multi-unit developments with shared infrastructure",
  "PEB, civil & RCC, utilities, and coordinated services interfaces",
  "Heavy-load and crane-integrated structures for process industries",
  "Energy-efficient envelopes and solar-ready industrial roofs",
  "Fast-track programs where schedule certainty is non-negotiable",
]

const advantagePoints = [
  "Single-point accountability across structure, civil, and key packages",
  "Factory-controlled fabrication plus controlled site erection",
  "Better cost predictability with fewer owner-managed interfaces",
  "Quality, safety, and compliance systems applied end-to-end",
  "Layout flexibility for expansion, densification, and automation",
  "Strength, durability, and resilience for industrial duty cycles",
  "Fire and seismic design aligned to code and insurer expectations",
]

const CARDS = [
  { number: "01", title: "Range & Scope", points: rangePoints },
  { number: "02", title: "Delivery Advantage", points: advantagePoints },
]

const Card3D = ({ card, entranceDelay }) => {
  const wrapperRef = useRef(null)
  const shineRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Spring-smoothed rotation values
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springRotX = useSpring(rotX, { stiffness: 180, damping: 28 })
  const springRotY = useSpring(rotY, { stiffness: 180, damping: 28 })

  // Entrance via IntersectionObserver
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const onMouseMove = e => {
    const rect = wrapperRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    rotX.set(((y - cy) / cy) * -9)
    rotY.set(((x - cx) / cx) * 12)
    // Move shine highlight
    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.08) 0%, transparent 65%)`
    }
  }

  const onMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
    if (shineRef.current) shineRef.current.style.background = "none"
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        perspective: "1200px",
        flex: 1,
        minWidth: 0,
        opacity: 0,
        transform: "translateY(70px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${entranceDelay}s,
                     transform 0.85s cubic-bezier(0.16,1,0.3,1) ${entranceDelay}s`,
        ...(visible && { opacity: 1, transform: "translateY(0)" }),
      }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "16px",
          background: "linear-gradient(145deg, #161616 0%, #111111 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "clamp(1.75rem, 3vw, 2.75rem)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
          overflow: "hidden",
          cursor: "default",
          height: "100%",
        }}
      >
        {/* Shine layer — updated via direct DOM ref for performance */}
        <div
          ref={shineRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "16px" }}
        />

        {/* Raised face: gives depth illusion */}
        <div style={{ transform: "translateZ(30px)" }}>
          {/* Card number */}
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#3a3a3a",
            marginBottom: "1.5rem",
            fontFamily: "monospace",
          }}>
            {card.number}
          </p>

          {/* Title */}
          <h3 style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            fontWeight: 700,
            color: "#e5e5e5",
            lineHeight: 1.1,
            marginBottom: "2rem",
          }}>
            {card.title}
          </h3>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "2rem" }} />

          {/* Points */}
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {card.points.map((pt, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <span style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#444",
                  flexShrink: 0,
                  marginTop: "9px",
                }} />
                <span style={{
                  fontSize: "0.875rem",
                  color: "#666",
                  lineHeight: 1.75,
                }}>
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

const WhySection = () => {
  const headingRef = useRef(null)
  const [headingVisible, setHeadingVisible] = useState(false)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ padding: "clamp(4rem,10vw,8rem) clamp(2rem,5vw,5rem)", background: "#191919" }}>
      {/* Section label */}
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          ...(headingVisible && { opacity: 1, transform: "translateY(0)" }),
          marginBottom: "4rem",
        }}
      >
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#555",
          marginBottom: "1.25rem",
        }}>
          Why Integrated Expertise
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#e5e5e5",
          lineHeight: 1.05,
          maxWidth: "720px",
        }}>
          Why build with integrated industrial expertise
        </h2>
      </div>

      {/* 3D Cards */}
      <div style={{
        display: "flex",
        gap: "clamp(1rem, 2.5vw, 2rem)",
        flexWrap: "wrap",
      }}>
        {CARDS.map((card, i) => (
          <Card3D key={card.number} card={card} entranceDelay={i * 0.15} />
        ))}
      </div>
    </section>
  )
}

export default WhySection
