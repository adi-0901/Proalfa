// import React, { useEffect, useRef } from 'react'

// const HorizontalScroll = () => {

//     const divRef = useRef(null);
    

//     useEffect(() => {
//       const handleScroll = () => {
//         const divTop = divRef.current.getBoundingClientRect().top;
//         if (divTop <= 0) {
//           // Perform your action here when the top of the div touches the top of the viewport
//           console.log('Top of the div touched the top of the viewport');
//         }
//       };
  
//       window.addEventListener('scroll', handleScroll);
  
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }, []);
  
    

//   return (
//     <div className="w-[2000px] overflow-x-scroll h-screen bg-[red]" ref={divRef}>
//         Hello
//     </div>
//   )
// }

// export default HorizontalScroll

import React, { useEffect, useRef } from 'react';
import RangeAndScope from '../assets/svg/why_range_scope.svg'
import RangeAndScopeBullet from '../assets/svg/openmoji_telescope.svg'
import Advantages from '../assets/svg/why_advantages.svg'
import AdvantagesBullet from '../assets/svg/ph_warehouse.svg'
import useHorizontalScroll from '../hooks/useHorizontalScroll';
import { useState } from 'react';



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
    "Speedy construction and implementation"
  ]

  const [isIntersecting, setIsIntersecting] = useState(false)
  const scrollRef = useHorizontalScroll(isIntersecting, setIsIntersecting);
  const interRef = useRef(null)

  console.log('isIntersecting: ', isIntersecting  )


  // useEffect(() => {
  //   const observer = new IntersectionObserver(([entry]) => {
  //     // setIsIntersecting(entry.isIntersecting);
  //     if(window.scrollY) {
  //       // document.body.style.overflow = 'hidden';
  //       setIsIntersecting(true)
  //     }
  //   });
  //   observer.observe(interRef.current);
  //   return () => observer.disconnect();
  // }, [interRef]);

  const onWheel = (e,el) => {      
    console.log('scrollRef?.current', scrollRef?.current)
    if(!scrollRef?.current) return
    
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    const scrollTopOffset = scrollRef?.current?.getBoundingClientRect()?.top

    if(((scrollLeft >= (maxScrollLeft - 30)) && e.deltaY >= 1) || ((scrollLeft === 0) && e.deltaY < 1)) {
      setIsIntersecting(false)
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';

    }else if((scrollTopOffset <= 0) && e.deltaY >= 1){
      console.log('inside', scrollLeft, maxScrollLeft, e.deltaY)
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top)
      setIsIntersecting(true)
      document.body.style.overflow = 'hidden';
    }else if(e.deltaY < 1 && (scrollTopOffset > 0)){
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top)
      document.body.style.overflow = 'hidden';
      setIsIntersecting(true)
    }
  }

  useEffect(() => {
    if(!scrollRef.current) return
    const el = scrollRef.current

    document.addEventListener("wheel", (e) => onWheel(e,el))

    return () => document.removeEventListener("wheel", onWheel)

  }, [scrollRef])

  const whyChooseList = [
    {
      image: RangeAndScope,
      title: 'Range and Scope',
      list: rangeAndScopePoints,
      listBulletImage: RangeAndScopeBullet,
    },
    {
      image: Advantages,
      title: 'Advantages of PEB',
      list: advantagesPoints,
      listBulletImage: AdvantagesBullet,

    }
  ]


  return (
    <div className='relative'>
      <div className='absolute bottom-0' ref={interRef}></div>
      <div
        className='w-auto mb-[100px] overflow-x-auto whitespace-nowrap h-[100vh] relative horizontal-scroll'
        ref={scrollRef}
      >
        <div className='md:mx-20 mx-5 flex items-center h-full w-full'>
            <div className='md:text-[72px] text-[40px] mr-[150px]'>
              <p>Why go for</p>
              <p>pre-engineered</p>
              <p>solutions</p>
            </div>

            {whyChooseList.map(({image,title, list, listBulletImage}) => <div key={title} className='h-full py-10 mr-6'>
              <div className='border border-[#373737] rounded-[20px] h-full w-full  px-[100px] flex items-center justify-center overflow-hidden'>
                <img className='max-w-[initial] mr-[150px]' alt="" src={image}  />
                <div>
                  <p className='mb-[26px] text-[36px] font-normal'>{title}</p>
                  <div className='flex flex-col gap-y-6  md:w-max-[450px] md:w-[450px] w-[90vw] overflow-hidden'>
                    {list.map(point => (
                      <div className='flex items-center gap-x-4' key={point}>
                        <img src={listBulletImage} alt="" />
                        <p className='text-base font-normal text-[#AAAAAA] text-ellipsis whitespace-break-spaces'>{point}</p>
                      </div>
                    ))}
                  </div>
                  
                </div>
              </div>
            </div>)}
            <div className='w-[1px] h-full text-transparent'>.</div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
