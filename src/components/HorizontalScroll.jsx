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

  const [isIntersecting, setIsIntersecting] = useState(false)
  const scrollRef = useHorizontalScroll(isIntersecting, setIsIntersecting);
  const interRef = useRef(null)

  // useEffect(() => {
  //   const observer = new IntersectionObserver(([entry]) => {
  //     // setIsIntersecting(entry.isIntersecting);
  //     console.log('intersecting!!',  )
  //     if(window.scrollY) {
  //       document.body.style.overflow = 'hidden';
  //       setIsIntersecting(true)
  //     }
  //   });
  //   observer.observe(interRef.current);
  //   return () => observer.disconnect();
  // }, [interRef]);

  // useEffect(() => {
  //   const { top: divTop, height: divHeight} = scrollRef.current.getBoundingClientRect()

  //   console.log(divTop, 'eee', scrollRef.current.getBoundingClientRect())
  //   document.addEventListener("scroll", (e) => {
  //     const windowY = window.scrollY
  //     if((windowY > divTop) && (windowY < (divTop + divHeight) ) ){
  //       console.log('inside')
  //       window.scrollTo(0, divTop)
  //     }
  //   })
  // }, [scrollRef])


  return (
    <div className='relative'>
      <div className='absolute bottom-0' ref={interRef}></div>
      {/* <div className='absolute top-0'>isIntersecting: {isIntersecting ? 'true': 'false'}</div> */}

      <div
        className='w-auto mb-[100px] overflow-x-auto whitespace-nowrap h-[100vh] relative'
        ref={scrollRef}
      >
        {/* Content for testing */}
        <div className='mx-20 flex items-center h-full w-full'>
            <div className='text-[72px] mr-[150px]'>
              <p>Why go for</p>
              <p>pre-engineered</p>
              <p>solutions</p>
            </div>
            <div className='h-full py-10 mr-6'>
              <div className='border border-[#373737] rounded-[20px] h-full w-full  px-[100px] flex items-center justify-center'>
                <img className='max-w-[initial] mr-[150px]' alt="" src={RangeAndScope}  />
                <div>
                  <p className='mb-[26px] text-[36px] font-normal'>Range and Scope</p>
                  <div className='flex flex-col gap-y-6  w-max-[450px] w-[450px] overflow-hidden'>
                    {rangeAndScopePoints.map(point => (
                      <div className='flex items-center gap-x-4' key={point}>
                        <img src={RangeAndScopeBullet} alt="" />
                        <p className='text-base font-normal text-[#AAAAAA] text-ellipsis whitespace-[initial]'>{point}</p>
                      </div>
                    ))}
                  </div>
                  
                </div>
              </div>
            </div>
            <div className='h-full py-10  mr-6'>
              <div className='border border-[#373737] rounded-[20px] h-full w-full  px-[100px] flex items-center justify-center'>
                <img className='max-w-[initial] mr-[150px]' alt="" src={Advantages}  />
                <div>
                  <p className='mb-[26px] text-[36px] font-normal'>Range and Scope</p>
                  <div className='flex flex-col gap-y-6  w-max-[450px] w-[450px] overflow-hidden'>
                    {rangeAndScopePoints.map(point => (
                      <div className='flex items-center gap-x-4' key={point}>
                        <img src={AdvantagesBullet} alt="" />
                        <p className='text-base font-normal text-[#AAAAAA] text-ellipsis whitespace-[initial]'>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[1px] h-full text-transparent'>.</div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
