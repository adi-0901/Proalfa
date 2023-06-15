import React from "react"
import {
  FooterContainer,
  FooterContent,
  FooterLinks,
} from "../styles/footerStyles"
import { YoutubeLogo, InstagramLogo } from "../assets/svg/social-icons"
import { useGlobalDispatchContext } from "../context/globalContext"

const Footer = () => {
  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }
  return (
    <FooterContainer>
      <FooterContent>
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
          <a href="tel:+919822399538">
            <p id="address">+91 9822399538</p>
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
      <FooterLinks>
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
      </FooterLinks>
    </FooterContainer>
  )
}

export default Footer
