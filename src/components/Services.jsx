import React, { useRef } from 'react'
import SurveyingImage from '../assets/svg/services/surveying.svg'
import CivilWorkImage from '../assets/svg/services/civilwork.svg'
import ProductionImage from '../assets/svg/services/production.svg'
import ErectionImage from '../assets/svg/services/erection.svg'
import LottieMedia from './lottie/LottieMedia'
import PaperPlane from '../assets/lottie/paper_plane.json'

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

  return (
    <div className='my-4 relative'>
        <LottieMedia
            className={'w-full absolute top-0'} 
            animationData={PaperPlane}
            ref={lottieRef}
            interactivity={{
                mode: 'scroll',
                actions: [
                {
                    visibility: [0, 0.9],
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
        Hello
        <div className='stack '>
            {services.map( (service, index) => (
                <div className='flex justify-center items-center'>
                    { (index % 2 === 0) && <div className='flex-1 flex justify-center items-start'>
                        <img src={service.img} alt='' />
                    </div>}
                    <div className='flex-1 flex justify-center items-center'>{ (index % 2 === 0) && 'Hello'}</div>
                    <div className='flex-1 flex justify-center items-center' >{ (index % 2 === 1) && 'Hello'}</div>
                    { (index % 2 === 1) && <div className='flex-1 flex justify-center items-center'>
                        <img src={service.img} alt='' />
                    </div>}
                </div>
            ) )}
        </div>
    </div>
  )
}

export default Services