import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"

const AboutUs = () => {
  return (
    <Layout>
      <Seo
        title="About Us"
        description="Proalfa Dynamic—industrial infrastructure development and turnkey EPC. Our story, mission, and vision."
      />

      <div className="about-us my-40 md:mx-32 mx-10 flex flex-col gap-10">
        <section className="hero">
          <div className="container">
            <h2 className="md:text-[2rem] md:font-bold text-[1.5rem] font-semibold leading-snug">
              Proalfa Dynamic is an industrial infrastructure development and
              turnkey EPC group.
            </h2>
            <p className="mt-4 font-medium text-lg leading-relaxed text-[#c8c8c8]">
              We design, engineer, and deliver large-scale industrial facilities
              from foundation and structure to operations-ready assets—with
              focus on speed, quality, and lifecycle value.
            </p>
          </div>
        </section>

        <section className="our-story">
          <div className="container">
            <h2 className="font-bold mb-3">Our Story</h2>
            <p className="font-medium leading-relaxed">
              From tailored structures to integrated industrial facilities,
              Proalfa Dynamic has evolved into a multifaceted industrial
              infrastructure developer.
            </p>
            <p className="font-medium leading-relaxed mt-4">
              Our journey began with innovative pre-engineered building
              solutions, and today we deliver turnkey infrastructure projects
              that blend engineering excellence, procurement speed, and
              world-class execution.
            </p>
            <p className="font-medium leading-relaxed mt-4">
              We support industries spanning manufacturing, warehousing,
              logistics, energy, and heavy industrial applications—turning
              complex challenges into operational assets.
            </p>
          </div>
        </section>

        <section className="our-team">
          <div className="container">
            <h2 className="font-bold mb-3">Our Team</h2>
            <p className="font-medium leading-relaxed">
              Behind every successful project is a dedicated team. Our team of
              experienced architects, engineers, and construction experts work
              tirelessly to turn your ideas into reality. We take pride in our
              collaborative approach, ensuring that your vision is at the center
              of everything we do.
            </p>
          </div>
        </section>

        <section className="mission-vision">
          <div className="container">
            <h2 className="font-bold mb-3">Mission &amp; Vision</h2>
            <p className="font-medium leading-relaxed">
              <span className="font-bold text-white">Mission:</span> To deliver
              best-in-class industrial and logistics infrastructure with
              integrated EPC capabilities, enabling faster industrialization and
              long-term value creation.
            </p>
            <p className="font-medium leading-relaxed mt-4">
              <span className="font-bold text-white">Vision:</span> To be
              India&apos;s leading industrial infrastructure group building
              large-scale facilities and operating long-term assets that
              accelerate economic productivity.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutUs
