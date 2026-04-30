import React, { useEffect, useRef, useState, useCallback } from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"
import ScrollDown from "../../components/ScrollDown"
import ImgPEB      from "../../assets/images/sketches/Gemini_Generated_Image_6lgx0d6lgx0d6lgx.png"
import ImgCivil    from "../../assets/images/sketches/Gemini_Generated_Image_iyiggkiyiggkiyig.png"
import ImgEPC      from "../../assets/images/sketches/Gemini_Generated_Image_9ezh8m9ezh8m9ezh.png"
import ImgWarehouse from "../../assets/images/sketches/Gemini_Generated_Image_xr3eakxr3eakxr3e.png"
import ImgFleet    from "../../assets/images/sketches/Gemini_Generated_Image_8ufj7g8ufj7g8ufj.png"
import ImgSolar    from "../../assets/images/sketches/Gemini_Generated_Image_w21hcqw21hcqw21h.png"

const capabilities = [
  {
    number: "01",
    title: "Pre-Engineered Buildings",
    description:
      "In-house engineering, fabrication, and erection of large-span industrial buildings designed for speed, efficiency, and durability.",
    image: ImgPEB,
  },
  {
    number: "02",
    title: "Civil & RCC Works",
    description:
      "Comprehensive civil construction including foundations, RCC structures, internal roads, drainage, utilities, and supporting infrastructure.",
    image: ImgCivil,
  },
  {
    number: "03",
    title: "Turnkey EPC Execution",
    description:
      "Single-point responsibility for complete industrial projects—from design coordination and procurement to construction, commissioning, and handover.",
    image: ImgEPC,
  },
  {
    number: "04",
    title: "Industrial Warehousing & Large Facilities",
    description:
      "Design and construction of modern warehouses and logistics facilities aligned with operational efficiency and future scalability.",
    image: ImgWarehouse,
  },
  {
    number: "05",
    title: "Heavy Equipment & Execution Fleet",
    description:
      "Owned and deployed fleet of cranes, lifting equipment, and construction machinery ensuring schedule certainty and cost control.",
    image: ImgFleet,
  },
  {
    number: "06",
    title: "Rooftop Solar & Sustainable Infrastructure",
    description:
      "Integration of rooftop solar and sustainable systems into industrial facilities to reduce operating costs and environmental impact.",
    image: ImgSolar,
  },
]

const industries = [
  {
    number: "01",
    title: "Manufacturing Facilities",
    description:
      "Industrial plants and production units designed for heavy loads, process integration, cranes, and future expansion.",
  },
  {
    number: "02",
    title: "Warehousing & Logistics",
    description:
      "Large-span warehouses and logistics hubs optimised for storage density, circulation, fire safety, and automation readiness.",
  },
  {
    number: "03",
    title: "Heavy Engineering & High-Load Structures",
    description:
      "Structures designed for cranes, heavy equipment, vibration control, and industrial-grade durability.",
  },
  {
    number: "04",
    title: "Industrial Parks & Multi-Unit Developments",
    description:
      "Planned industrial campuses with shared infrastructure, internal roads, utilities, and scalable layouts.",
  },
  {
    number: "05",
    title: "Renewable & Sustainable Infrastructure",
    description:
      "Solar-integrated industrial facilities aligned with sustainability goals and long-term operating efficiency.",
  },
]

