import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React, { useRef } from 'react'
import Vector1 from '../assets/svg/parallax/Vector1.svg'
import Vector2 from '../assets/svg/parallax/Vector2.svg'
import Vector3 from '../assets/svg/parallax/Vector3.svg'
import Vector4 from '../assets/svg/parallax/Vector4.svg'
import Vector5 from '../assets/svg/parallax/Vector5.svg'
import Ellipse0 from '../assets/svg/parallax/ellipse_0.svg'

const ParallaxBuilding = () => {
    const ref = useRef()
  return (
    <div>
        <Parallax pages={3} ref={ref}>
            <ParallaxLayer offset={0.4} speed={1.5} style={{backgroundImage: `url(${Vector5})`}} />
            <ParallaxLayer offset={0.4} speed={1.5} style={{backgroundImage: `url(${Vector4})`}} />
            <ParallaxLayer offset={0.4} speed={1.5} style={{backgroundImage: `url(${Vector3})`}} />
            <ParallaxLayer offset={0.4} speed={2} style={{backgroundImage: `url(${Vector2})`}} />
            <ParallaxLayer offset={0.4} speed={2.5} style={{backgroundImage: `url(${Vector1})`}} />
            <ParallaxLayer offset={0.99} factor={0.5} speed={2.5} style={{backgroundImage: `url(${Ellipse0})`, marginTop: '100px'}} />
     
        </Parallax>
  </div>
  )
}

export default ParallaxBuilding