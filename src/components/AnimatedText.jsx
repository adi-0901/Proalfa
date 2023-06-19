import React, { useEffect, useRef } from 'react'
import { useOnScreen } from '../hooks/useOnScreen';
import { useState } from 'react';

const AnimatedText = ({text, className}) => {

      const elementRef = useRef(null);
      const isOnScreen = useOnScreen(elementRef);

      const CUSTOM_VERTICAL_OFFSET = 20

      const [opacity, setOpacity] = useState(0)


      useEffect(() => {
        document.body.onscroll = (e) => {
                if(isOnScreen){
                    const height =  elementRef.current.offsetHeight + CUSTOM_VERTICAL_OFFSET
                    const offsetTop =  window.scrollY + elementRef.current.getBoundingClientRect().top + CUSTOM_VERTICAL_OFFSET
    
                    const min = offsetTop
                    const max = offsetTop + height 
                    const bottomOffset = window.scrollY + window.innerHeight 

                    if(bottomOffset > max) {
                        setOpacity(1)
                    }
    
                    if(bottomOffset < min) return 
    
                    const percent = Math.floor(((bottomOffset - min) * 100) / (max - min)) / 100    
                    setOpacity(percent)
                }
        }
      }, [isOnScreen])

      console.log(opacity)

      
  return (
    <div className={className}>
        <div className='flex'>
            <p ref={elementRef}>
                {text.split('').map((letter, letterIndex) => letter === ' ' ? <span>&nbsp;</span> : (<div data-index={letterIndex} key={`${letterIndex}`} className='relative inline-block will-change-[opacity]'
                    style={{
                        opacity: opacity >= (Math.floor(((letterIndex - 0) * 100) / (text.length - 0)) / 100) ? 1 : 0.2,
                        transition: '0.7s opacity ease-in-out'
                    }}>
                    {letter} 
                </div>))}

                 {/* {text.split(' ').map((word, wordIndex) => 
                    (<div key={wordIndex} className='relative inline-block'>
                        {word.split('').map((letter, letterIndex) => (<div key={`${wordIndex}${letterIndex}`} className='relative inline-block will-change-[opacity]'
                            style={{
                                opacity: opacity >= (Math.floor(((letterIndex - 0) * 100) / (text.length - 0)) / 100) ? 1 : 0.2,
                                transition: '0.7s opacity ease-in-out'
                            }}>
                            {letter}
                        </div>))}
                        &nbsp;
                    </div>))
                } */}
            </p>
        </div>
    </div>
  )
}

export default AnimatedText