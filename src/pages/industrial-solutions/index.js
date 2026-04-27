import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"
import ImgManufacturing from "../../assets/images/projects/foxconn.jpg"
import ImgLogistics from "../../assets/images/projects/reliance_retail.jpg"
import ImgHeavy from "../../assets/images/projects/gati_battery.jpg"
import ImgParks from "../../assets/images/projects/tata_projects.jpg"
import ImgSolar from "../../assets/images/projects/adisun_solar.jpg"

const industrySolutions = [
  {
    title: "Manufacturing Facilities",
    body:
      "Industrial plants and production units designed for heavy loads, process integration, cranes, and future expansion.",
    imageCaption:
      "Factory interior with overhead crane and operations on the ground",
    image: ImgManufacturing,
  },
  {
    title: "Warehousing & Logistics",
    body:
      "Large-span warehouses and logistics hubs optimized for storage density, circulation, fire safety, and automation readiness.",
    imageCaption:
      "Logistics warehouse exterior with cargo trucks at the entry",
    image: ImgLogistics,
  },
  {
    title: "Heavy Engineering & High-Load Structures",
    body:
      "Structures designed for cranes, heavy equipment, vibration control, and industrial-grade durability.",
    imageCaption: "Heavy machinery inside an industrial facility",
    image: ImgHeavy,
  },
  {
    title: "Industrial Parks & Multi-Unit Developments",
    body:
      "Planned industrial campuses with shared infrastructure, internal roads, utilities, and scalable layouts.",
    imageCaption: "Multiple buildings connected by roads within an industrial park",
    image: ImgParks,
  },
  {
    title: "Renewable & Sustainable Industrial Infrastructure",
    body:
      "Solar-integrated industrial facilities aligned with sustainability and long-term operating efficiency.",
    imageCaption: "Rooftop solar on a warehouse",
    image: ImgSolar,
  },
]

const deliveryModels = [
  "Design & Build",
  "Turnkey EPC",
  "EPCM",
  "Build-to-Suit (Warehousing)",
  "Developer-Led Projects",
]

const IndustrialSolutionsPage = () => (
  <Layout>
    <Seo
      title="Industrial Solutions"
      description="Industrial infrastructure solutions in Pune and across India—manufacturing plants, warehousing, heavy engineering, industrial parks, and sustainable buildouts with flexible EPC delivery models."
      keywords="industrial shed builder Pune, industrial shed construction Pune, industrial shed contractor Pune, industrial shed construction cost Pune, factory construction company Pune, factory building contractor Pune, factory shed construction Pune, factory builder Pune, manufacturing plant construction Pune, industrial building construction Pune, steel shed construction Pune, steel building contractor Pune, metal shed builder Pune, industrial construction company Maharashtra, turnkey factory construction Pune, design build warehouse Pune, design build factory Pune, industrial civil contractor Pune, MIDC shed construction, MIDC construction contractor Pune, industrial project management Pune, warehouse construction Chakan, industrial shed builder Chakan, factory construction Chakan MIDC, warehouse construction Ranjangaon, industrial shed Ranjangaon, warehouse builder Pimpri Chinchwad, industrial construction Hinjewadi, industrial shed Baramati"
    />
    <div className="my-28 max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-20 text-[#e8e8e8]">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[#888]">
          Sector depth, not just scale
        </p>
        <h1 className="md:text-4xl text-2xl font-bold leading-tight text-white">
          Industrial Infrastructure Solutions Across Key Sectors
        </h1>
        <p className="text-lg font-medium text-[#b0b0b0] max-w-3xl leading-relaxed">
          We help owners and operators answer one question clearly: do we
          understand your industry and your delivery risk? This page is built
          around how we think—scope, interfaces, and execution—before a single
          photo tells the story.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-bold text-white mb-10 border-b border-[#333] pb-3">
          Solutions by Industry
        </h2>
        <div className="flex flex-col gap-14">
          {industrySolutions.map((item, i) => (
            <article
              key={item.title}
              className={`flex flex-col gap-6 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } md:items-stretch md:gap-10`}
            >
              <div className="md:w-1/2 rounded-lg overflow-hidden border border-[#333] bg-[#222]">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-64 md:h-72 object-cover"
                />
                <p className="text-xs uppercase tracking-wide text-[#999] px-4 py-2 border-t border-[#333]">
                  {item.imageCaption}
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="font-medium leading-relaxed text-[#c8c8c8]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#333] pt-14">
        <h2 className="text-2xl font-bold text-white mb-6">
          Flexible Project Delivery Models
        </h2>
        <ul className="list-disc pl-6 space-y-3 font-medium text-[#c8c8c8]">
          {deliveryModels.map(m => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#333] pt-14 pb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Built for Scale and Complexity
        </h2>
        <p className="font-medium leading-relaxed text-[#c8c8c8] max-w-3xl">
          We execute industrial projects ranging from standalone facilities to
          multi-building campuses, handling complex interfaces across structure,
          civil, utilities, and services.
        </p>
      </section>
    </div>
  </Layout>
)

export default IndustrialSolutionsPage
