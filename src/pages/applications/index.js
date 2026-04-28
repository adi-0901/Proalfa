import React, { useEffect, useRef } from "react"
import Layout from "../../components/Layout"
// import LottieApplications from '../../assets/lottie/proalfa_3.7.json' // with text
import LottieApplications from "../../assets/lottie/proalfa_final_without_text.json"
import LottieMedia from "../../components/lottie/LottieMedia"
import { useState } from "react"
import ScrollDown from "../../components/ScrollDown"
import Seo from "../../components/seo"

const Applications = () => {
  const lottieRef = useRef(null)

  const [divHeight, setDivHeight] = useState(0)
  const [divWidth, setDivWidth] = useState(0)

  const itemsRef = useRef([])
  // you can access the elements with itemsRef.current[n]

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 7)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log('intersecting!!', entry.target.getAttribute('index'))
          entry.target.style.opacity = 1
        }
      },
      {
        // rootMargin: '-300px'
      },
    )

    observer.observe(itemsRef.current[0])
    observer.observe(itemsRef.current[1])
    observer.observe(itemsRef.current[2])
    observer.observe(itemsRef.current[3])
    observer.observe(itemsRef.current[4])
    observer.observe(itemsRef.current[5])
    observer.observe(itemsRef.current[6])
    return () => observer.disconnect()
  }, [itemsRef])

  const items = [
    {
      top: divHeight * 0.115,
      width: divWidth * 0.4,
      left: divWidth * 0.06,
      title: "Industrial",
      description: `Manufacturing plants, warehouses, and distribution centres—delivered with industrial infrastructure discipline: cranes, heavy loads, logistics flow, and growth-ready layouts.`,
    },
    {
      top: divHeight * 0.2,
      width: divWidth * 0.4,
      right: divWidth * 0.02,
      title: `Institutional`,
      description: `Institutional envelopes and support buildings—safe, code-conscious, and coordinated with civil and services for schools, healthcare, and public facilities.`,
    },
    {
      top: divHeight * 0.347,
      width: divWidth * 0.4,
      left: divWidth * 0.06,
      title: `Commercial`,
      description: `Retail, offices, and showrooms where speed-to-asset matters—long-span, efficient envelopes with finish flexibility and dependable delivery.`,
    },
    {
      top: divHeight * 0.453,
      width: divWidth * 0.35,
      right: divWidth * 0.015,
      title: `Heavy Industrial`,
      description: `Heavy industrial environments—high-load frames, crane integration, vibration-aware design, and execution discipline for demanding process industries.`,
    },
    {
      top: divHeight * 0.64,
      width: divWidth * 0.3,
      left: divWidth * 0.06,
      title: `Recreational`,
      description: `Sports, recreation, and community halls—clear spans and durable envelopes tuned for public use and long maintenance cycles.`,
    },
    {
      top: divHeight * 0.777,
      width: divWidth * 0.3,
      right: divWidth * 0.04,
      title: `Agricultural`,
      description: `Agricultural storage and shelter buildings—practical spans, environmental control readiness, and fast delivery for rural schedules.`,
    },
    {
      top: divHeight * 0.925,
      width: divWidth * 0.3,
      left: divWidth * 0.06,
      title: `Energy`,
      description: `Renewable-ready industrial assets—rooftop solar integration and sustainable infrastructure options aligned with operating cost and ESG goals.`,
    },
  ]

  return (
    <Layout>
      <Seo
        title="Applications"
        description="PEB and industrial infrastructure applications from Pune—serving industrial, institutional, commercial, heavy industrial, and energy sectors across Maharashtra and India."
        keywords="prefabricated warehouse Pune, prefab shed construction Pune, prefab factory construction Pune, steel structure factory Pune, steel frame warehouse Pune, industrial shed construction Pune, factory shed construction Pune, steel shed construction Pune, cold storage warehouse construction Pune, storage shed construction Pune, large godown construction Pune, industrial building construction Pune, heavy engineering construction Pune, warehouse construction Indapur, factory construction Pune district"
      />

      <div className="md:mx-20 mx-10 mt-40">
        <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-10">
          <p className="md:text-[2rem] text-xl w-full font-bold leading-[40px]">
            Explore where Proalfa Dynamic applies integrated industrial
            infrastructure—in PEB, civil, logistics, and energy-adjacent
            buildouts across sectors.
          </p>
          <ScrollDown />
        </div>
        <p className="text-xl mt-10 md:block hidden">
          From manufacturing and warehousing campuses to institutional and
          commercial envelopes—and specialized heavy industrial and energy-ready
          facilities—we align structure, civil, and execution so projects move
          faster with fewer interface risks. Our application experience supports
          turnkey EPC thinking at every scale we pursue.
        </p>
      </div>

      <div className="relative">
        {items.map((item, index) => (
          <div
            className="absolute"
            key={index}
            ref={el => (itemsRef.current[index] = el)}
            index={index}
            style={{
              top: `${item.top}px`,
              width: `${item.width}px`,
              left: item.left ? `${item.left}px` : undefined,
              right: item.right ? `${item.right}px` : undefined,
              opacity: 0,
              transition: "0.3s opacity ease-in-out",
            }}
          >
            <div className="md:text-[40px] sm:text-[32px] text-[20px] font-bold text-[#e5e5e5] ">
              {item.title}
            </div>
            <div className="text-[#b1b1b1] leading-[150%] mt-3 md:text-base text-[12px]">
              {item.description}
            </div>
          </div>
        ))}
        <LottieMedia
          className={"w-full static mb-20"}
          ref={lottieRef}
          animationData={LottieApplications}
          interactivity={{
            mode: "scroll",
            actions: [
              {
                visibility: [0, 0.9],
                type: "seek",
                frames: [0, 2100],
              },
            ],
          }}
          onDivSizeChange={div => {
            // console.log('divv', div.clientHeight)
            setDivHeight(div.clientHeight)
            setDivWidth(div.clientWidth)
          }}
        />
      </div>
      <p className="text-xl mt-10 md:hidden block mx-10 mb-20">
        Integrated industrial infrastructure across sectors—structure, civil,
        and delivery models that reduce risk from concept to handover.
      </p>
    </Layout>
  )
}

export default Applications
