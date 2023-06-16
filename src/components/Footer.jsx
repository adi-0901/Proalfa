import React, { useEffect, useRef } from "react"
import {
  FooterContainer,
  FooterContent,
  FooterLinks,
} from "../styles/footerStyles"
import { YoutubeLogo, InstagramLogo } from "../assets/svg/social-icons"
import { useGlobalDispatchContext } from "../context/globalContext"
import TruckWarehouseAnimation from '../assets/lottie/truck-warehouse.json'
import Lottie from "lottie-react";
import LottieMedia from '../components/lottie/LottieMedia'

const Footer = () => {
  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }


  const lottieRef = useRef(null)

  useEffect(() => {
    console.log('lottieRef: ', lottieRef.current)
    lottieRef.current.setDirection(-1)
  }, [lottieRef])

  return (
    <FooterContainer className="relative">
      <FooterContent >
        <div
          className="content-one"
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={setCursor}
        >
          
          <a href="mailto:proalfadynamic@gmail.com" id='email'>
            <p id="email">proalfadynamic@gmail.com</p>
          </a>
          <a href="tel:+918308823148">
            <p id="address">+91 8308823148</p>
          </a>
          <a href="tel:+919922997720">
            <p id="address">+91 9922997720</p>
          </a>  
        </div>
        <div className="content-two">
          <p id="address">Off 3A, Samruddhi Enclave</p>
          <p id="address">Near Muktangan School</p>
          <p id="address">Parvati, Pune - 411037</p>
        </div>
        {/* <div className="content-three"
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={setCursor}
        >
          <a href="tel:+918308823148">
            <p id="address">+91 8308823148</p>
          </a>
          <a href="tel:+919822399538">
            <p id="address">+91 9822399538</p>
          </a>  
        </div> */}
      </FooterContent>
      <div className="w-[500px]"></div>
      <div className="absolute top-[-250px] w-[500px] h-[500px] right-[0] scale-x-[-1]">
        <LottieMedia
          className={''} 
          ref={lottieRef} 
          animationData={TruckWarehouseAnimation}
          interactivity={{
            mode: 'scroll',
            actions: [
              {
                visibility: [0, 0.6],
                type: "seek",
                frames: [0,180],
              },
            ],
          }}
        />
      </div>
      {/* <FooterLinks>
        <YoutubeLogo
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={setCursor}
          fillColor="crimson"
          width="48px"
        />
        <InstagramLogo
          onMouseEnter={() => setCursor("pointer")}
          onMouseLeave={setCursor}
          fillColor="crimson"
          width="48px"
        />
      </FooterLinks> */}
    </FooterContainer>
  )
}

export default Footer
