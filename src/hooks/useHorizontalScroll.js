import React from "react";

function useHorizontalScroll(isIntersecting, setIsIntersecting, active = true) {
  const elRef = React.useRef();
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if(!active || window.innerWidth < 768) return
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        if(!isIntersecting) return
        const scrollLeft = el.scrollLeft;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

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
