import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import ProjectAdisun from "../assets/images/projects/adisun_solar.jpg"
import ProjectBhairavnathFeeds from "../assets/images/projects/bhairavnath_feeds.jpg"
import ProjectGatiBattery from "../assets/images/projects/gati_battery.jpg"
import ProjectKuldeepGreens from "../assets/images/projects/kuldeep_greens.jpg"
import ProjectYashAgro from "../assets/images/projects/yash_agro.jpg"
import { twMerge } from 'tailwind-merge';
import Layout from '../components/Layout';
import Seo from '../components/seo';
import { useGlobalDispatchContext } from '../context/globalContext';
import LottieMedia from "../components/lottie/LottieMedia"
import CementTruck from '../assets/lottie/cement_truck.json'

const Tile = ({title, imageSrc, isEven, onTileClick, imgClassName, index, selected, isLastTile}) => {
  const OFFSET_Y = useMemo(() => {
    // Calculate your constant value here

    const min = isEven ? 0 : -160;
    const max = isEven ? 160 : 0;

    const result = Math.floor(Math.random() * (max - min + 1)) + min;;
    return result;
  }, []);

  const dispatch = useGlobalDispatchContext()

  
  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  const isSelected = selected === title

  return (
    <div className='flex flex-col justify-center items-center hover:scale-110 transition-all duration-1000 absolute ' style={{
      left: isSelected ? '20vw' : (index * 282) + ((index + 1) * 200),
      // right: isSelected ? 100 : -((index * 282) + ((index + 1) * 200)),
      display: selected ? isSelected ? 'block' : 'none' : 'block',
      paddingRight: isLastTile ? selected ? isSelected ? 0 : '200px' : 0 : 0, 
    }}>
      <div style={{
        height: OFFSET_Y + 'px'
      }}></div>
      <Tilt 
        glareEnable 
        glarePosition='all'  
        glareMaxOpacity={0.2} 
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
      >
        <div className='min-w-[282px] min-h-[385px] relative group ' 
          onClick={(e) => {
            e.stopPropagation()
            onTileClick(title)
          }} 
          onMouseEnter={() => setCursor("big-hovered")}
          onMouseLeave={setCursor}
          style={{
            width: isSelected ? '50vw' : 'unset'
          }}
        >
          <img className={twMerge('object-cover object-center  w-full h-full absolute top-0 left-0', imgClassName, isSelected ? 'object-fill' : '')} alt='' src={imageSrc} />
          <div className='absolute bottom-10 -left-10 text-[42px] text-[rgba(255,255,255,0.7)] group-hover:text-[rgba(255,255,255,1)] transition-all cursor-default uppercase '>
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
  },
  {
    name: "BHAIRAVNATH FEEDS",
    details: "51,000 SQFT",
    image: ProjectBhairavnathFeeds,
    className: 'object-fill'
  },
  {
    name: "YASH AGRO",
    details: "11,000 SQFT",
    image: ProjectYashAgro,
  },
  {
    name: "GATI BATTERY",
    details: "14,200 SQFT",
    image: ProjectGatiBattery,
  },
  {
    name: "KULDEEP GREENS RECYCLES",
    details: "15,000 SQFT WITH MAZZENINE",
    image: ProjectKuldeepGreens,
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


  const scrollDiv = useRef(null)
  const [selectedTile, setSelectedTile] = useState(null)

  const handleTileClick = (tileId) => {
    console.log('click: ',tileId)

    const {percentage, scrollLeft} = scrollHistory
    setLastScrollHistory({
      percentage,
      scrollLeft
    })

    setSelectedTile(tileId)
    scrollDiv.current.scrollTo({
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
      scrollDiv.current.scrollTo({
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

  useEffect(() => {
    const totalFrames = lottieRef.current.getDuration(true)
    setLottieTotalFrames(totalFrames)
  },[lottieRef])

  return (
    <Layout hideFooter>
    <Seo title="Projects" />
    <div className='w-screen h-screen bg-[#191919] relative z-0'>
      <div className='absolute top-20 w-screen flex items-center justify-center text-[5.5rem] z-0'>
        <div className='w-[80%] uppercase font-medium text-center text-[rgba(255,255,255,0.2)]'>
          Blending Elegance with Structural Strength
        </div>
      </div>
      <div className='absolute h-screen w-screen left-0 top-0 flex items-center justify-center px-[100px] z-10 overflow-x-auto overflow-y-scroll hide-scroll-x'
        onScroll={handleScroll}
        onClick={handleDeselectTile}
        ref={scrollDiv}
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
          />
         ))}
      </div>
      <LottieMedia
        className={'cement-truck absolute bottom-[-380px] pointer-events-none'} 
        ref={lottieRef} 
        animationData={CementTruck}
        autoplay={false}
      />

      {/* Scroll progress bar */}
      <div className='absolute w-screen bottom-20 flex justify-center transition-all duration-1000' 
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
      </div>

    </div>
    
  </Layout>
  )
}

export default ProjectsTwo