import { Link } from "gatsby";
import React from "react";
import { useGlobalDispatchContext } from "../context/globalContext";

function MobileSidebar() {

  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black z-[-1]">
      <div style={{
          rowGap: '15px',
          fontSize: '12px'
        }} className="flex flex-col mt-[150px] items-center">
          <Link to='/about-us'
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p className="nav-item">About Us</p>
          </Link>
          <Link to='/applications'
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p className="nav-item">Applications</p>
          </Link>
          <Link to='/projects'
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p className="nav-item">Projects</p>
          </Link>
          <Link to='/contact-us'
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={setCursor}
          >
            <p className="nav-item">Contact Us</p>
          </Link>
        </div>
       
    </div>
  );
}

export default MobileSidebar;
