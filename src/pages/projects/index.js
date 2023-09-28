import React from 'react'
import Layout from '../../components/Layout'
import Seo from "../../components/seo"
import ProjectAdisun from '../../assets/images/projects/adisun_solar.jpg'
import ProjectBhairavnathFeeds from '../../assets/images/projects/bhairavnath_feeds.jpg'
import ProjectGatiBattery from '../../assets/images/projects/gati_battery.jpg'
import ProjectKuldeepGreens from '../../assets/images/projects/kuldeep_greens.jpg'
import ProjectYashAgro from '../../assets/images/projects/yash_agro.jpg'


const projects = [
  {
    name: 'ADISUN SOLAR',
    details: '12000 SQFT',
    image: ProjectAdisun
  },
  {
    name: 'BHAIRAVNATH FEEDS',
    details: '51,000 SQFT',
    image: ProjectBhairavnathFeeds
  },
  {
    name: 'YASH AGRO',
    details: '11,000 SQFT',
    image: ProjectYashAgro
  },
  {
    name: 'GATI BATTERY',
    details: '14,200 SQFT',
    image: ProjectGatiBattery
  },
  {
    name: 'KULDEEP GREENS RECYCLES',
    details: '15,000 SQFT WITH MAZZENINE',
    image: ProjectKuldeepGreens
  },
]

const Projects = () => {
  return (
    <Layout>
      <Seo title="Projects" />
      <div className='my-40 md:mx-20 mx-10'>

      <div className='flex flex-col gap-28 w-full'>
              {projects.map(({name,details,image}, index) => (<div key={name}>
                <div className={`flex items-center md:gap-10 gap-4 flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  <div className={`overflow-hidden md:border-[18px] border-[10px] border-white ${index % 2 === 0 ? 'rounded-tl-[50px] rounded-br-[50px]' : 'rounded-tr-[50px] rounded-bl-[50px]' } `}>
                    <img src={image} alt={name} className='md:max-w-[50vw]' />
                  </div>
                  <div className='flex flex-col items-start text-center'>
                    <div className='md:text-[2rem] text-xl w-full font-bold leading-[40px]'>{name}</div>
                    <div className='md:text-[1.5rem] text-lg w-full font-semibold leading-[40px]'>{details}</div>
                  </div>
                </div>
              </div>))}
      </div>
      </div>
        
    </Layout>
  )
}

export default Projects