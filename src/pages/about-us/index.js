import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/seo"

const AboutUs = () => {
  return (
    <Layout>
      <Seo title="About Us" />

      <div className="about-us my-40 md:mx-32 mx-10 flex flex-col gap-10">
        <section className="hero">
          <div className="container">
            <h2 className="md:text-[2rem] md:font-bold text-[1.5rem]">
              Welcome to Proalfa Dynamic - your trusted partner in
              pre-engineered building solutions. With a passion for innovation
              and a commitment to excellence, we have been shaping the future of
              construction for years.
            </h2>
          </div>
        </section>

        <section className="our-story">
          <div className="container">
            <h2 className="font-bold mb-3">Our Story</h2>
            <p className="font-medium">
              At Proalfa, we started with a vision - to revolutionize the
              construction industry by offering tailor-made pre-engineered
              building solutions. Over the years, we have evolved and grown,
              constantly pushing boundaries and setting new standards. Our
              journey is a testament to our dedication to delivering quality and
              innovation in every project we undertake.
            </p>
          </div>
        </section>

        <section className="our-team">
          <div className="container">
            <h2 className="font-bold mb-3">Our Team</h2>
            <p className="font-medium">
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
            <h2 className="font-bold mb-3">Mission & Vision</h2>
            <p className="font-medium">
              Our mission is to provide sustainable, efficient, and
              aesthetically pleasing pre-engineered building solutions that meet
              the unique needs of our clients. We envision a future where
              construction is not just about bricks and mortar, but also about
              innovation, sustainability, and excellence.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutUs
