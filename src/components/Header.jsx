import React, { useEffect } from "react"
import { Link } from "gatsby"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"
import ProalfaLogo from "../assets/svg/logo_white.svg"

// styled components
import { HeaderNav, Logo, Menu } from "../styles/headerStyles"
import { AnimatedLogo, Container, Flex } from "../styles/globalStyles"
import MobileSidebar from "./MobileSidebar"
import { menuList } from "../constants"

const Header = () => {
  const dispatch = useGlobalDispatchContext()
  const { currentTheme, isHomePage } = useGlobalStateContext()

  useEffect(() => {
    localStorage.setItem("CURRENT_THEME", currentTheme)
  }, [currentTheme])

  const setCursor = cursorType => {
    dispatch({
      type: "CURSOR_TYPE",
      value: typeof cursorType === "string" ? cursorType : null,
    })
  }

  const onMenuClick = () => {
    console.log("menu clicked")
    dispatch({ type: "IS_HOME_PAGE", value: !isHomePage })
  }

  useEffect(() => {
    document.body.style.overflowY = !isHomePage ? "hidden" : "auto"
    if (!isHomePage) {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  }, [isHomePage])

   const logoAnimate = {
    initial: { backgroundColor: 'red' },
    animate: {
      backgroundColor: 'blue',
      transition: { duration: 1, ease: [0.6, 0.05, -0.01, 0.9] },
    },
  }

  return (
    <HeaderNav
    // initial={{ y: -72, opacity: 0 }}
    // animate={{ y: 0, opacity: 1 }}
    // transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <AnimatedLogo variants={logoAnimate}>
            <Logo isHomePage={isHomePage}>
              <Link
                to="/"
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={setCursor}
              >
                <div className="flex items-center justify-center gap-x-4 leading-[100%]">
                  <img className="h-[50px] md:h-[60px]" src={ProalfaLogo} alt="Proalfa Dynamic" fetchpriority="high" />
                  {/* <div className="flex justify-between">
                    <div className="text-[28px] leading-[100%] border-spacing-[0.6px]">
                      Proalfa <div className="inline font-normal">Dynamic</div>
                    </div>
                  </div> */}
                </div>
              </Link>
            </Logo>
          </AnimatedLogo>

          <Menu
            onClick={onMenuClick}
            isHomePage={isHomePage}
            className="block md:hidden"
          >
            <MobileSidebar visible={!isHomePage} />
            <button className="!p-0">
              <div
                className="hamburger"
                onMouseEnter={() => setCursor("melt")}
                onMouseLeave={setCursor}
              >
                <span
                  style={{
                    background: !isHomePage ? "crimson" : undefined,
                  }}
                />
                <span
                  style={{
                    background: !isHomePage ? "crimson" : undefined,
                  }}
                />
              </div>
            </button>
          </Menu>

          <div
            style={{
              columnGap: "30px",
              fontSize: "12px",
            }}
            className="hidden md:flex"
          >
            {menuList.map(({ redirect, name }) => (
              <Link
                key={name}
                to={redirect}
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={setCursor}
                style={{
                  color:
                    typeof window === "object" &&
                    window?.location?.pathname === redirect
                      ? "crimson"
                      : undefined,
                }}
              >
                <p className="nav-item">{name}</p>
              </Link>
            ))}
          </div>
        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header
