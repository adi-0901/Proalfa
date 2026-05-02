import React, { useEffect, useRef } from "react"
import SCONLogo from "../../assets/svg/clients/scon_logo.svg"
import KiaLogo from "../../assets/svg/clients/kia_logo.svg"
import FoxconnLogo from "../../assets/svg/clients/foxconn_logo.svg"
import TataProjectsLogo from "../../assets/svg/clients/tata_projects_logo.webp"
import RelianceRetailLogo from "../../assets/svg/clients/reliance_retail_logo.svg"
import JCBLogo from "../../assets/svg/clients/jcb_logo.svg"

const CLIENTS = [
  { title: "Kia", image: KiaLogo },
  { title: "Foxconn", image: FoxconnLogo },
  { title: "SCON", image: SCONLogo },
  { title: "Tata Projects", image: TataProjectsLogo },
  { title: "Reliance Retail", image: RelianceRetailLogo },
  { title: "JCB", image: JCBLogo },
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
        transform: "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const HomeOurClients = () => {
  return (
    <div className="bg-[#191919] border-t border-[#2a2a2a] px-10 md:px-20 py-24">
      <FadeIn>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-12">
          Clients & Partners
        </p>
      </FadeIn>

      <div className="flex flex-wrap items-center gap-x-16 gap-y-10 mb-16">
        {CLIENTS.map(({ title, image }, i) => (
          <FadeIn key={title} delay={i * 0.06}>
            <img
              src={image}
              alt={title}
              title={title}
              loading="lazy"
              decoding="async"
              width="160"
              height="40"
              className="h-8 md:h-10 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale"
            />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="border-t border-[#2a2a2a] pt-10">
          <p className="text-[#555] text-base leading-[1.7] max-w-2xl">
            Industry leaders including Foxconn, Kia, and SCON trust Proalfa
            Dynamic for large-scale industrial infrastructure—where schedule
            certainty and single-point accountability are non-negotiable.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}

export default HomeOurClients
