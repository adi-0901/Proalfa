import React, { useEffect, useRef } from "react"
import SurveyingImage from "../assets/svg/services/surveying.svg"
import CivilWorkImage from "../assets/svg/services/civilwork.svg"
import ProductionImage from "../assets/svg/services/production.svg"
import ErectionImage from "../assets/svg/services/erection.svg"
import LottieMedia from "./lottie/LottieMedia"
import PaperPlane5_1 from "../assets/lottie/paperplane_5.1.json"
import PaperPlane2_2 from "../assets/lottie/paperplane_2.2.json"
import PaperPlane2_3 from "../assets/lottie/paperplane_2.3.json"
import { Colored } from "../styles/globalStyles"

const Services = () => {
  const services = [
    {
      img: SurveyingImage,
      title: "Surveying",
      description: `Surveying is the foundation of every industrial infrastructure project. We capture site conditions, levels, and constraints so engineering, civil works, and logistics stay aligned from day one—reducing rework and protecting schedule.`,
    },
    {
      img: CivilWorkImage,
      title: "Civil work",
      description: `We deliver the civil and RCC scope that industrial facilities depend on—foundations, paving, drainage, utilities, and supporting infrastructure—coordinated with structure and MEP interfaces for a single accountable path to handover.`,
    },
    {
      img: ProductionImage,
      title: "Fabrication",
      description: `In-house engineering and shop fabrication for PEB and structural packages give us control over quality, tolerances, and delivery sequencing—so site erection stays predictable on large-span and heavy industrial projects.`,
    },
    {
      img: ErectionImage,
      title: "Erection",
      description: `Safe, sequenced erection with our own lifting and plant resources ties fabrication to commissioning. We manage critical lifts, alignment, and quality holds so the asset is ready for operations—not just structurally complete.`,
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

    document.addEventListener("wheel", onWheel, {passive: true})

    return () => {
      document.removeEventListener("wheel", onWheel)
    }
  }, [lottieRef])

  return (
    <div className="my-4 relative mb-[200px]">
      <div className="md:block hidden">
        <LottieMedia
          className={"w-full absolute top-[100px] z-50 pointer-events-none"}
          animationData={PaperPlane5_1}
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
          className={"w-full absolute top-[600px] z-50 pointer-events-none"}
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
          className={"w-full absolute top-[1100px] z-50 pointer-events-none"}
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
        <div className="border-t border-[#2a2a2a] px-10 md:px-20 py-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#555] mb-4">How We Deliver</p>
          <p className="md:text-[2.5rem] text-[1.75rem] font-bold text-[#e5e5e5]">Process & Execution</p>
        </div>
        <div className="absolute w-screen top-0 h-full left-0 bg-transparent pointer-events-none">
          <div className="grid-lines h-full" />
        </div>
      </div>

      <div className="stack relative">
        <div className="absolute w-screen top-0 h-full left-0 bg-transparent pointer-events-none">
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
              <img src={service.img} className="w-[360px]" alt="" />
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
                  <Colored>{service.title}</Colored>
                </p>
                <p className="font-normal text-app-text leading-[140%] text-lg">
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
