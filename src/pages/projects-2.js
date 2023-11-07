import React, { useMemo, useRef } from 'react'
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

const Tile = ({title, imageSrc, isEven, onTileClick, imgClassName}) => {



  const OFFSET_Y = useMemo(() => {
    // Calculate your constant value here

    const min = isEven ? 0 : -160;
    const max = isEven ? 160 : 0;

    const result = Math.floor(Math.random() * (max - min + 1)) + min;;
    return result;
  }, []); // An

  const dispatch = useGlobalDispatchContext()

  
  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  return (
    <div className='flex flex-col hover:scale-110 transition-all'>
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
        <div className='min-w-[282px] min-h-[385px] relative group' 
          onClick={onTileClick} 
          onMouseEnter={() => setCursor("big-hovered")}
          onMouseLeave={setCursor}
        >
          <img className={twMerge('object-cover object-center  w-full h-full absolute top-0 left-0', imgClassName)} alt='' src={imageSrc} />
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

  const [percentageScroll, setPercentageScroll] = useState(0)

  const scrollDiv = useRef(null)

  const handleTileClick = (e) => {
    console.log('click: ',e.target)
    e.target.scrollIntoView()

  }

  return (
    <Layout hideFooter>
    <Seo title="Projects" />
    <div className='w-screen h-screen bg-[#191919] relative z-0'>
      <div className='absolute top-20 w-screen flex items-center justify-center text-[7.5rem] z-0'>
        <div className='w-[80%] uppercase font-medium text-center text-[rgba(255,255,255,0.2)]'>
          What's your next destination
        </div>
      </div>
      <div className='absolute h-screen w-screen left-0 top-0 flex items-center px-[100px] z-10 gap-[200px] overflow-x-auto overflow-y-hidden hide-scroll-x'
        onScroll={(e)=>{
          const FULL_SCROLL_WIDTH = e.target.scrollWidth - window.innerWidth
          const CURRENT_SCROLL_LEFT = e.target.scrollLeft
          const percentage = (CURRENT_SCROLL_LEFT / FULL_SCROLL_WIDTH) * 100
          setPercentageScroll(percentage)
          console.log({CURRENT_SCROLL_LEFT, FULL_SCROLL_WIDTH, percentage})
        }}
        ref={scrollDiv}
      >
         {projects.map((tile, index) => (
          <Tile 
            title={tile.name}
            imageSrc={tile.image} 
            imgClassName={tile.className} 
            isEven={index % 2 === 0} 
            onTileClick={handleTileClick}
          />
         ))}
      </div>
      <div className='absolute w-screen bottom-20 flex justify-center'>
        <div className='relative'>
          <div className='w-40 h-1 rounded-l-full rounded-r-full  bg-[rgba(255,255,255,0.2)]'></div>
          <div className='absolute top-0  h-1 rounded-l-full rounded-r-full bg-white w-[20%]'
            style={{
              width: percentageScroll + '%'
            }}>
          </div>
        </div>
      </div>
    </div>
    
  </Layout>
  )
}

export default ProjectsTwo