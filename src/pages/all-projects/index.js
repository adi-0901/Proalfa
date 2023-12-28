import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import ProjectAdisun from "../../assets/images/projects/adisun_solar.jpg"
import ProjectBhairavnathFeeds from "../../assets/images/projects/bhairavnath_feeds.jpg"
import ProjectGatiBattery from "../../assets/images/projects/gati_battery.jpg"
import ProjectKuldeepGreens from "../../assets/images/projects/kuldeep_greens.jpg"
import ProjectYashAgro from "../../assets/images/projects/yash_agro.jpg"
import { twMerge } from 'tailwind-merge';
import Layout from '../../components/Layout';
import Seo from '../../components/seo';
import { useGlobalDispatchContext } from '../../context/globalContext';
import LottieMedia from "../../components/lottie/LottieMedia"
import CementTruck from '../../assets/lottie/cement_truck2.json'

const Tile = ({title, imageSrc, isEven, onTileClick, imgClassName, index, selected, isLastTile, onTileHoverChange}) => {
  const OFFSET_Y = useMemo(() => {
    // Calculate your constant value here

    const min = isEven ? 0 : -160;
    const max = isEven ? 160 : 0;

    const result = Math.floor(Math.random() * (max - min + 1)) + min;;
    return result;
  }, [isEven]);

  const dispatch = useGlobalDispatchContext()
  const tiltRef = useRef()

  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  const isThisTileSelected = selected === title  

  useEffect(()=> {
    if(!isThisTileSelected || !tiltRef) return
    tiltRef.current.setSize()
  },[isThisTileSelected])

  const isMobile = window.innerWidth <= 360

  return (
    <div className='flex flex-col justify-center items-center hover:scale-110 transition-all duration-1000 absolute ' style={{
      left: isThisTileSelected ? '20vw' : (index * 282) + ((index + 1) * (isMobile ? 50 : 200)),
      // right: isSelected ? 100 : -((index * 282) + ((index + 1) * 200)),
      display: selected ? isThisTileSelected ? 'block' : 'none' : 'block',
      paddingRight: isMobile ? '50px' : isLastTile ? '200px': 0, 
    }}
    onMouseEnter={() => {
      onTileHoverChange(true, title)
    }}
    onMouseLeave={() => {
      onTileHoverChange(false, title)
    }}
    >
      {(!isThisTileSelected && !isMobile) && <div style={{
        height: OFFSET_Y + 'px'
      }}></div>}
      <Tilt 
        ref={tiltRef}
        glareEnable 
        glarePosition='all'  
        glareMaxOpacity={0.2} 
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
      >
        <div className='min-w-[282px] min-h-[385px] relative group ' 
          onClick={(e) => {
            e.stopPropagation()
            if(window.innerWidth <= 360) return
            
            onTileClick(title)
          }} 
          onMouseEnter={() => setCursor("big-hovered")}
          onMouseLeave={() => {
            if(selected){
              setCursor("xmark")
            }
          }}
          style={{
            width: isThisTileSelected ? '50vw' : 'unset'
          }}
        >
          <img className={twMerge('object-cover object-center w-full h-full absolute top-0 left-0 select-none', imgClassName, isThisTileSelected ? 'object-fill' : '')} alt='' src={imageSrc} />
          <div className='absolute bottom-10 mobile:-left-10 left-3 text-[36px] text-[rgba(255,255,255,0.9)] group-hover:text-[rgba(255,255,255,1)] transition-all cursor-default capitalize  font-semibold '>
            {title}
          </div>
        </div>
      </Tilt>
    </div>
  )
}

const projects = [
  {
    name: "ADISUN SOLAR",
    details: "12000 SQFT",
    image: ProjectAdisun,
    bgColor: 'rgba(147, 69, 56, 0.5)',
    bgHoverColor: 'rgba(147, 69, 56, 0.1)',
  },
  {
    name: "BHAIRAVNATH FEEDS",
    details: "51,000 SQFT",
    image: ProjectBhairavnathFeeds,
    className: 'object-fill',
    bgColor: 'rgba(150, 161, 71, 0.3)',
    bgHoverColor: 'rgba(150, 161, 71, 0.10)',
  },
  {
    name: "YASH AGRO",
    details: "11,000 SQFT",
    image: ProjectYashAgro,
    bgColor: 'rgba(155, 179, 225, 0.5)',
    bgHoverColor: 'rgba(155, 179, 225, 0.10)',
  },
  {
    name: "KULDEEP GREENS RECYCLES",
    details: "15,000 SQFT WITH MAZZENINE",
    image: ProjectKuldeepGreens,
    bgColor: 'rgba(229, 182, 146, 0.5)',
    bgHoverColor: 'rgba(229, 182, 146, 0.10)',
    
  },
  {
    name: "GATI BATTERY",
    details: "14,200 SQFT",
    image: ProjectGatiBattery,
    bgColor: 'rgba(106, 155, 241, 0.5)',
    bgHoverColor: 'rgba(106, 155, 241, 0.10)',
  },
]
  
