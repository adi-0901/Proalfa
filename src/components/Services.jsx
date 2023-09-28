import React, { useEffect, useRef } from "react"
import SurveyingImage from "../assets/svg/services/surveying.svg"
import CivilWorkImage from "../assets/svg/services/civilwork.svg"
import ProductionImage from "../assets/svg/services/production.svg"
import ErectionImage from "../assets/svg/services/erection.svg"
import LottieMedia from "./lottie/LottieMedia"
import PaperPlane2_1 from "../assets/lottie/paperplane_2.1.json"
import PaperPlane2_2 from "../assets/lottie/paperplane_2.2.json"
import PaperPlane2_3 from "../assets/lottie/paperplane_2.3.json"

const Services = () => {
  const services = [
    {
      img: SurveyingImage,
      title: "Surveying",
      description: `Surveying is the critical first step in pre-engineered building projects. Our team assesses the construction site, gathering precise measurements and data to understand the terrain, soil conditions, and any potential obstacles. This information helps in designing and planning the structure effectively, ensuring it meets both functional and safety requirements.`,
    },
    {
      img: CivilWorkImage,
      title: "Civil work",
      description: `Civil work involves the foundation and infrastructure preparation necessary to support the pre-engineered building. This service encompasses tasks such as excavation, grading, and foundation construction. Ensuring a solid and level base is essential for the stability and longevity of the building.`,
    },
    {
      img: ProductionImage,
      title: "Production",
      description: `The production phase is where we manufacture the components and materials needed for the pre-engineered building. This includes fabricating steel frames, roof and wall panels, and any other customized elements. Quality control and precision are vital during this stage to ensure that all components fit together seamlessly during erection.`,
    },
    {
      img: ErectionImage,
      title: "Erection",
      description: ` Erection is the final step where our team assembles the pre-engineered building on-site. This involves lifting and securing the pre-fabricated components, aligning them correctly, and ensuring structural integrity. Efficient and safe erection practices are crucial to delivering a functional and durable building to our clients.`,
    },
  ]

  const lottieRef = useRef(null)

  let planeOne, planeTwo, planeThree

  const overlayLeftRef = useRef([])
  const overlayRightRef = useRef([])
  const overlaysRef = useRef([])

  const onWheel = e => {
    if (window.location.pathname !== "/") {
      document.removeEventListener("wheel", onWheel)
      return
    }
    if (!planeOne || !planeTwo || !planeThree) attachPlanes()

    const planeOneLeft = planeOne.getBoundingClientRect().left
    const planeTwoLeft = planeTwo.getBoundingClientRect().left
    const planeThreeLeft = planeThree.getBoundingClientRect().left

    if (e.deltaY > 0) {
      planeOne.classList.remove("plane-up")
      planeTwo.classList.remove("plane-up")
      planeThree.classList.remove("plane-up")
    } else {
      planeOne.classList.add("plane-up")
      planeTwo.classList.add("plane-up")
      planeThree.classList.add("plane-up")
    }

    const overlayLeft = overlayLeftRef.current
    const overlays = overlaysRef.current
    const overlayRight = overlayRightRef.current

    if (planeOneLeft - overlayLeft[0] > 0) {
      overlays[0].style.background =
        "linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)"
      overlays[0].style.marginLeft = `${planeOneLeft - overlayLeft[0]}px`
    }
    if (planeOneLeft - overlayLeft[1] > 0) {
      overlays[1].style.background =
        "linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)"
      overlays[1].style.marginLeft = `${planeOneLeft - overlayLeft[1]}px`
    }
    if (planeTwoLeft + 100 - overlayRight[2] < 0) {
      overlays[2].style.background =
        "linear-gradient(to left,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)"
      overlays[2].style.marginLeft = `${planeTwoLeft + 100 - overlayRight[2]}px`
    }
    if (planeThreeLeft - overlayLeft[3] > 0) {
      overlays[3].style.background =
        "linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)"
      overlays[3].style.marginLeft = `${planeThreeLeft - overlayLeft[3]}px`
    }
  }

  const attachPlanes = () => {
    planeOne = document.querySelectorAll("g[clip-path^=url]")[0]
    planeTwo = document.querySelectorAll("g[clip-path^=url]")[1]
    planeThree = document.querySelectorAll("g[clip-path^=url]")[2]
  }

  useEffect(() => {
    // const divTop = scrollRef.current.getBoundingClientRect().top
    // const el = scrollRef.current
    attachPlanes()

    const overlays = overlaysRef.current
    // console.log({overlays})
    if (!overlays.length) return
    overlayLeftRef.current = overlays.map(o => o.getBoundingClientRect().left)
    overlayRightRef.current = overlays.map(
      o => o.getBoundingClientRect().left + o.getBoundingClientRect().width,
    )

    // temp1.getBoundingClientRect().left

    document.addEventListener("wheel", onWheel)

    return () => {
      document.removeEventListener("wheel", onWheel)
    }
  }, [lottieRef])

  return (
    <div className="my-4 relative mb-[200px]">
      <div className="md:block hidden">
        <LottieMedia
          className={"w-full absolute top-[100px] z-50"}
          animationData={PaperPlane2_1}
          ref={lottieRef}
          interactivity={{
            mode: "scroll",
            actions: [
              {
                visibility: [0, 0.93],
                type: "seek",
                frames: [0, 144],
              },
            ],
          }}
        />
        <LottieMedia
          className={"w-full absolute top-[600px] z-50"}
          style={{
            transform: "scale(-1,1)",
          }}
          animationData={PaperPlane2_2}
          ref={lottieRef}
          interactivity={{
            mode: "scroll",
            actions: [
              {
                visibility: [0.3, 1],
                type: "seek",
                frames: [0, 144],
              },
            ],
          }}
        />
        <LottieMedia
          className={"w-full absolute top-[1100px] z-50"}
          animationData={PaperPlane2_3}
          ref={lottieRef}
          interactivity={{
            mode: "scroll",
            actions: [
              {
                visibility: [0.35, 0.93],
                type: "seek",
                frames: [0, 144],
              },
            ],
          }}
        />
      </div>

      <div className="relative">
        <div className="text-center md:text-[4rem] text-[2.5rem] uppercase font-bold py-12 md:mx-0 mx-5">
          OUR SERVICES
        </div>
        <div className="absolute w-screen top-0 h-full left-0 bg-transparent">
          <div className="grid-lines h-full" />
        </div>
      </div>

      <div className="stack relative">
        <div className="absolute w-screen top-0 h-full left-0 bg-transparent">
          <div className="grid-lines h-full" />
        </div>
        {services.map((service, index) => (
          <div
            className="flex justify-center items-center md:flex-row flex-col"
            key={index}
          >
            <div
              className={`flex-1 flex justify-center items-start relative overflow-hidden md:mx-0 md:ml-10 mx-10 ${
                index % 2 === 0 ? "md:block" : "md:hidden block"
              }`}
            >
              <img src={service.img} alt="" />
              <div
                ref={el => (overlaysRef.current[index] = el)}
                className="absolute md:block hidden top-0 left-0 w-full h-full z-10"
                style={{
                  marginLeft: "0px",
                  transition: "0.1s all ease-in-out",
                  background: "#191919",
                }}
              />
            </div>

            {index % 2 === 1 ? (
              <div className="flex-1 flex justify-center items-center"></div>
            ) : (
              ""
            )}
            <div className="flex-1 flex justify-center items-center md:mx-0 mx-6 text-center md:text-start">
              <div>
                <p className="text-[32px] font-normal uppercase mb-4 md:text-start text-center">
                  {service.title}
                </p>
                <p className="font-normal text-app-text">
                  {service.description}
                </p>
              </div>
            </div>
            {index % 2 === 0 ? (
              <div className="flex-1 flex justify-center items-center"></div>
            ) : (
              ""
            )}

            {index % 2 === 1 && (
              <div className="flex-1 md:flex justify-center items-center relative hidden">
                <img src={service.img} alt="" />
                <div
                  ref={el => (overlaysRef.current[index] = el)}
                  className="absolute top-0 left-0 w-full h-full bg-[#191919]  z-10"
                  style={{
                    marginLeft: "0px",
                    transition: "0.1s all ease-in-out",
                    background: "#191919",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
