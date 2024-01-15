import React, { useEffect, useState } from "react"
import { useGlobalDispatchContext } from "../../context/globalContext"

const TextItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useGlobalDispatchContext()
  const [isLoaded, setIsLoaded] = useState(false)

  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  useEffect(() => {
    setIsLoaded(true)
  },[])

  return (
    <>
      <text
        transform={item.transform}
        font-size={isHovered ? 16 : 12}
        fill="#dc143c"
        style={{
          fontFamily: `"Open Sans", "Helvetica Neue", sans-serif`,
          // transition: `all 0.7s ease-in-out, opacity 0.3s ease-in-out ${0.15 * (index + 1)}s`,
          transition: `font-size 0.3s ease-in-out, opacity 0.7s ease-in-out`,
          opacity: isLoaded ? 100 : 0
        }}
        onMouseEnter={() => {
          setCursor("melt")
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setCursor()
          setIsHovered(false)
        }}
      >
        {item.text}
      </text>
      {!!item.pathD && (
        <path
          onMouseEnter={() => {
            setCursor("melt")
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setCursor()
            setIsHovered(false)
          }}
          style={{
            // transition: `all 0.7s ease-in-out, opacity 0.3s ease-in-out ${0.15 * (index + 1)}s`,
            transition: `all 0.7s ease-in-out, opacity 0.3s ease-in-out`,

            opacity: isLoaded ? 100 : 0  
          }}
          d={item.pathD}
          fill={isHovered ? "#dc143c" : "#191919"}
          stroke={isHovered ? "#dc143c" : "#82162c"}
          strokeMiterlimit="10"
          strokeWidth="0.75"
        />
      )}
    </>
  )
}

