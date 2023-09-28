import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
// import LottieApplications from '../../assets/lottie/proalfa_3.7.json' // with text
import LottieApplications from '../../assets/lottie/proalfa_final_without_text.json'
import LottieMedia from '../../components/lottie/LottieMedia'
import { useState } from 'react'
import ScrollDown from '../../components/ScrollDown'
import Seo from "../../components/seo"

const Applications = () => {

  const lottieRef = useRef(null)

    const [divHeight, setDivHeight] = useState(0)
    const [divWidth, setDivWidth] = useState(0)

    const itemsRef = useRef([]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
       itemsRef.current = itemsRef.current.slice(0, 7);
    }, []);


    useEffect(() => {
      const observer = new IntersectionObserver(([entry])  => {
        if(entry.isIntersecting) {
          // console.log('intersecting!!', entry.target.getAttribute('index'))
          entry.target.style.opacity = 1
        }
      }, {
        // rootMargin: '-300px'
      });

      observer.observe(itemsRef.current[0]);
      observer.observe(itemsRef.current[1]);
      observer.observe(itemsRef.current[2]);
      observer.observe(itemsRef.current[3]);
      observer.observe(itemsRef.current[4]);
      observer.observe(itemsRef.current[5]);
      observer.observe(itemsRef.current[6]);
      return () => observer.disconnect();
    }, [itemsRef]);

    const items = [
      {top: divHeight * 0.115, width: divWidth * 0.4, left: divWidth * 0.06, title: 'Industrial', description: `Explore our tailored pre-engineered building solutions for manufacturing plants, warehouses, and 
                  distribution centres, designed for functionality, efficiency, and cost-effectiveness`},
      {top: divHeight * 0.2, width: divWidth * 0.4, right: divWidth * 0.02, title: `Institutional`, description: `Discover our customizable pre-engineered buildings for educational institutions, 
                healthcare facilities, government buildings, and more, ensuring safe and adaptable spaces for various institutional needs`},
      {top: divHeight * 0.347, width: divWidth * 0.4, left: divWidth * 0.06, title: `Commercial`, description: `Experience our versatile pre-engineered structures for retail spaces, 
                  offices, showrooms, and other commercial establishments, combining aesthetics, functionality, and quick construction timelines`},
      {top: divHeight * 0.453, width: divWidth * 0.35, right: divWidth * 0.015, title: `Heavy Industrial`, description: `Unlock the potential of our robust pre-engineered 
                  solutions for heavy industrial sectors, such as power plants, refineries, and manufacturing facilities, 
                  offering durability and specialized features`},
      {top: divHeight * 0.64, width: divWidth * 0.3,left: divWidth * 0.06, title: `Recreational`, description: `Enhance your leisure and entertainment spaces with our pre-engineered buildings for sports complexes, 
                recreational centres, and community halls, providing flexibility and aesthetic appeal`},
      {top: divHeight * 0.777,width:divWidth * 0.3 , right: divWidth * 0.04, title: `Agricultural`, description: `Explore our efficient and customizable pre-engineered 
                buildings for agricultural purposes, including barns, storage facilities, and livestock shelters, designed to optimise productivity and sustainability`},
      {top: divHeight * 0.925, width: divWidth * 0.3, left: divWidth * 0.06, title: `Energy`, description: `Embrace renewable power with our integrated solar panel solutions, optimizing clean energy generation and sustainability`},
    ]


  return (
    <Layout>
      <Seo title="Applications" />

      <div className='md:mx-20 mx-10 mt-40'>
        <div className='flex justify-between md:flex-row flex-col md:gap-0 gap-10'>
          <p className='md:text-[2rem] text-xl w-full font-bold leading-[40px]'>
            Dive into the world of pre-engineered building solutions at Proalfa, 
            where we excel in creating customized structures across various sectors.
          </p>
          <ScrollDown />

        </div>
        <p className="text-xl mt-10 md:block hidden">
          With a wealth of expertise across various sectors, we specialize in creating customized structures that redefine functionality, 
          sustainability, and aesthetics. From industrial complexes to institutional spaces, commercial establishments to 
          heavy industrial sites, recreational facilities to agricultural spaces, and innovative energy solutions, 
          we are your partner in turning ideas into exceptional structures. 
          Explore our comprehensive range of offerings and let us help you shape the future of construction, 
          where precision and creativity converge to build a better tomorrow.
        </p>  

      </div>


        <div className='relative'>
            {items.map((item, index) => (
              <div className='absolute' 
                key={index}
                ref={el => itemsRef.current[index] = el}
                index={index}
                style={{
                  top: `${item.top}px`,
                  width: `${item.width}px`,
                  left: item.left ? `${item.left}px` : undefined,
                  right: item.right ? `${item.right}px` : undefined,
                  opacity: 0,
                  transition: '0.3s opacity ease-in-out'
                }}>
                  <div className='md:text-[40px] sm:text-[32px] text-[20px] font-bold text-[#e5e5e5] '>{item.title}</div>
                  <div className='text-[#b1b1b1] leading-[150%] mt-3 md:text-base  sm:text-[12px] text-[0px]'>{item.description}</div>
              </div>
            ))}
            <LottieMedia
                className={'w-full static mb-20'} 
                ref={lottieRef}
                animationData={LottieApplications}
                interactivity={{
                  mode: 'scroll',
                  actions: [
                    {
                      visibility: [0, 0.9],
                      type: "seek",
                      frames: [0,2100],
                    },
                  ],
                }}
                onDivSizeChange={(div) => {
                  // console.log('divv', div.clientHeight)
                  setDivHeight(div.clientHeight)
                  setDivWidth(div.clientWidth)
                }}
            />
        </div>
        <p className="text-xl mt-10 md:hidden block mx-10 mb-20">
          With a wealth of expertise across various sectors, we specialize in creating customized structures that redefine functionality, 
          sustainability, and aesthetics. Join us in shaping the future of construction, 
          where precision and creativity converge to build a better tomorrow.
        </p> 
    </Layout>
   
  )
}

export default Applications