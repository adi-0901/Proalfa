import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"
import ImgPEB from "../../assets/images/production/h-beam_ls.jpeg"
import ImgCivil from "../../assets/images/projects/foxconn.jpg"
import ImgEPC from "../../assets/images/projects/reliance_retail.jpg"
import ImgWarehouse from "../../assets/images/projects/bhairavnath_feeds.jpg"
import ImgFleet from "../../assets/images/production/dispatch_ls.jpeg"
import ImgSolar from "../../assets/images/projects/adisun_solar.jpg"

const capabilityBlocks = [
  {
    title: "Pre-Engineered Buildings (PEB)",
    body:
      "In-house engineering, fabrication, and erection of large-span industrial buildings designed for speed, efficiency, and durability.",
    imageCaption: "Factory manufacturing (machinery)",
    image: ImgPEB,
  },
  {
    title: "Civil & RCC Works",
    body:
      "Comprehensive civil construction including foundations, RCC structures, internal roads, drainage, utilities, and supporting infrastructure.",
    imageCaption: "RCC foundations and columns; roads, drains, and tanks",
    image: ImgCivil,
  },
  {
    title: "Turnkey EPC Execution",
    body:
      "Single-point responsibility for complete industrial projects—from design coordination and procurement to construction, commissioning, and handover.",
    imageCaption: "Warehouse column erection (crane in action)",
    image: ImgEPC,
  },
  {
    title: "Industrial Warehousing & Large Facilities",
    body:
      "Design and construction of modern warehouses and logistics facilities aligned with operational efficiency and future scalability.",
    imageCaption: "Large-scale warehousing",
    image: ImgWarehouse,
  },
  {
    title: "Heavy Equipment & Execution Fleet",
    body:
      "Owned and deployed fleet of cranes, lifting equipment, and construction machinery ensuring schedule certainty and cost control.",
    imageCaption: "Excavator, backhoe loader, and dumper on site",
    image: ImgFleet,
  },
  {
    title: "Rooftop Solar & Sustainable Infrastructure",
    body:
      "Integration of rooftop solar and sustainable systems into industrial facilities to reduce operating costs and environmental impact.",
    imageCaption: "Solar panels on an industrial roof",
    image: ImgSolar,
  },
]

const executionApproach = [
  "Engineering & value optimization",
  "Procurement planning & vendor control",
  "Phased construction & erection",
  "Quality, safety & compliance",
  "Timely commissioning",
]

const whyIntegrated = [
  "Faster project timelines",
  "Single-point accountability",
  "Better cost control",
  "Reduced interface risks",
  "Consistent quality",
]

const CapabilitiesPage = () => (
  <Layout>
    <Seo
      title="Capabilities"
      description="Pune-based industrial infrastructure capabilities—PEB fabrication, civil & RCC, turnkey EPC, warehousing, owned fleet, and sustainable systems delivered across Maharashtra and India."
      keywords="steel structure warehouse Pune, steel structure factory Pune, prefabricated warehouse Pune, prefab shed construction Pune, prefab factory construction Pune, steel building construction Pune, structural steel contractor Pune, steel frame warehouse Pune, turnkey industrial project contractor Pune, end to end industrial construction Pune, complete industrial project contractor Pune, civil works contractor Pune, industrial civil contractor Pune, design build warehouse Pune, design build factory Pune, industrial project management Pune, warehouse construction cost Pune, industrial shed construction cost Pune"
    />
    <div className="my-28 max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24 text-[#e8e8e8]">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-[#888]">
          End-to-end turnkey industrial infrastructure
        </p>
        <h1 className="md:text-4xl text-2xl font-bold leading-tight text-white">
          Integrated Capabilities for Industrial Infrastructure Delivery
        </h1>
      </header>

      <section className="flex flex-col gap-12">
        {capabilityBlocks.map((block, i) => (
          <article
            key={block.title}
            className={`flex flex-col gap-6 ${
              i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } md:items-stretch md:gap-10`}
          >
            <div className="md:w-1/2 rounded-lg overflow-hidden border border-[#333] bg-[#222]">
              <img
                src={block.image}
                alt=""
                className="w-full h-64 md:h-80 object-cover"
              />
              <p className="text-xs uppercase tracking-wide text-[#999] px-4 py-2 border-t border-[#333]">
                {block.imageCaption}
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {block.title}
              </h2>
              <p className="font-medium leading-relaxed text-[#c8c8c8]">
                {block.body}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-[#333] pt-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          Our Execution Approach
        </h2>
        <ul className="list-disc pl-6 space-y-3 font-medium text-[#c8c8c8]">
          {executionApproach.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#333] pt-14 pb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Why Integrated Capabilities Matter
        </h2>
        <ul className="list-disc pl-6 space-y-3 font-medium text-[#c8c8c8]">
          {whyIntegrated.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  </Layout>
)

export default CapabilitiesPage