const ProjectsTwo = () => {

  const [scrollHistory, setScrollHistory] = useState({
    percentage: 0,
    scrollLeft: 0
  })
  const [lastScrollHistory, setLastScrollHistory] = useState({
    percentage: 0,
    scrollLeft: 0
  })

  const [lottieTotalFrames, setLottieTotalFrames] = useState(0)

  const scrollRef = useRef(null)
  const lottieRef = useRef(null)


  const [selectedTile, setSelectedTile] = useState(null)
  const [hoveredTile, setHoveredTile] = useState(null)

  const handleTileClick = (tileId) => {
    const {percentage, scrollLeft} = scrollHistory
    setLastScrollHistory({
      percentage,
      scrollLeft
    })

    setSelectedTile(tileId)
    scrollRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    lottieRef.current.play()
  }

  const handleDeselectTile = () => {
    setSelectedTile(null)    
    const {percentage, scrollLeft} = lastScrollHistory

    setTimeout(() => {
      setScrollHistory({
        percentage,
        scrollLeft
      })  
      scrollRef.current.scrollTo({
        top: 0,
        left: scrollLeft,
        behavior: "smooth",
      })

    }, 100)
  }

  const handleLottieFrame = (percentage) => {
    if(lottieTotalFrames === 0) return
    if(selectedTile) return

    const lottieFrame = Math.round((percentage * lottieTotalFrames) / 100)
    lottieRef.current.goToAndStop(lottieFrame,true)
  }

  const handleScroll = (e)=> {
    const FULL_SCROLL_WIDTH = e.target.scrollWidth - window.innerWidth
    const CURRENT_SCROLL_LEFT = e.target.scrollLeft
    const percentage = (CURRENT_SCROLL_LEFT / FULL_SCROLL_WIDTH) * 100

    if(isNaN(percentage)) return

    setScrollHistory({
      percentage,
      scrollLeft: CURRENT_SCROLL_LEFT
    })
    handleLottieFrame(percentage)
  }

  const onWheel = (event, scrollElement) => {
    if (!scrollElement || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return

    scrollElement.scrollTo(scrollElement.scrollLeft + (event.deltaY * 1), 0)
  }

  useEffect(() => {
    const totalFrames = lottieRef.current.getDuration(true)
    setLottieTotalFrames(totalFrames - 1)
  },[lottieRef])

  useEffect(() => {
    if (
      !scrollRef.current ||
      (typeof window === "object" && window?.innerWidth < 768)
    )
      return
      
    const scrollElement = scrollRef.current
    document.addEventListener("wheel", event => onWheel(event, scrollElement), {passive: true})

    return () => {
      document.removeEventListener("wheel", onWheel)
    }
  }, [scrollRef])

  const getBgColor = () => {
    
    if(selectedTile){
      return projects?.find?.(project => project.name === selectedTile)?.bgColor
    }else if(hoveredTile){
      return projects?.find?.(project => project.name === hoveredTile)?.bgHoverColor
    }else{
      return 'rgba(25, 25, 25, 1)'
    }
  }

  const dispatch = useGlobalDispatchContext()

  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }


  return (
    <Layout hideFooter>
    <Seo title="Projects" />
    <div className='w-screen h-screen relative z-0 transition-all duration-1000' style={{
      background: getBgColor()  
    }}
    onMouseEnter={(e) => {
      console.log(e.target, e.target.id)
      if(selectedTile && e.target.id === 'tile-parent'){
        if(selectedTile){
          setCursor("xmark")
        }
      }
    }}
    >
      <div className='absolute top-20 w-screen flex items-center justify-center text-[5.5rem] z-0' id='project-parent'>
        <div className='w-[80%] uppercase font-medium text-center text-[rgba(255,255,255,0.05)]'>
          Blending Elegance with Structural Strength
        </div>
      </div>
      <div id='tile-parent' className='absolute h-screen w-screen left-0 top-0 flex items-center justify-center px-[100px] z-10 overflow-x-auto overflow-y-hidden hide-scroll-x'


        onScroll={handleScroll}
        onClick={handleDeselectTile}
        ref={scrollRef}
      >
         {projects.map((tile, index) => (
          <Tile 
            key={index}
            title={tile.name}
            imageSrc={tile.image} 
            imgClassName={tile.className} 
            isEven={index % 2 === 0} 
            isLastTile={projects.length === index + 1}
            onTileClick={handleTileClick}
            index={index}
            selected={selectedTile}
            bgColor={tile.bgColor}
            onTileHoverChange={(hovered,title) => {
              setHoveredTile(hovered ? title : null)
            }}
          />
         ))}
      </div>
      <LottieMedia
        className={'cement-truck absolute bottom-0 pointer-events-none opacity-70'} 
        ref={lottieRef} 
        animationData={CementTruck}
        autoplay={false}
      />

      {/* Scroll progress bar */}
      {/* <div className='absolute w-screen bottom-20 flex justify-center transition-all duration-1000' 
        style={{
          opacity: selectedTile ? 0 : 1 
        }}
      >
        <div className='relative'>
          <div className='w-40 h-1 rounded-l-full rounded-r-full  bg-[rgba(255,255,255,0.2)]'></div>
          <div className='absolute top-0  h-1 rounded-l-full rounded-r-full bg-white w-[20%]'
            style={{
              width: scrollHistory?.percentage + '%'
            }}>
          </div>
        </div>
      </div> */}

    </div>
    
  </Layout>
  )
}

export default ProjectsTwo