const FadeUp = ({ children, delay = 0 }) => {
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
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
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

const ItemRow = ({ item, showImage = false, onImageClick }) => (
  <FadeUp>
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 border-t border-[#2a2a2a] py-8 group">
      <span className="text-[11px] font-mono text-[#444] tracking-widest shrink-0">
        {item.number}
      </span>
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-16 gap-3">
        <h3 className="md:w-72 shrink-0 text-[1.05rem] font-semibold text-[#e5e5e5] leading-snug group-hover:text-white transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-[#666] text-sm leading-[1.75] max-w-xl flex-1">
          {item.description}
        </p>
      </div>
      {showImage && (
        <div className="shrink-0 w-28 md:w-36 flex items-center justify-end">
          {item.image ? (
            <button
              onClick={() => onImageClick(item.image, item.title)}
              className="w-full focus:outline-none"
              style={{ background: "none", border: "none", padding: 0, cursor: "none" }}
              aria-label={`View ${item.title} sketch`}
            >
              <img
                src={item.image}
                alt={`${item.title} sketch`}
                className="w-full h-20 object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              />
            </button>
          ) : (
            <div className="w-full h-20" />
          )}
        </div>
      )}
    </div>
  </FadeUp>
)

const Lightbox = ({ src, title, onClose }) => {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.92) } to { opacity:1; transform:scale(1) } }`}
      </style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(880px, 90vw)",
          width: "100%",
          animation: "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <img
          src={src}
          alt={title}
          style={{ width: "100%", display: "block", borderRadius: "4px" }}
        />
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-48px",
            right: 0,
            background: "none",
            border: "none",
            color: "#999",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Close ✕
        </button>
        <p
          style={{
            marginTop: "12px",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#555",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

const CapabilitiesPage = () => {
  const [lightbox, setLightbox] = useState(null)
  const openLightbox = useCallback((src, title) => setLightbox({ src, title }), [])
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
  <Layout>
    <Seo
      title="What We Do"
      path="/capabilities/"
      description="Pune-based turnkey industrial infrastructure developer—in-house PEB fabrication, civil & RCC, EPC execution, warehousing, fleet, and solar across Maharashtra and India."
      keywords="steel structure warehouse Pune, prefabricated warehouse Pune, turnkey industrial project contractor Pune, civil works contractor Pune, industrial civil contractor Pune, design build warehouse Pune, design build factory Pune, industrial project management Pune, warehouse construction cost Pune, industrial shed construction Pune, factory construction company Pune, manufacturing plant construction Pune, industrial building construction Pune, MIDC construction contractor Pune, warehouse construction Chakan, warehouse construction Ranjangaon, industrial construction Maharashtra"
    />

    {/* Page header */}
    <div className="px-10 md:px-20 mt-40 mb-16">
      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-8">
        <div>
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-5">
              What We Do
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="md:text-[3rem] text-[2rem] font-bold leading-[1.05] text-[#e5e5e5] max-w-2xl">
              End-to-End Industrial Infrastructure
            </h1>
          </FadeUp>
        </div>
        <div className="self-end">
          <ScrollDown />
        </div>
      </div>
      <FadeUp delay={0.15}>
        <p className="text-[#666] text-base leading-[1.75] max-w-xl mt-8 md:block hidden">
          Proalfa Dynamic designs, engineers, and delivers large-scale
          industrial facilities—from foundation and structure to
          operations-ready assets. Every capability is owned. Every interface
          is controlled.
        </p>
      </FadeUp>
    </div>

    {/* Section 1 */}
    <div className="px-10 md:px-20 pt-4 pb-20">
      <FadeUp>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-2 border-t border-[#2a2a2a] pt-10">
          Our Capabilities
        </p>
        <p className="md:text-[1.6rem] text-[1.2rem] font-bold text-[#e5e5e5] mb-8">
          The tools, skills, and processes we bring to every project
        </p>
      </FadeUp>
      {capabilities.map(item => (
        <ItemRow key={item.number} item={item} showImage onImageClick={openLightbox} />
      ))}
    </div>

    {/* Section 2 */}
    <div className="px-10 md:px-20 pb-24">
      <FadeUp>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-2 border-t border-[#2a2a2a] pt-10">
          Industries We Serve
        </p>
        <p className="md:text-[1.6rem] text-[1.2rem] font-bold text-[#e5e5e5] mb-8">
          The sectors and facility types we deliver across India
        </p>
      </FadeUp>
      {industries.map(item => (
        <ItemRow key={item.number} item={item} />
      ))}
    </div>

    {lightbox && (
      <Lightbox src={lightbox.src} title={lightbox.title} onClose={closeLightbox} />
    )}
  </Layout>
  )
}

export default CapabilitiesPage
