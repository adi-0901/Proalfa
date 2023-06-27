import React from "react";

function useHorizontalScroll(isIntersecting, setIsIntersecting) {
  const elRef = React.useRef();
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        console.log({isIntersecting})
        if(!isIntersecting) return
        const scrollLeft = el.scrollLeft;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        console.log(e.deltaY, scrollLeft, maxScrollLeft)
        if(((scrollLeft >= maxScrollLeft) && e.deltaY > 1) || ((scrollLeft === 0) && e.deltaY < 1)) {
          setIsIntersecting(false)
          document.body.style.overflow = 'auto';
          return
        }

        e.preventDefault();        

        el.scrollTo({
          left: scrollLeft + e.deltaY,
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, [isIntersecting]);
  return elRef;
}

export default useHorizontalScroll;
