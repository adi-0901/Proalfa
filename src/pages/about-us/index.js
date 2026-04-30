import React, { useEffect, useRef } from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"

const FadeUp = ({ children, delay = 0, className = "" }) => {
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
      { threshold: 0.1 }
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
        transform: "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const pillars = [
  {
    number: "01",
    title: "Speed without compromise",
    body: "In-house fabrication and owned equipment mean we control schedule. No subcontractor delays, no interface gaps.",
  },
  {
    number: "02",
    title: "Single-point accountability",
    body: "One contract, one team from earthworks to commissioning. We own every scope, every interface, every outcome.",
  },
  {
    number: "03",
    title: "Engineered for lifecycle",
    body: "We design for operations—not just construction completion. Structures that support future expansion, heavy loads, and long maintenance cycles.",
  },
  {
    number: "04",
    title: "Built across India",
    body: "Executed across Maharashtra and expanding nationally—with logistics, plant, and people already deployed at scale.",
  },
]

const AboutUs = () => {
  return (
    <Layout>
      <Seo
        title="About Us"
        path="/about-us/"
        description="Based in Pune, Maharashtra—Proalfa Dynamic is an industrial infrastructure developer delivering turnkey EPC projects across India. Our story, mission, and vision."
        keywords="industrial construction company Maharashtra, turnkey industrial project contractor Pune, best warehouse construction company in Pune, industrial contractor Pune, EPC contractor Maharashtra, factory construction company Pune, industrial building contractor Pune, warehouse builder Pune, MIDC construction contractor Pune, industrial project management Pune"
      />

      {/* ── Hero statement ───────────────────────────── */}
      <div className="px-10 md:px-20 mt-40 mb-24">
        <FadeUp>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-8">
            About Proalfa Dynamic
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="md:text-[3.75rem] text-[2.25rem] font-bold leading-[1.05] text-[#e5e5e5] max-w-5xl">
            We don't just build structures. We build the infrastructure that
            Indian industry runs on.
          </h1>
        </FadeUp>
      </div>

      {/* ── Story ───────────────────────────────────── */}
      <div className="border-t border-[#2a2a2a] px-10 md:px-20 py-20">
        <div className="flex flex-col md:flex-row md:gap-24 gap-10">
          <FadeUp className="md:w-1/3 shrink-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555]">
              Our Story
            </p>
          </FadeUp>
          <div className="flex flex-col gap-6">
            <FadeUp delay={0.1}>
              <p className="text-[#999] text-lg leading-[1.8]">
                Proalfa Dynamic began with a sharp focus on pre-engineered
                building solutions. Over time, the mandate grew. Clients
                needed more than steel—they needed a partner who could take
                responsibility for the entire built environment.
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className="text-[#999] text-lg leading-[1.8]">
                Today we deliver turnkey industrial infrastructure at scale—
                integrating EPC execution, civil and RCC, fabrication,
                erection, utilities, and sustainable systems under one
                accountable team. Every project we take on, we treat as if
                it is our own asset.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── Large quote ─────────────────────────────── */}
      <div className="border-t border-[#2a2a2a] px-10 md:px-20 py-24">
        <FadeUp>
          <blockquote className="md:text-[2.25rem] text-[1.5rem] font-bold text-[#e5e5e5] leading-[1.15] max-w-4xl">
            "Speed, quality, and lifecycle value—on every project we deliver,
            at every scale we pursue."
          </blockquote>
        </FadeUp>
      </div>

      {/* ── Pillars ─────────────────────────────────── */}
      <div className="border-t border-[#2a2a2a]">
        <div className="px-10 md:px-20 py-16">
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-12">
              How We Work
            </p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-0">
            {pillars.map((p, i) => (
              <FadeUp key={p.number} delay={i * 0.07}>
                <div className="border-t border-[#2a2a2a] py-10 md:pr-16">
                  <span className="text-[11px] text-[#444] tracking-widest font-mono">
                    {p.number}
                  </span>
                  <h3 className="mt-3 mb-3 text-[1.2rem] font-bold text-[#e5e5e5]">
                    {p.title}
                  </h3>
                  <p className="text-[#666] text-base leading-[1.7]">{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission & Vision ────────────────────────── */}
      <div className="border-t border-[#2a2a2a] px-10 md:px-20 py-20">
        <div className="flex flex-col md:flex-row gap-16">
          <FadeUp className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-6">
              Mission
            </p>
            <p className="text-[#999] text-lg leading-[1.75]">
              To deliver best-in-class industrial and logistics infrastructure
              with integrated EPC capabilities—enabling faster
              industrialisation and long-term value creation for every client
              we work with.
            </p>
          </FadeUp>
          <div className="w-px bg-[#2a2a2a] hidden md:block" />
          <FadeUp delay={0.1} className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-6">
              Vision
            </p>
            <p className="text-[#999] text-lg leading-[1.75]">
              To be India's leading industrial infrastructure group—building
              large-scale facilities and operating long-term assets that
              accelerate economic productivity across the country.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <div className="border-t border-[#2a2a2a] px-10 md:px-20 py-20">
        <FadeUp>
          <p className="text-[#555] text-base mb-6">Ready to build?</p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-3 text-[#e5e5e5] text-lg font-semibold border-b border-[#444] pb-1 hover:border-white transition-colors duration-300"
          >
            Talk to us <span>→</span>
          </Link>
        </FadeUp>
      </div>
    </Layout>
  )
}

export default AboutUs
