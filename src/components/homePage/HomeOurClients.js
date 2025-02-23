import React from "react"
import SCONLogo from "../../assets/svg/clients/scon_logo.svg"
import KiaLogo from "../../assets/svg/clients/kia_logo.svg"
import FoxconnLogo from "../../assets/svg/clients/foxconn_logo.svg"
import TataProjectsLogo from "../../assets/svg/clients/tata_projects_logo.png"
import RelianceRetailLogo from "../../assets/svg/clients/reliance_retail_logo.svg"
import JCBLogo from "../../assets/svg/clients/jcb_logo.svg"

const HomeOurClients = () => {
  const CLIENTS = [
    {
      title: "Kia",
      image: KiaLogo,
    },
    {
      title: "Foxconn",
      image: FoxconnLogo,
    },
    {
      title: "SCON",
      image: SCONLogo,
    },
    {
      title: "Tata Projects",
      image: TataProjectsLogo,
    },
    {
      title: "Reliance Retail",
      image: RelianceRetailLogo,
    },
    {
      title: "JCB",
      image: JCBLogo,
    },
  ]

  return (
    <div className="flex items-center justify-center flex-col mb-20 mt-4">
      <div className="text-center md:text-[2.5rem] text-[2.5rem] uppercase font-bold pb-2 md:mx-0 mx-5">
        OUR CLIENTS
      </div>
      <div className="flex items-center flex-wrap justify-center gap-20 p-10 my-[30px] bg-[#131313] rounded-[20px] border-[1px solid #242424] mx-20">
        {CLIENTS.map(({ title, image }) => (
          <div key={title}>
            <img
              src={image}
              alt={title}
              className="w-[256px]"
              // autoFill={true}
              title={title}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-full flex items-center justify-center font-normal text-[18px] text-center leading-[150%]">
        <div className="max-w-[800px] text-center">
          Our clients, including industry leaders like Foxconn, Kia, and SCON,
          trust Proalfa Dynamic for tailored Pre-Engineered Building solutions.
          We collaborate closely with each client, ensuring quality, innovation,
          and adaptability in every project. Join us and experience the Proalfa
          Dynamic difference
        </div>
      </div>
    </div>
  )
}

export default HomeOurClients
