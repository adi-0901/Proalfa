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

import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const divRef = useRef(null);
  const isScrollingHorizontally = useRef(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = Math.sign(event.deltaY);
      const scrollAmount = 100;
      const scrollLeft = divRef.current.scrollLeft;
      const maxScrollLeft = divRef.current.scrollWidth - divRef.current.clientWidth;

      if (!isScrollingHorizontally.current && scrollLeft === maxScrollLeft && delta === 1) {
        event.preventDefault();
        return;
      }

      if (delta === 1 && scrollLeft === maxScrollLeft) {
        console.log('wewewewe')
        enableBodyScroll()
        // isScrollingHorizontally.current = false;
        event.preventDefault();
        return;
      }

      if (delta === 1 && scrollLeft < maxScrollLeft) {
        isScrollingHorizontally.current = true;
        disableBodyScroll();
      }

      if (delta === -1 && scrollLeft === 0) {
        isScrollingHorizontally.current = false;
        enableBodyScroll();
        event.preventDefault();
        return;
      }

      if (!isScrollingHorizontally.current) {
        event.preventDefault();
      }

      divRef.current.scrollTo({
        left: scrollLeft + scrollAmount * delta,
        behavior: 'smooth'
      });
    };

    const disableBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableBodyScroll = () => {
      document.body.style.overflow = '';
    };

    const handleWindowScroll = () => {
      const divTop = divRef.current.getBoundingClientRect().top;
      if (divTop <= 0) {
        window.addEventListener('wheel', handleScroll, { passive: false });
      } else {
        window.removeEventListener('wheel', handleScroll);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleScroll);
      enableBodyScroll();
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        height: '100vh',
        backgroundColor: 'red'
      }}
    >
      {/* Content for testing */}
      <div style={{ display: 'inline-block', width: '1000px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mi quis mauris vulputate, eu sollicitudin neque euismod. Quisque vel nisl in turpis posuere venenatis vel ac mauris. Nunc lacinia, mauris nec feugiat tristique, odio nulla finibus elit, id tempor elit turpis ac urna. Aenean efficitur eu mi id interdum. Sed ac felis pretium, venenatis ex sed, consectetur metus. Donec eleifend augue et leo tristique facilisis. Nullam id sem id ipsum efficitur tempus. Nullam ut aliquam velit, id auctor lacus. Phasellus pellentesque, ex eget iaculis dapibus, neque tellus efficitur tellus, ac faucibus nisi lorem a justo.
      </div>
    </div>
  );
};

export default MyComponent;
