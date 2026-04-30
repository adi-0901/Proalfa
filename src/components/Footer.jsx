import React from "react"
import { FooterContainer, FooterContent } from "../styles/footerStyles"
import { useGlobalDispatchContext } from "../context/globalContext"

const Footer = () => {
  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  return (
    <FooterContainer className="relative">
      <FooterContent className="w-full">
        <div className="flex justify-around w-full flex-wrap gap-10 mx-10">
          <div
            className="content-one"
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p>Contact:</p>
            <a href={`mailto:${"info"}@${"proalfa.in"}`} id="email">
              <p id="email">{"info"}&#64;{"proalfa.in"}</p>
            </a>
            <a href="tel:+918308823148">
              <p id="address">+91 9096677726</p>
            </a>
            <a href="tel:+919922997720">
              <p id="address">+91 9922997720</p>
            </a>
          </div>
          <div className="content-two">
          <p id="address">Office Address:</p>
          <a 
            href="https://maps.app.goo.gl/qDhzZKbC5eSg6WfD9"
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
            target="_blank"
            rel="noreferrer"
          >
            <p id="address">Off 3A, Samruddhi Enclave</p>
            <p id="address">Near Muktangan School</p>
            <p id="address">Parvati, Pune - 411037</p>
          </a>
          </div>
          
          <div className="content-three">
          <p id="address">Factory Address:</p>
          <a 
            href="https://maps.app.goo.gl/gv9UcLB4yWHgvXK46?g_st=iw"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p id="address">Gat No.768 A, Plot no.1</p>
            <p id="address">Pune Satara Road, Velu</p>
            <p id="address">Bhor, Pune - 412205</p>
          </a>
          </div>
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
      {/* <div className="w-[500px]"></div> */}
      {/* <div className="absolute top-[-250px] w-[500px] h-[500px] right-[0] scale-x-[-1]">
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
      </div> */}
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