const PebGraph = ({ className }) => {
  const textList = [
    {
      text: "Skylight",
      transform: "translate(495.28 42.65)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M517.58,59.85a4.1,4.1,0,1,0-4.1-4.1h0a4,4,0,0,0,4,4.1Z",
    },
    {
      text: "Roof Cladding",
      transform: "translate(542.62 10.28)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M582.58,26a4.1,4.1,0,1,0-4.1-4.1h0A4.12,4.12,0,0,0,582.58,26Z",
    },
    {
      text: "Vertical Fascia",
      transform: "translate(636.82 40)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M677.88,53.85a4.1,4.1,0,1,0-4.1-4.1h0A4.17,4.17,0,0,0,677.88,53.85Z",
    },
    {
      text: "Louver",
      transform: "translate(693.38 222.55)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M783,224.05a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,783,224.05Z",
    },
    {
      text: "Aluminium Window",
      transform: "translate(674.79 251.52)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M810.28,251.65a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,810.28,251.65Z",
    },
    {
      text: "Double Slide Door",
      transform: "translate(647.38 286.55)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M782,287.55a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,782,287.55Z",
    },
    {
      text: "Gutter",
      transform: "translate(626.38 318.95)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M757.18,320.05a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,757.18,320.05Z",
    },
    {
      text: "Downspout",
      transform: "translate(586.98 363.25)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M726.18,364.05a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,726.18,364.05Z",
    },
    {
      text: "Double Walk Door",
      transform: "translate(565.2 399.06)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M700.38,400a4.1,4.1,0,1,0,4.1,4.1h0A4.13,4.13,0,0,0,700.38,400Z",
    },
    {
      text: "Main Frame Column",
      transform: "translate(508.83 465.55)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M650.58,466.25a4.1,4.1,0,1,0,4.1,4.1h0a4.07,4.07,0,0,0-4-4.1Z",
    },
    {
      text: "Rafter",
      transform: "translate(411.68 519.75)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M427.78,494.85a4.1,4.1,0,1,1-4.1,4.1,4.05,4.05,0,0,1,4-4.1Z",
    },
    {
      text: "Endwall Girt",
      transform: "translate(309.67 505.94)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M344.68,480.45a4.1,4.1,0,1,1-4.1,4.1,4.05,4.05,0,0,1,4-4.1Z",
    },
    {
      text: "Endwall Column",
      transform: "translate(202.66 458)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M249.08,430.65a4.1,4.1,0,1,1-4.1,4.1A4.11,4.11,0,0,1,249.08,430.65Z",
    },
    {
      text: "Side Girt",
      transform: "translate(148.67 414.92)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M173.38,390.05a4.1,4.1,0,1,1-4.1,4.1,4.05,4.05,0,0,1,4-4.1Z",
    },
    {
      text: "Eave Strut",
      transform: "translate(80.98 251.2)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M57.88,261.25a4.1,4.1,0,1,0-4.1-4.1,4,4,0,0,0,4,4.1Z",
    },
    {
      text: "Purlin",
      transform: "translate(193.98 212.35)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M4.48,222.75a4.1,4.1,0,1,0-4.1-4.18.11.11,0,0,0,0,.08A4.12,4.12,0,0,0,4.48,222.75Z",
    },
    {
      text: "Roof Jack",
      transform: "translate(267.23 174.75)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M72.78,185.85a4.1,4.1,0,1,0-4.1-4.1A4.1,4.1,0,0,0,72.78,185.85Z",
    },
    {
      text: "Ridge Ventilator",
      transform: "translate(300.68 143.55)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD: "M175.58,154.85a4.1,4.1,0,1,0-4.1-4.1,4,4,0,0,0,4,4.1Z",
    },
    {
      text: "Roof Curb",
      transform: "translate(415.38 111.35)",
      fontSize: 12,
      fill: "#dc143c",
      fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
      pathD:
        "M298.58,121.85a4.1,4.1,0,1,0-4.1-4.1A4.1,4.1,0,0,0,298.58,121.85Z",
    },
  ]

  // const [renderTextList, setRenderTextList] = useState([])

  // const interval = useRef(null)

  // useEffect(() => {
  //   interval.current = setInterval(() => {
  //     console.log(renderTextList.length, textList.length)
  //     if (renderTextList.length === textList.length) {
  //       clearInterval(interval.current)
  //       return
  //     }
  //     setRenderTextList(arr => [...arr, {...textList[arr.length], show: true}])
  //   }, 120)

  //   return () => clearInterval(interval.current)
  // }, [renderTextList])

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 814.75 523.02"
      className={className}
    >
      <path d="M613.68,137.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M616.38,137.85V126h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M619.18,138.75v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M622,139.55v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M624.68,140.35v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M627.48,141.15v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M630.28,142v-11.9h.6V142Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M633.08,142.75v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M635.78,143.55v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M638.58,144.35v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M641.38,145.15v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M644.08,146v-11.9h.6V146Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M646.88,146.75v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M649.68,147.55v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M652.38,148.35v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M655.18,149.15v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M658,150v-11.9h.6V150Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M660.68,150.75v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M672.38,154.25v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M663.48,151.55v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M675.08,155.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M666.28,152.35v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M669,153.15v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M550.28,118.55v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M553,119.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M555.78,119.85V108h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M558.58,120.65v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M561.38,121.45v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M564.08,122.25v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M566.88,123.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M569.68,123.85V112h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M572.38,124.65v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M575.18,125.45v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M578,126.25v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M580.68,127.35v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M583.48,128.15v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M586.28,129.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M589,129.85V118h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M591.78,130.65v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M594.58,131.45v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M597.28,132.25v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M609,135.65v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M600.08,133.05v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M611.68,136.45v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M602.88,133.85V122h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path d="M605.58,134.65v-11.9h.6v11.9Z" fill="#aaa" fill-rule="evenodd" />
      <path
        d="M536.38,124.05l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M534.28,122.85l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M539.68,122.85l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M542.28,121.75l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M545,120.65l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M547.58,119.55l-.2-11.9h.6l.2,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M219.78,294,174,321.75l-2.3-.5-.3-2.2,45.9-26.4,1.2.7Z"
        fill="#191919"
      />
      <path
        d="M217.38,292.45l2.7,1.5-46,27.9-2.5-.5-.3-2.4Zm-45.8,26.7.2,1.9,2,.4-.2-1.9Zm2.3.4.2,1.9,45.4-27.5-.9-.5Zm44.4-26.3-.9-.5L171.88,319l1.9.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M438.78,363v105.5l-4.2-1.9-5.7-83.2-126.4-77.9-118.8-5.8-4.9,36.7,1.8,1.5-2.7,2.2-3.1-2.2,1.3-1.5-1.3-50.5,129.7,16.7Z"
        fill="#191919"
      />
      <path
        d="M174.58,285.55l129.9,16.7,134.4,60.6v105.8l-4.5-2.1-5.7-83.2-126.3-77.9-118.6-5.8-4.9,36.4,1.9,1.6-2.9,2.4-3.4-2.4,1.4-1.6Zm.3.4,1.3,50.4-1.3,1.4,2.9,2.1,2.5-2-1.7-1.4,5-36.9,118.9,5.8,126.5,78,5.7,83.2,3.9,1.8V363.05l-134.2-60.5Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M301.18,308.15l-117.7-5.8v-2.8l119.2,6,126.4,78.1,5.4,82.9-7.6-81.8Z"
        fill="#191919"
      />
      <path
        d="M183.28,299.35l119.4,6,126.5,78.2,5.4,82.9h-.3l-7.6-81.7-125.6-76.4-117.8-5.8Zm250.3,156.4-4.7-72.2-126.3-78-119-6v2.5l117.6,5.8L427,384.45Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M179.38,284.15l-4.6,1.6,129.7,16.7L438.78,363v105.5l-4.2-1.9-3.7,3.6,8.2,6L441,475V362l-133-60.2Z"
        fill="#191919"
      />
      <path
        d="M179.38,284l128.7,17.6,133.1,60.3v115.4l-2.1,1.3-8.5-6.1,3.9-6,4.1,1.9V363.05l-134.2-60.5-129.7-16.7v-.3Zm0,.3-4,1.4,129.1,16.6,134.4,60.6v105.8l-4.3-2-3.5,5.7,8,5.8,1.8-1.1v-115L308,301.85Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M174.88,303l252.8,91.7.6,5.5-258.2-93.4Z" fill="#191919" />
      <path
        d="M174.88,302.75l253,91.7.6,5.8-258.7-93.6Zm.1.3-4.5,3.5,257.7,93.3-.6-5.2Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M175.48,316.35l254.9,106.8.4,4.9-259.5-108.8Z" fill="#191919" />
      <path
        d="M175.48,316.15l255.1,106.9.5,5.3-260-109Zm0,.3-3.9,2.8,259,108.6-.4-4.6Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M432.08,365.75l-263.9-77.5-1.6,1.2,264.9,79.1C432.68,368.15,432.38,366.55,432.08,365.75Z"
        fill="#191919"
      />
      <path
        d="M168.18,288.15l264,77.5v.1a4,4,0,0,1,.3,1.6,1.38,1.38,0,0,1-1,1.4h0l-265.3-79.2Zm0,.3-1.3,1,264.6,79a1.21,1.21,0,0,0,.7-1.2,6.66,6.66,0,0,0-.2-1.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M248.08,383.25l2.2,1.6.4-89.3-2.7-.3v88Z" fill="#191919" />
      <path
        d="M247.88,295.15l3,.3-.5,84-2.5-1.9Zm.3.3v82l1.9,1.4.4-83.2Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M252.88,385.05l-2.5-2.8.3-86.6,2.2.3Z" fill="#191919" />
      <path
        d="M250.48,295.45l2.5.3v82.8l-2.8-3.2Zm.3.3-.3,79.6,2.2,2.5v-81.8Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M353.38,441.05l2.2,2.1.4-117.4-2.7-1.2v116.5Z" fill="#191919" />
      <path
        d="M353.18,324.25l3,1.3-.5,108.8-2.5-2.4Zm.3.5V432l1.9,1.8.4-107.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M358.18,442.15l-2.5-1.3.3-115.1,2.2,1.2Z" fill="#191919" />
      <path
        d="M355.78,325.45l2.5,1.4v106.5l-2.8-1.5Zm.3.5-.3,105.6,2.2,1.2V327Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M625.88,188.15l3.7,2.4-195.1,175.7-1.9-4.8Z" fill="#191919" />
      <path
        d="M625.88,188l4,2.6-195.5,176-2.1-5.1Zm0,.4-193.2,173.2,1.8,4.5,194.9-175.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M605.18,181.45l3.7,2.5-201.2,173.6v-7Z" fill="#191919" />
      <path
        d="M605.18,181.25l3.9,2.6L407.48,358v-7.4Zm0,.3-197.4,169.1v6.6l200.8-173.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M580.48,173.15l3.7,2.5L381.38,348l-.6-7.9Z" fill="#191919" />
      <path
        d="M580.48,173l3.9,2.7-203.2,172.6-.6-8.3Zm0,.4-199.6,166.7.6,7.5,202.5-172Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M569.18,175.65l2,4.6-214.6,152.2v-7.3Z" fill="#191919" />
      <path
        d="M569.28,175.45l2.1,4.8-214.9,152.4V325Zm-212.5,149.7v7l214.2-152-1.9-4.3Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M549,173.85l1.8,4.6L330,322.55l.6-8Z" fill="#191919" />
      <path
        d="M549.08,173.55l1.9,4.9-221.1,144.4.6-8.4Zm-218.4,141.1-.5,7.6,220.4-143.9-1.7-4.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M536.18,171.05l2.5,5.4-228,134.6v-8.3Z" fill="#191919" />
      <path
        d="M536.18,170.75l2.7,5.6-228.3,134.9v-8.7Zm-225.3,131.9v8l227.6-134.4-2.4-5.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M434.08,164.25l2.3,5.5-234.3,123.3.4-8.3Z" fill="#191919" />
      <path
        d="M434.18,164.05l2.4,5.8-234.7,123.4.4-8.7Zm-231.5,120.7-.4,8,234-123.1-2.2-5.2Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M452.48,161.15l2.4,5.4L224.48,297l.2-8.3Z" fill="#191919" />
      <path
        d="M452.58,161l2.6,5.7-230.8,130.6.2-8.7Zm-227.8,127.8-.1,8,230.1-130.2-2.3-5.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M477.88,164.15l2.4,5.4L250,300l.2-8.3Z" fill="#191919" />
      <path
        d="M478,164l2.6,5.7-230.8,130.6.2-8.7Zm-227.7,127.8-.1,8,230.1-130.2-2.3-5.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M505.48,167.45l2.4,5.4-230.4,130.4.2-8.3Z" fill="#191919" />
      <path
        d="M505.48,167.25l2.6,5.7-230.8,130.5.2-8.7ZM277.78,295l-.1,8,230.1-130.2-2.3-5.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M524.88,169l2.4,5.4-230.4,130.4.2-8.3Z" fill="#191919" />
      <path
        d="M525,168.75l2.6,5.7L296.78,305l.2-8.7Zm-227.8,127.7-.1,8,230.1-130.2-2.3-5.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M284.28,235.65l-118.5,54.4-2.2-.7v-2.2L282,234.05l1.1.8Z"
        fill="#191919"
      />
      <path
        d="M282,233.85l2.5,1.8-118.8,54.5-2.4-.8V287Zm-118.3,53.5v1.9l1.9.6V288Zm2.3.6v1.9l118-54.2-.8-.6Zm116.9-53.1-.8-.6-118,52.9,1.8.6Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M441,394.45V390l73.3-73.6v5.1Z" fill="#191919" />
      <path
        d="M514.48,316v5.5l-73.6,73.3v-4.9Zm-73.3,74.1v4l73-72.7v-4.6Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M441,426.05v-4.5l73.3-73.6v5.1Z" fill="#191919" />
      <path
        d="M514.48,347.55v5.5l-73.6,73.3v-4.9Zm-73.3,74v4l73-72.7v-4.6Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M501.88,406.65v-97.9L672,153.45v56.9Z" fill="#191919" />
      <path
        d="M672.08,153.05v57.3l-170.3,196.7v-98.4Zm-170,155.7v97.5l169.8-195.9v-56.5Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M643,222.15v-9.4l6-5.8v9Z" fill="#aaa" />
      <path
        d="M642.68,212.55l6.6-6.4v9.9l-6.6,6.8Zm.3,9.6,6-6.2v-9l-6,5.8Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M620.38,243.75v-9.4l6-5.8v9Z" fill="#fff" />
      <path
        d="M620.08,234.25l6.6-6.4v9.9l-6.6,6.8Zm.3,9.5,6-6.2v-9l-6,5.8Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M643.38,220.75V213l5.1-4.8v7.5Z" fill="#191919" />
      <path
        d="M513,302.65h-7.5v-76.5l2.5-2.5v76h5s1,0,1,1.5S513,302.65,513,302.65Z"
        fill="#191919"
      />
      <path
        d="M513,302.65h-7.5v-76.5l2.5-2.5v76h5m0,3s1,0,1-1.5-1-1.5-1-1.5m0,3s-1,0-1-1.5,1-1.5,1-1.5"
        fill="none"
        stroke="#aaa"
        stroke-width="0.2"
      />
      <path
        d="M648.68,208v7.9l-5.4,5.4v-8.2Zm-5.1,5.1v7.3l4.8-4.8v-7Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M269.28,240.05l117.9,16L505,309.85l169.9-155-68.8-31.6-67.7-7.5Z"
        fill="#fff"
      />
      <path
        d="M538.38,115.45l67.8,7.5,69.3,31.8-170.4,155.4-118-53.8-118.8-16.2Zm.1.6-268.1,123.8,116.9,15.9L505,309.45l169.4-154.6L606,123.55Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M547.38,360.65h-7.9V289l2.6-2.3v71.2h5.3s1.1,0,1.1,1.4S547.38,360.65,547.38,360.65Z"
        fill="#191919"
      />
      <path
        d="M547.38,360.65h-7.9V289l2.6-2.3v71.2h5.3m0,2.8s1.1,0,1.1-1.4-1.1-1.4-1.1-1.4m0,2.8s-1.1,0-1.1-1.4,1.1-1.4,1.1-1.4"
        fill="none"
        stroke="#aaa"
        stroke-width="0.2"
      />
      <path
        d="M529.08,120.05l.3-.1,68.4,7.9,70.1,33.4-.1.1-70-33.3Z"
        fill="#191919"
      />
      <path
        d="M526.18,121.45l.3-.1,68.7,8.3,71.2,33-.1.1-71.1-33Z"
        fill="#191919"
      />
      <path
        d="M514.68,126.75l.3-.1,70.7,8.9,69.3,35-.1.2-69.3-35Z"
        fill="#191919"
      />
      <path d="M512,128l.3-.1,71.2,8.9,69,35.3-.1.2-69-35.3Z" fill="#191919" />
      <path
        d="M499.48,133.75l.3-.1,71.8,10.1,73.8,36.1-.1.2L571.48,144Z"
        fill="#191919"
      />
      <path
        d="M497.38,134.75l.3-.1,72.3,10.2,74.4,36.3-.1.2-74.4-36.2Z"
        fill="#191919"
      />
      <path
        d="M487.28,139.35l.3-.1,73,11.3,78.3,37.2-.1.1-78.2-37.1Z"
        fill="#191919"
      />
      <path
        d="M485.08,140.45l.3-.1,73.3,11.7,79,36.9-.1.1-79-36.9Z"
        fill="#191919"
      />
      <path
        d="M471,147l.3-.1,76.4,11.9,80.9,38.4-.1.1L547.68,159Z"
        fill="#191919"
      />
      <path
        d="M468.88,147.85l.3-.1,76.3,12,81.9,38.5-.1.1L545.48,160Z"
        fill="#191919"
      />
      <path
        d="M457.28,153.25l.3-.1,79.1,11.9,82.4,40.8-.1.1-82.4-40.8Z"
        fill="#191919"
      />
      <path
        d="M454.48,154.55l.3-.1,79.6,11.9,83.4,40.6-.1.1-83.3-40.6Z"
        fill="#191919"
      />
      <path
        d="M439.88,161.35l.3-.1,83.3,11.8,84.3,42.1-.1.1-84.3-42.1Z"
        fill="#191919"
      />
      <path
        d="M437.68,162.35l.3-.1,83.8,11.9,84.6,42.2-.1.1-84.6-42.1Z"
        fill="#191919"
      />
      <path
        d="M424.58,168.55l.3-.1,84,13,88.2,42.5-.1.1-88.1-42.5Z"
        fill="#191919"
      />
      <path
        d="M422.38,169.55l.3-.1,84.5,13.1,88.6,42.7-.1.1-88.5-42.6Z"
        fill="#191919"
      />
      <path
        d="M408,176.15l.3-.1,87.7,13.6,90.6,43.8-.1.1L496,189.75Z"
        fill="#191919"
      />
      <path
        d="M405.88,177.15l.3-.1,88.2,13.6,91,44-.1.1-90.9-43.9Z"
        fill="#191919"
      />
      <path
        d="M395.88,181.55l.3-.1,92.7,12.4,93.6,45.2-.1.1L488.88,194Z"
        fill="#191919"
      />
      <path
        d="M393.08,182.85l.3-.1,93.3,12.5,94.6,45-.1.1-94.5-45Z"
        fill="#191919"
      />
      <path
        d="M380.18,188.85l.3-.1,96.1,12.8,96.7,46-.1.1-96.6-45.9Z"
        fill="#191919"
      />
      <path
        d="M378,189.85l.3-.1,96.7,12.9,97,46-.1.1-96.9-46Z"
        fill="#191919"
      />
      <path
        d="M367.38,194.75l.3-.1,98.2,13.7,99.2,46.7-.1.1-99.1-46.6Z"
        fill="#191919"
      />
      <path
        d="M365.08,195.85l.3-.1,98.6,14,99.8,46.5-.1.1-99.8-46.5Z"
        fill="#191919"
      />
      <path
        d="M350.38,202.55l.3-.1,100.7,14.2,103.2,47.9-.1.1-103.1-47.9Z"
        fill="#191919"
      />
      <path
        d="M348.18,203.55l.3-.1,101.2,14.3,103.6,48-.1.1-103.5-48Z"
        fill="#191919"
      />
      <path
        d="M303.38,224.25l.3-.1,109.5,15.5L525,291.55l-.1.1-111.7-51.9Z"
        fill="#191919"
      />
      <path
        d="M301.18,225.25l.3-.1,110.1,15.5,112.2,52-.1.1-112.1-52Z"
        fill="#191919"
      />
      <path
        d="M513.28,302.25l-.1.1-114.7-53.2-113.2-15.9v-.2L398.48,249Z"
        fill="#191919"
      />
      <path
        d="M514.58,301.05l-.1.1-114.3-53-112.8-16V232l112.8,15.9Z"
        fill="#191919"
      />
      <path
        d="M532,285.25l-.1.1-108.7-51.2-108.6-14.6v-.2L423.18,234Z"
        fill="#191919"
      />
      <path
        d="M533.28,284.05l-.1.1L424.88,233l-108-14.5v-.2l108,14.5Z"
        fill="#191919"
      />
      <path
        d="M541.18,276.75l-.1.1-106.8-50.2-104.7-14.2v-.2l104.7,14.2Z"
        fill="#191919"
      />
      <path
        d="M542.38,275.75l-.1.1-105.7-50.5-104.3-14.2V211l104.3,14.2Z"
        fill="#191919"
      />
      <path
        d="M529.08,120.05l.3-.1,68.4,7.9,70.1,33.4-.1.1-70-33.3Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M526.18,121.45l.3-.1,68.7,8.3,71.2,33-.1.1-71.1-33Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M514.68,126.75l.3-.1,70.7,8.9,69.3,35-.1.2-69.3-35Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M512,128l.3-.1,71.2,8.9,69,35.3-.1.2-69-35.3Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M499.48,133.75l.3-.1,71.8,10.1,73.8,36.1-.1.2L571.48,144Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M497.38,134.75l.3-.1,72.3,10.2,74.4,36.3-.1.2-74.4-36.2Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M487.28,139.35l.3-.1,73,11.3,78.3,37.2-.1.1-78.2-37.1Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M485.08,140.45l.3-.1,73.3,11.7,79,36.9-.1.1-79-36.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M471,147l.3-.1,76.4,11.9,80.9,38.4-.1.1L547.68,159Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M468.88,147.85l.3-.1,76.3,12,81.9,38.5-.1.1L545.48,160Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M457.28,153.25l.3-.1,79.1,11.9,82.4,40.8-.1.1-82.4-40.8Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M454.48,154.55l.3-.1,79.6,11.9,83.4,40.6-.1.1-83.3-40.6Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M439.88,161.35l.3-.1,83.3,11.8,84.3,42.1-.1.1-84.3-42.1Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M437.68,162.35l.3-.1,83.8,11.9,84.6,42.2-.1.1-84.6-42.1Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M424.58,168.55l.3-.1,84,13,88.2,42.5-.1.1-88.1-42.5Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M422.38,169.55l.3-.1,84.5,13.1,88.6,42.7-.1.1-88.5-42.6Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M408,176.15l.3-.1,87.7,13.6,90.6,43.8-.1.1L496,189.75Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M405.88,177.15l.3-.1,88.2,13.6,91,44-.1.1-90.9-43.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M395.88,181.55l.3-.1,92.7,12.4,93.6,45.2-.1.1L488.88,194Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M393.08,182.85l.3-.1,93.3,12.5,94.6,45-.1.1-94.5-45Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M380.18,188.85l.3-.1,96.1,12.8,96.7,46-.1.1-96.6-45.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M378,189.85l.3-.1,96.7,12.9,97,46-.1.1-96.9-46Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M367.38,194.75l.3-.1,98.2,13.7,99.2,46.7-.1.1-99.1-46.6Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M365.08,195.85l.3-.1,98.6,14,99.8,46.5-.1.1-99.8-46.5Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M350.38,202.55l.3-.1,100.7,14.2,103.2,47.9-.1.1-103.1-47.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M348.18,203.55l.3-.1,101.2,14.3,103.6,48-.1.1-103.5-48Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M303.38,224.25l.3-.1,109.5,15.5L525,291.55l-.1.1-111.7-51.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M301.18,225.25l.3-.1,110.1,15.5,112.2,52-.1.1-112.1-52Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M513.28,302.25l-.1.1-114.7-53.2-113.2-15.9v-.2L398.48,249Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M514.58,301.05l-.1.1-114.3-53-112.8-16V232l112.8,15.9Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M532,285.25l-.1.1-108.7-51.2-108.6-14.6v-.2L423.18,234Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M533.28,284.05l-.1.1L424.88,233l-108-14.5v-.2l108,14.5Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M541.18,276.75l-.1.1-106.8-50.2-104.7-14.2v-.2l104.7,14.2Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path
        d="M542.38,275.75l-.1.1-105.7-50.5-104.3-14.2V211l104.3,14.2Z"
        fill="none"
        stroke="#191919"
        stroke-width="0.4"
      />
      <path d="M505.08,314.85v-5.1l170.5-156.3V158Z" fill="#fff" />
      <path
        d="M675.68,153.05V158l-170.8,157.2v-5.5Zm-170.5,156.8v4.7l170.2-156.7v-4.1Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M675.88,161.35l-167.4,157.3-3.4-1.6v-2.2l3.4-3.2v4.5l167.4-156.6Z"
        fill="#191919"
      />
      <path
        d="M676,159.15v2.2l-167.5,157.5-3.6-1.7v-2.4l3.7-3.4v4.5Zm-167.4,157.1v2.1l167.1-157.1v-1.4Zm-.2,2.2V312l-3.1,2.9V317Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M508.48,316.15v-4.5l116.1-106.9v2.8Z" fill="#fff" />
      <path
        d="M606.38,123.65l-219,132.8-.5-.8,218.9-132.8Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M683.48,147.45v12.1l-54.6,52.8v-12.9Z" fill="#191919" />
      <path d="M631.28,209.75v-13h.6v13Z" fill="#aaa" fill-rule="evenodd" />
      <path
        d="M634.68,206.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M636.78,204.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M638.88,202.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M641,200.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M643,198.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M645.08,196.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M647.18,194.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M649.18,192.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M651.28,190.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M653.38,188.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M655.48,186.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M657.48,184.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M659.58,182.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M661.68,180.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M663.78,178.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M665.78,176.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M667.88,174.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M670,172.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M678.68,164.05l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M672,170.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M680.78,162.05l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M674.08,168.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M676.18,166.35l-.5-11.9h.6l.5,11.9Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M463.48,203.85h-9.3l-3.4,3.4v5l2.8,3.1H462l3.4-1.8v-6.4Z"
        fill="#fff"
      />
      <path
        d="M454.08,203.55h9.6l2,3.6v6.6l-3.6,1.9h-8.6l-2.9-3.3v-5.2Zm.2.6-3.2,3.2v4.8l2.6,3h8.2l3.2-1.7v-6.1l-1.7-3.2Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M454.18,203.85l26.9-13.3,7.4.5-24.9,12.8Z" fill="#191919" />
      <path
        d="M481.08,190.45l7.9.5-25.4,13.1h-10Zm0,.3-26.3,13h8.7l24.4-12.5Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M488.48,191.05l3.9,3.4v4.6l-27,14.6v-6.4l-1.9-3.4Z"
        fill="#fff"
      />
      <path
        d="M488.48,190.75l4.2,3.6v4.9l-27.6,14.9v-6.8l-2-3.6ZM464,204.05l1.8,3.2v5.9l26.4-14.2v-4.3l-3.7-3.1Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M491.48,193.85l-25.9,13.7-.3-.5,25.9-13.7Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M517.08,198.55l-11.1,9.1,28.3,13.7,9.9-10Z" fill="#191919" />
      <path
        d="M517,198.25l27.6,13.1-10.4,10.5-28.9-14Zm.1.7-10.6,8.7,27.6,13.4,9.5-9.6Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M510,204.35l.3-.2,27.8,13.4-.2.2Z" fill="#aaa" />
      <path d="M508.28,205.75l.3-.2,28.1,13.4-.2.2Z" fill="#aaa" />
      <path d="M515.78,199.35l.3-.2,27.8,13.4-.2.2Z" fill="#aaa" />
      <path d="M514.08,200.75l.3-.2,28.1,13.4-.2.2Z" fill="#aaa" />
      <path d="M368.18,220.35l10.5-7.2,18.2,1.8-10.2,7.6Z" fill="#191919" />
      <path
        d="M378.58,213.05l18.7,1.8-10.5,7.9-19-2.3Zm.1.3-10.1,6.9,18.1,2.2,9.8-7.3Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M538.38,146.75l-5.5,3-5.4-.5,6.2-3.4Z" fill="#191919" />
      <path d="M533.68,145.85l-6.2,3.4-5-.4,11.1-5.7Z" fill="#191919" />
      <path d="M542.48,144.45l-4.1,2.2h0l-4.7-.9-.1-2.7Z" fill="#191919" />
      <path d="M532.88,149.65v3.4l-10.4-1.2v-3.1l5,.4Z" fill="#191919" />
      <path d="M542.48,144.45v3.4l-9.6,5.2v-3.4l5.5-3h0Z" fill="#191919" />
      <path
        d="M533.58,142.75l9.2,1.4V148l-9.9,5.4-10.7-1.2v-3.6Zm-.3.8.1,2.1-6,3.2-3.9-.3Zm-10.5,5.6,4.7.4,5.1.4v2.8l-9.8-1.1Zm10.4,3.5v-2.8l5.3-2.9h0l3.7-2v2.7Zm8.4-8-7.7-1.2.1,2.1,4.3.8Zm-4.1,2.2-3.7-.7-5.3,2.9,4.3.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M378.18,218.25a4.36,4.36,0,0,0,6,1.62,4.3,4.3,0,0,0,1.63-1.62l-2.8-7.2h-2.3Z"
        fill="#aaa"
      />
      <path
        d="M380.38,210.75h2.7l2.9,7.6-.1.1-.3-.2.3.2h0l-.1.1c0,.1-.1.2-.2.3a6.72,6.72,0,0,1-.8.8,4.35,4.35,0,0,1-6,0l-.8-.8c-.1-.1-.2-.2-.2-.3a.11.11,0,0,0-.1-.1h0l.3-.2-.3.2-.1-.1Zm-1.8,7.5c0,.1.1.1.2.2a4.2,4.2,0,0,0,5.9.7l.7-.7c.1-.1.1-.1.1-.2l-2.7-6.9h-1.9Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M382.68,209.45c-.1-.2-.2-.3-.3-.5s-.3-.2-.5-.2a.76.76,0,0,0-.8.7,5.29,5.29,0,0,0-.4,1.2.78.78,0,0,0,.1.5c.1.1.1.3.3.4a1.08,1.08,0,0,0,.4.3.72.72,0,0,0,.5.1.89.89,0,0,0,.5-.1c.1-.1.3-.1.4-.3a1.5,1.5,0,0,0,.3-.4.78.78,0,0,0,.1-.5A6.12,6.12,0,0,1,382.68,209.45Z"
        fill="#aaa"
      />
      <path
        d="M380.78,209.35c.2-.3.4-.8,1-.8h0a.75.75,0,0,1,.6.3,1,1,0,0,1,.4.6,6.5,6.5,0,0,1,.4,1.2h0a.78.78,0,0,1-.1.5c-.1.2-.2.3-.3.5a2.37,2.37,0,0,1-.5.3,1,1,0,0,1-.5.1c-.1,0-.4,0-.5-.1a2.19,2.19,0,0,0-.5-.3,1.71,1.71,0,0,1-.3-.5.94.94,0,0,1-.1-.5h0A6.1,6.1,0,0,1,380.78,209.35Zm.4.2a2.17,2.17,0,0,0-.3,1.1.7.7,0,0,0,.1.4c.1.1.1.2.2.3s.2.2.3.2.2.1.4.1a.58.58,0,0,0,.4-.1c.1,0,.2-.1.3-.2s.2-.2.2-.3.1-.2.1-.4c-.1-.4-.2-.8-.3-1.1h0a.72.72,0,0,0-.6-.6,1,1,0,0,0-.8.6Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M378.88,219.35l2-7.7.6.2-2,7.7Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M381.28,215.55l-.7,4.7-.6-.1,1.2-8.3h.6l.2,8.6h-.6Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M381.68,211.85h.6l1.2,8.3-.6.1-.7-4.7-.1,4.9h-.6Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M384.38,219.55l-2.1-7.8.6-.2,2.1,7.8Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path d="M531.08,330.25v42.2l-17.8,20.6v-45.6Z" fill="#fff" />
      <path
        d="M531.18,330v42.6l-18.1,20.9v-46.1Zm-17.8,17.5v45.1l17.5-20.2v-41.8Z"
        fill="#fff"
        fill-rule="evenodd"
      />
      <path
        d="M521.18,364a.92.92,0,0,1-.84,1h-.06a1,1,0,0,1-.9-1,.89.89,0,0,1,.89-.9.91.91,0,0,1,.91.9Z"
        fill="#191919"
      />
      <path
        d="M525.08,361a.93.93,0,0,1-.84,1h-.06a1,1,0,0,1-.9-1,.91.91,0,0,1,.83-1h.07A1,1,0,0,1,525.08,361Z"
        fill="#191919"
      />
      <path d="M521.78,339.25l.9-.9v43.8l-.9,1Z" fill="#191919" />
      <path
        d="M522.78,338v44.2l-1.2,1.4v-44.4Zm-.9,1.3v43.5l.6-.7v-43.4Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M585.78,310v-55.6l10.6-10.2,1-.9,9.7-9.3v51.4l-9.7,11.2-1,1.1Z"
        fill="#fff"
      />
      <path
        d="M607.18,233.55v51.8l-21.5,24.9v-56.1Zm-9.6,9.7v52.9l9.4-10.8v-51Zm-.3,53.2v-52.9l-.7.6v53Zm-1,1.1v-53.1l-10.3,9.9v55.1Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M596.48,244.15l.9-.9v53.2l-.9,1Z" fill="#191919" />
      <path
        d="M597.48,243v53.6l-1.2,1.4v-53.8Zm-.9,1.3v52.9l.6-.7v-52.8Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M618.08,220.05l-48,45.8.6,2.1,47.9-45.5a1.44,1.44,0,0,0,.4-1.5C618.88,219.85,618.08,220.05,618.08,220.05Z"
        fill="#fff"
      />
      <path
        d="M618.38,222.15h0c.1-.1.1-.2.2-.3a1.5,1.5,0,0,0,.1-1q-.15-.6-.3-.6h-.1l-47.8,45.6.4,1.4Zm-47.7,45.7-.6-2.1,48-45.8s.7-.1.9.9a1.92,1.92,0,0,1-.4,1.5Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M571.18,266.85c0,.7-.3,1.2-.7,1.2s-.7-.5-.7-1.2.3-1.2.7-1.2S571.18,266.15,571.18,266.85Z"
        fill="#191919"
      />
      <path
        d="M570.68,267.55a1.35,1.35,0,0,0,0-1.4c-.1-.2-.2-.2-.3-.2s-.2,0-.3.2a1.31,1.31,0,0,0,0,1.4c.1.2.2.2.3.2S570.58,267.65,570.68,267.55Zm-.3.5c.4,0,.7-.5.7-1.2s-.3-1.2-.7-1.2-.7.5-.7,1.2S570,268.05,570.38,268.05Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path d="M534.38,117.15V111l2.2,1.2v4Z" fill="#fff" />
      <path
        d="M550.68,104.65l134.5,39v2.1l-1.6,1.6-54.6,52v12.9l-1.3,1.3h-6.9l2.7-2.5h1.2v-12.8l56.1-53.8-130-38-14.1,5.7-2.2-1.2Z"
        fill="#fff"
      />
      <path
        d="M550.68,104.55l134.6,39.1V146l-1.7,1.7h0l-54.6,52v12.9l-1.4,1.4h-7.3l3-2.8h1.1v-12.7l56-53.7-129.7-37.9-13.9,5.6v4l-2.5,1.2v-6.6Zm-14.1,7.4,14-5.7L681,144.45l-56.2,53.9v12.9h-1.3l-2.4,2.2h6.3v-15.3l57.4-54.4-134.2-39-16,6.1Zm-2.1-.8v5.7l1.9-.9v-3.8ZM685,144.05l-57.3,54.3v14.9l1-1v-12.9l54.6-52.1h0l1.6-1.6v-1.6Z"
        fill="#191919"
        fill-rule="evenodd"
      />
      <path
        d="M683.68,147.45v12.1L628,213.45c-.1.1-.2.1-.2,0s-.1-.2,0-.2l55.6-53.8v-12Z"
        fill="#aaa"
        fill-rule="evenodd"
      />
      <path
        d="M73,181.35H328l52.5,28.3"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M53.48,257.35h92.6l38.1,21"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M5.48,218.75h227.1l51.8,27.8"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M649,470.55H504.58l-68.3-21.5"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M702,403.75H557.18l-43.8-12.9"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M783,291.35H642.48l-37-11.2"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M810.48,256.25H668.38L622.28,241"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M725.48,368H582.28l-35.8-10.8"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M757.48,324H620.28l-84.8-28.8"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M779.88,228.45H690L648.48,216"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M171.78,150.65h229.5l78.7,42"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M300.58,117.65h181l50,26.2"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M582.48,25.15v104"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M678.08,52.65v107.2"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M517.68,59.65v145.5"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M249.08,432.65v-54"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M173.48,394.65v-90"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M345.08,481.45v-90"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      <path
        d="M428.18,494.35V358.25"
        fill="none"
        stroke="#82162c"
        stroke-miterlimit="10"
        stroke-width="0.75"
      />
      {textList.map((item, index) => (
        <TextItem item={item} key={index} index={index} />
      ))}
    </svg>
  )
}

export default PebGraph
