import { Link } from "gatsby";
import React from "react";
import { useGlobalDispatchContext } from "../context/globalContext";
import { menuList } from "../constants";

function MobileSidebar() {

  const dispatch = useGlobalDispatchContext()
  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }



  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#191919] z-[-1]">
      <div style={{
          rowGap: '15px',
          fontSize: '12px'
        }} className="flex flex-col mt-[150px] items-center">

          {menuList.map(({redirect, name}) => 
            <Link key={name} to={redirect}
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
              style={{
                color: window.location.pathname === redirect ? 'crimson' : undefined
              }}
            >
              <p className="nav-item">{name}</p>
            </Link> 
          )}
        </div>
       
    </div>
  );
}

export default MobileSidebar;
