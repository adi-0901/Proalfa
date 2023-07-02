import React, { useEffect, useRef } from 'react'
import SurveyingImage from '../assets/svg/services/surveying.svg'
import CivilWorkImage from '../assets/svg/services/civilwork.svg'
import ProductionImage from '../assets/svg/services/production.svg'
import ErectionImage from '../assets/svg/services/erection.svg'
import LottieMedia from './lottie/LottieMedia'
import PaperPlane from '../assets/lottie/paper_plane.json'
import PaperPlane2_1 from '../assets/lottie/paperplane_2.1.json'
import PaperPlane2_2 from '../assets/lottie/paperplane_2.2.json'
import PaperPlane2_3 from '../assets/lottie/paperplane_2.3.json'


const Services = () => {

    const services = [
        {
            img: SurveyingImage
        },
        {
            img: CivilWorkImage
        },
        {
            img: ProductionImage
        },
        {
            img: ErectionImage
        },
    ]

    const lottieRef = useRef(null)


    useEffect(() => {
        // const divTop = scrollRef.current.getBoundingClientRect().top
        // const el = scrollRef.current

        const planeOne = document.querySelectorAll('[clip-path="url(#__lottie_element_2)"]')[0]
        const overlays = overlayRef.current
        const overlayLeft = overlays.map(o => o.getBoundingClientRect().left)
        // temp1.getBoundingClientRect().left 
    
        document.addEventListener("wheel", (e) => {   
            const planeOneLeft = planeOne.getBoundingClientRect().left
            console.log('planeOne',overlays[0],  overlayLeft, planeOneLeft) 
            if((planeOneLeft - overlayLeft[0] ) > 0) overlays[0].style.marginLeft = `${planeOneLeft - overlayLeft[0]}px`
            if((planeOneLeft - overlayLeft[1] ) > 0) overlays[1].style.marginLeft = `${planeOneLeft - overlayLeft[1]}px`

 
        //   const scrollLeft = el.scrollLeft;
        //   const maxScrollLeft = el.scrollWidth - el.clientWidth;
    
        //   const scrollTopOffset = scrollRef.current.getBoundingClientRect().top
    
        //   console.log('eeee', e.deltaY, scrollLeft, maxScrollLeft)
    
        //   if(((scrollLeft >= (maxScrollLeft - 30)) && e.deltaY >= 1) || ((scrollLeft === 0) && e.deltaY < 1)) {
        //     setIsIntersecting(false)
        //     document.body.style.overflow = 'auto';
        //   }else if((scrollTopOffset <= 0) && e.deltaY >= 1){
        //     console.log('inside', scrollLeft, maxScrollLeft, e.deltaY)
        //     window.scrollTo(0, divTop)
        //     setIsIntersecting(true)
        //     document.body.style.overflow = 'hidden';
        //   }else if(e.deltaY < 1 && (scrollTopOffset > 0)){
        //     window.scrollTo(0, divTop)
        //     document.body.style.overflow = 'hidden';
        //     setIsIntersecting(true)
        //   }
        })
      }, [lottieRef])

      const overlayRef = useRef([]);


  return (
    <div className='my-4 relative'>
        <LottieMedia
            className={'w-full absolute top-[-200px z-50'} 
            animationData={PaperPlane2_1}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0, 0.93],
                    type: "seek",
                    frames: [0,144],
                },
                ],
            }}
            onDivSizeChange={(div) => {
                console.log('divv', div.clientHeight)
                // setDivHeight(div.clientHeight)
                // setDivWidth(div.clientWidth)
            }}
        />
         <LottieMedia
            className={'w-full absolute top-[500px]'} 
            style={{
                transform: 'scale(-1,1)'
            }}
            animationData={PaperPlane2_2}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0.1, 0.8],
                    type: "seek",
                    frames: [0,144],
                },
                ],
            }}
            onDivSizeChange={(div) => {
                console.log('divv', div.clientHeight)
                // setDivHeight(div.clientHeight)
                // setDivWidth(div.clientWidth)
            }}
        />
        <LottieMedia
            className={'w-full absolute top-[800px]'} 
            animationData={PaperPlane2_3}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0, 0.93],
                    type: "seek",
                    frames: [0,144],
                },
                ],
            }}
            onDivSizeChange={(div) => {
                console.log('divv', div.clientHeight)
                // setDivHeight(div.clientHeight)
                // setDivWidth(div.clientWidth)
            }}
        />
        <div className='stack '>
            {services.map( (service, index) => (
                <div className='flex justify-center items-center'>
                    { (index % 2 === 0) && <div className='flex-1 flex justify-center items-start relative overflow-hidden'>
                        <img src={service.img} alt='' />
                        <div ref={el => overlayRef.current[index] = el} className='absolute top-0 left-0 w-full h-full bg-[#191919] z-10'
                            style={{
                                marginLeft: '0px'
                            }}
                        />
                    </div>}
                    <div className='flex-1 flex justify-center items-center'>{ (index % 2 === 0) && (
                        <div></div>
                    )}</div>
                    <div className='flex-1 flex justify-center items-center' >{ (index % 2 === 1) && 'Hello'}</div>
                    { (index % 2 === 1) && <div className='flex-1 flex justify-center items-center relative'>
                        <img src={service.img} alt='' />
                        <div ref={el => overlayRef.current[index] = el} className='absolute top-0 left-0 w-full h-full bg-[#191919]  z-10'
                            style={{
                                marginLeft: '0px'
                            }}
                        />
                    </div>}
                </div>
            ) )}
        </div>
    </div>
  )
}

export default Services