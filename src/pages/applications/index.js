import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
// import LottieApplications from '../../assets/lottie/proalfa_3.7.json' // with text
import LottieApplications from '../../assets/lottie/proalfa_final_without_text.json'
import LottieMedia from '../../components/lottie/LottieMedia'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useGlobalDispatchContext } from '../../context/globalContext'

const Applications = () => {

  const lottieRef = useRef(null)

  const [maxFrames, setMaxFrames] = useState(720)
  const [visibility, setVisibility] = useState([0,0.8])

  const dispatch = useGlobalDispatchContext()

  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  const formik = useFormik({
    initialValues: {
      minVisibility: 0,
      maxVisibility: 0.8,
      maxFrames: 720,
      notes: null
    },
    isInitialValid: false,
    enableReinitialize: true,
    validationSchema: Yup.object({
      minVisibility: Yup.number().min(0).max(1.0)
        .required('Please enter value in decimal')
        .typeError('Please enter value in decimal'),
      maxVisibility: Yup.number().min(0).max(1.5)
        .required('Please enter value in decimal')
        .typeError('Please enter value in decimal'),
      maxFrames: Yup.number()
        .required('Please enter number')
        .typeError('Please enter number'),
    }),
    onSubmit: (values) => {
      console.log(values)
      const {maxFrames, maxVisibility, minVisibility} = values
      setMaxFrames(maxFrames)
      setVisibility([minVisibility, maxVisibility])
    }
  })

    useEffect(() => {
        console.log('lottieRef: ', lottieRef.current)
        console.log(lottieRef.current)
    }, [lottieRef])

    const getInteractivity = () => {
        console.log(visibility,maxFrames)
        return {
            mode: 'scroll',
            actions: [
              {
                visibility: visibility,
                type: "seek",
                frames: [0,maxFrames],
              },
            ],
          }
    }

    const [divHeight, setDivHeight] = useState(0)
    const [divWidth, setDivWidth] = useState(0)

    const itemsRef = useRef([]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
       itemsRef.current = itemsRef.current.slice(0, 7);
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // setIsIntersecting(entry.isIntersecting);
        console.log('intersecting!!', entry.target.getAttribute('name') )
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
      {top: divHeight * 0.225, width: divWidth * 0.4, right: divWidth * 0.02, title: `Institutional`, description: `Discover our customizable pre-engineered buildings for educational institutions, 
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
        <div className='relative'>
            {items.map((item, index) => (
              <div className='absolute' 
              ref={el => itemsRef.current[index] = el}
              name='hello'
              style={{
                top: `${item.top}px`,
                width: `${item.width}px`,
                left: item.left ? `${item.left}px` : undefined,
                right: item.right ? `${item.right}px` : undefined,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>{item.title}</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>{item.description}</div>
            </div>
            ))}
            {/* <div className='absolute' 
              ref={el => itemsRef.current[0] = el}
              name='hello'
              style={{
                top: `${divHeight * 0.115}px`,
                width: `${divWidth * 0.4}px`,
                left: `${divWidth * 0.06}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Industrial</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Explore our tailored pre-engineered building solutions for manufacturing plants, warehouses, and 
                  distribution centres, designed for functionality, efficiency, and cost-effectiveness</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[1] = el} 
              style={{
                top: `${divHeight * 0.225}px`,
                width: `${divWidth * 0.4}px`,
                right: `${divWidth * 0.02}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Institutional</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Discover our customizable pre-engineered buildings for educational institutions, 
                healthcare facilities, government buildings, and more, ensuring safe and adaptable spaces for various institutional needs</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[2] = el} 
              style={{
                top: `${divHeight * 0.347}px`,
                width: `${divWidth * 0.4}px`,
                left: `${divWidth * 0.06}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Commercial</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Experience our versatile pre-engineered structures for retail spaces, 
                  offices, showrooms, and other commercial establishments, combining aesthetics, functionality, and quick construction timelines.</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[3] = el} 
              style={{
                top: `${divHeight * 0.453}px`,
                width: `${divWidth * 0.35}px`,
                right: `${divWidth * 0.015}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Heavy Industrial</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Unlock the potential of our robust pre-engineered 
                  solutions for heavy industrial sectors, such as power plants, refineries, and manufacturing facilities, 
                  offering durability and specialized features</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[4] = el} 
              style={{
                top: `${divHeight * 0.64}px`,
                width: `${divWidth * 0.3}px`,
                left: `${divWidth * 0.06}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Recreational</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Enhance your leisure and entertainment spaces with our pre-engineered buildings for sports complexes, 
                recreational centres, and community halls, providing flexibility and aesthetic appeal.</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[5] = el} 
              style={{
                top: `${divHeight * 0.777}px`,
                width: `${divWidth * 0.3}px`,
                right: `${divWidth * 0.04}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Agricultural</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>Explore our efficient and customizable pre-engineered 
                buildings for agricultural purposes, including barns, storage facilities, and livestock shelters, designed to optimise productivity and sustainability</div>
            </div>
            <div className='absolute' 
              ref={el => itemsRef.current[6] = el} 
              style={{
                top: `${divHeight * 0.925}px`,
                width: `${divWidth * 0.3}px`,
                left: `${divWidth * 0.06}px`,
              }}>
                <div className='text-[40px] font-bold text-[#e5e5e5] text-just'>Energy</div>
                <div className='text-[#b1b1b1] leading-[150%] mt-3'>
                  Embrace renewable power with our integrated solar panel solutions, optimizing clean energy generation and sustainability.
                </div>
            </div> */}
            <LottieMedia
                className={'w-full mt-[500px] mb-20'} 
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
                onDivRef={(div) => {
                  console.log('divv', div.clientHeight)
                  setDivHeight(div.clientHeight)
                  setDivWidth(div.clientWidth)
                }}
            />
        </div>
        <div className='mb-20'>

        </div>
    </Layout>
   
  )
}

export default Applications