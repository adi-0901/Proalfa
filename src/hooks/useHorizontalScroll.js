import React from "react";

function useHorizontalScroll() {
  const elRef = React.useRef();
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        const scrollLeft = el.scrollLeft;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        console.log(e.deltaY, scrollLeft, maxScrollLeft)
        if((scrollLeft >= maxScrollLeft) && e.deltaY > 1) return
        if((scrollLeft === 0) && e.deltaY < 1) return

        e.preventDefault();        

        el.scrollTo({
          left: scrollLeft + e.deltaY,
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export default useHorizontalScroll;
