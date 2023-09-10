import React, { useEffect, useRef } from 'react'
import SurveyingImage from '../assets/svg/services/surveying.svg'
import CivilWorkImage from '../assets/svg/services/civilwork.svg'
import ProductionImage from '../assets/svg/services/production.svg'
import ErectionImage from '../assets/svg/services/erection.svg'
import LottieMedia from './lottie/LottieMedia'
import PaperPlane2_1 from '../assets/lottie/paperplane_2.1.json'
import PaperPlane2_2 from '../assets/lottie/paperplane_2.2.json'
import PaperPlane2_3 from '../assets/lottie/paperplane_2.3.json'


const Services = () => {

    const services = [
        {
            img: SurveyingImage,
            title: 'Surveying',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.`
        },
        {
            img: CivilWorkImage,
            title: 'Civil work',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.`
        },
        {
            img: ProductionImage,
            title: 'Production',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.`
        },
        {
            img: ErectionImage,
            title: 'Erection',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.`
        },
    ]

    const lottieRef = useRef(null)

    let planeOne,planeTwo,planeThree, overlayLeft,overlayRight,overlays

    const onWheel = (e) => {  
        if(window.location.pathname !== '/') {
            document.removeEventListener('wheel', onWheel);
            return
        }
        if(!planeOne || !planeTwo || !planeThree) attachPlanes()
        
     

        const planeOneLeft = planeOne.getBoundingClientRect().left
        const planeTwoLeft = planeTwo.getBoundingClientRect().left
        const planeThreeLeft = planeThree.getBoundingClientRect().left

        if(e.deltaY > 0){
            planeOne.classList.remove("plane-up");
            planeTwo.classList.remove("plane-up");
            planeThree.classList.remove("plane-up");
        }else{
            planeOne.classList.add("plane-up");
            planeTwo.classList.add("plane-up");
            planeThree.classList.add("plane-up");
        }


        console.log('deltaY', e.deltaY )
        
        // planeOne.style.transform = 'scale(-1,1)'
        console.log(planeOne, 'planeOne')
        console.log('services: overlays', overlays, overlayRef)

        console.log('planeThree', planeThree, overlays[3])
        if((planeOneLeft - overlayLeft[0] ) > 0) {
            console.log('crossing 0')
            overlays[0].style.background = 'linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)'
            overlays[0].style.marginLeft = `${planeOneLeft - overlayLeft[0]}px`
        }
        if((planeOneLeft - overlayLeft[1] ) > 0) {
            console.log('crossing 1')
            overlays[1].style.background = 'linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)'
            overlays[1].style.marginLeft = `${planeOneLeft - overlayLeft[1]}px`
        }
        if(((planeTwoLeft + 100) - overlayRight[2] ) < 0) {
            console.log('crossing 2')
            overlays[2].style.background = 'linear-gradient(to left,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)'
            overlays[2].style.marginLeft = `${(planeTwoLeft + 100) - overlayRight[2]}px`
        }
        if((planeThreeLeft - overlayLeft[3]) > 0) {
            console.log('crossing 3')
            overlays[3].style.background = 'linear-gradient(to right,  rgba(25, 25, 25, 0), rgb(25, 25, 25) 20%)'
            overlays[3].style.marginLeft = `${planeThreeLeft - overlayLeft[3]}px`
        }
    }

    const attachPlanes = () => {
        console.log('services: plane ', document.querySelectorAll('g[clip-path^=url]'))
        planeOne = document.querySelectorAll('g[clip-path^=url]')[0]
        planeTwo = document.querySelectorAll('g[clip-path^=url]')[1]
        planeThree = document.querySelectorAll('g[clip-path^=url]')[2]
    }


    useEffect(() => {
        console.log('services: useEffect ', window.location.pathname)
        // const divTop = scrollRef.current.getBoundingClientRect().top
        // const el = scrollRef.current
         attachPlanes()

         overlays = overlayRef.current
         if(!overlays) return
         overlayLeft = overlays.map(o => o.getBoundingClientRect().left)
         overlayRight = overlays.map(o => (o.getBoundingClientRect().left + o.getBoundingClientRect().width))

        // temp1.getBoundingClientRect().left 

    
        document.addEventListener("wheel", onWheel)

        return(() => {
        console.log('services: kill ', window.location.pathname)

        document.removeEventListener('wheel', onWheel);
        })
        
      }, [lottieRef])

      const overlayRef = useRef([]);


  return (
    <div className='my-4 relative mb-[200px]'>
        <LottieMedia
            className={'w-full absolute top-[-200px] z-50'} 
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
            className={'w-full absolute top-[500px] z-50'} 
            style={{
                transform: 'scale(-1,1)'
            }}
            animationData={PaperPlane2_2}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0.3, 1],
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
            className={'w-full absolute top-[1000px] z-50'}
            animationData={PaperPlane2_3}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0.35, 0.93],
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
        <div className='stack relative py-20'>
            <div className='absolute w-screen top-0 h-full left-0 bg-transparent'>
                <div className='grid-lines h-full'/>
            </div>
            <div className='text-center text-[4rem] uppercase font-bold pb-20'>OUR SERVICES</div>
            {services.map( (service, index) => (
                <div className='flex justify-center items-center' key={index}>
                    { (index % 2 === 0) && <div className='flex-1 flex justify-center items-start relative overflow-hidden'>
                        <img src={service.img} alt='' />
                        <div ref={el => overlayRef.current[index] = el} className='absolute top-0 left-0 w-full h-full z-10'
                            style={{
                                marginLeft: '0px',
                                transition: '0.1s all ease-in-out',
                                background: '#191919'
                            }}
                        />
                    </div>}
                    <div className='flex-1 flex justify-center items-center'>{ (index % 2 === 0) && (
                        <div>
                            <p className='text-[32px] font-normal uppercase mb-4'>{service.title}</p>
                            <p className='font-normal '>{service.description}</p>
                        </div>
                    )}</div>
                    <div className='flex-1 flex justify-center items-center' >{ (index % 2 === 1) && (
                        <div>
                            <p className='text-[32px] font-normal uppercase mb-4'>{service.title}</p>
                            <p className='font-normal '>{service.description}</p>
                        </div>
                    )}</div>
                    { (index % 2 === 1) && <div className='flex-1 flex justify-center items-center relative'>
                        <img src={service.img} alt='' />
                        <div ref={el => overlayRef.current[index] = el} className='absolute top-0 left-0 w-full h-full bg-[#191919]  z-10'
                            style={{
                                marginLeft: '0px',
                                transition: '0.1s all ease-in-out',
                                background: '#191919'
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