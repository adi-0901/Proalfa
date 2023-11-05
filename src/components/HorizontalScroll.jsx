import React, { useEffect, useRef } from "react"
import RangeAndScope from "../assets/svg/why_range_scope.svg"
import RangeAndScopeBullet from "../assets/svg/openmoji_telescope.svg"
import Advantages from "../assets/svg/why_advantages.svg"
import AdvantagesBullet from "../assets/svg/ph_warehouse.svg"
import useHorizontalScroll from "../hooks/useHorizontalScroll"
import { useState } from "react"
import { Colored } from "../styles/globalStyles"

const MyComponent = () => {
  const rangeAndScopePoints = [
    "High-rise commercial Buildings",
    "Large Span Buildings, warehouses, factories, School, Hostel, Auditoriums, Stadiums, Supermarkets, Shopping Malls.",
    "Buildings with Complex design",
    "Residential Buildings-Multi/single stories",
    "Energy Efficient construction",
    "Buildings at Seismic Zone, Hilly Regions, Remote Localities",
    "Construction of Light weight Buildings",
    "Fast Track Construction",
  ]

  const advantagesPoints = [
    "Lightweight, easy and economical to construct and eco-Friendly",
    "Excellent quality & quality control, unique aesthetic appeal",
    "Extensive choice of layouts",
    "Superior flexibility in design & fabrication",
    "Economical construction",
    "Immense strength, durability and resilience",
    "Easily transportable and modular",
    "Fire resistant and earthquake resistant",
    "Speedy construction and implementation",
  ]

  const [isIntersecting, setIsIntersecting] = useState(false)
  const scrollRef = useHorizontalScroll(isIntersecting, setIsIntersecting)
  const interRef = useRef(null)

  const onWheel = (e, el) => {
    if (!scrollRef?.current) return

    const scrollLeft = el.scrollLeft
    const maxScrollLeft = el.scrollWidth - el.clientWidth

    const scrollTopOffset = scrollRef?.current?.getBoundingClientRect()?.top

    if (
      (scrollLeft >= maxScrollLeft - 30 && e.deltaY >= 1) ||
      (scrollLeft === 0 && e.deltaY < 1)
    ) {
      setIsIntersecting(false)
      document.body.style.overflowY = "auto"
      document.body.style.overflowX = "hidden"
    } else if (scrollTopOffset <= 0 && e.deltaY >= 1) {
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top)
      setIsIntersecting(true)
      document.body.style.overflow = "hidden"
    } else if (e.deltaY < 1 && scrollTopOffset > 0) {
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top)
      document.body.style.overflow = "hidden"
      setIsIntersecting(true)
    }
  }

  useEffect(() => {
    if (
      !scrollRef.current ||
      (typeof window === "object" && window?.innerWidth < 768)
    )
      return
    const el = scrollRef.current

    document.addEventListener("wheel", e => onWheel(e, el), {passive: true})

    return () => {
      document.removeEventListener("wheel", onWheel)
    }
  }, [scrollRef])

  const whyChooseList = [
    {
      image: RangeAndScope,
      title: "Range and Scope",
      list: rangeAndScopePoints,
      listBulletImage: RangeAndScopeBullet,
    },
    {
      image: Advantages,
      title: "Advantages of PEB",
      list: advantagesPoints,
      listBulletImage: AdvantagesBullet,
    },
  ]

  return (
    <div className="relative">
      <div className="absolute bottom-0" ref={interRef}></div>
      <div
        className="w-auto md:mb-[100px] overflow-x-auto whitespace-nowrap md:h-screen relative horizontal-scroll"
        ref={scrollRef}
      >
        <div className="md:mx-20 flex items-center h-full w-full md:flex-row flex-col md:gap-0 gap-20">
          <div className="md:text-[72px] text-[40px] md:mr-[150px] text-center">
            <p>Why go for</p>
            <p>pre-engineered</p>
            <p>solutions</p>
          </div>

          {whyChooseList.map(({ image, title, list, listBulletImage }) => (
            <div key={title} className="md:h-full md:py-10 md:mr-6">
              <div className="md:border md:border-[#373737] rounded-[20px] h-full w-full md:px-[100px] px-0 flex items-center justify-center overflow-hidden md:flex-row flex-col">
                <img
                  className="md:max-w-[initial] max-w-full md:mr-[150px] md:px-0 px-10"
                  alt=""
                  src={image}
                />
                <div className="mx-10">
                  <p className="mb-[26px] text-[36px] font-normal md:text-start text-center md:mt-0 mt-4">
                    <Colored>{title}</Colored>
                    
                  </p>
                  <div className="flex flex-col gap-y-6  md:w-max-[450px] md:w-[450px] overflow-hidden">
                    {list.map(point => (
                      <div className="flex items-center gap-x-4" key={point}>
                        <img src={listBulletImage} alt="" />
                        <p className="text-base font-normal text-app-text text-ellipsis whitespace-break-spaces">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyComponent
