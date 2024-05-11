import React from "react"
import FoxconnLogo from "../../assets/svg/clients/foxconn_logo.svg"
import SCONLogo from "../../assets/svg/clients/scon_logo.svg"
import KiaLogo from "../../assets/svg/clients/kia_logo.svg"

const HomeOurClients = () => {
  const CLIENTS = [
    {
      title: "Foxconn",
      image: FoxconnLogo,
    },
    {
      title: "Kia",
      image: KiaLogo,
    },
    {
      title: "SCON",
      image: SCONLogo,
    },
  ]

  return (
    <div className="flex items-center justify-center flex-col mb-20 mt-4">
      <div className="text-center md:text-[2.5rem] text-[2.5rem] uppercase font-bold pb-2 md:mx-0 mx-5">
        our clients
      </div>
      <div className="flex items-center justify-center gap-20 p-10 my-[30px] bg-[#131313] rounded-[20px] w-max border-[1px solid #242424]">
        {CLIENTS.map(({ title, image }) => (
          <div key={title}>
            <img
              src={image}
              alt={title}
              className="h-[35px]"
              autoFill={true}
              title={title}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-full flex items-center justify-center font-normal text-[18px] text-center">
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
