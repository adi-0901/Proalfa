import React, { useEffect } from "react"
import { Link } from "gatsby"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

// styled components
import { HeaderNav, Logo, Menu, JumpToProjects } from "../styles/headerStyles"
import { Container, Flex } from "../styles/globalStyles"

const Header = () => {
  const dispatch = useGlobalDispatchContext()
  const { currentTheme, isHomePage } = useGlobalStateContext()

  useEffect(() => {
    localStorage.setItem("CURRENT_THEME", currentTheme)
  }, [currentTheme])

  const toggleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
      value: currentTheme === "dark" ? "light" : "dark",
    })
  }

  const setCursor = cursorType => {
    dispatch({ type: "CURSOR_TYPE", value: cursorType })
  }

  const onMenuClick = () => {
    console.log("menu clicked")
    dispatch({ type: "IS_HOME_PAGE", value: !isHomePage })
  }

  return (
    <HeaderNav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo isHomePage={isHomePage}>
            {/* <Link
              to="/"
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              ICEB
            </Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => setCursor("hovered")}
              onMouseLeave={setCursor}
            ></span>
            <Link
              to="/"
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              X
            </Link> */}
            <Link
              to="/"
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              Proalfa Dynamic
            </Link>
          </Logo>
          {/* <Menu onClick={onMenuClick} isHomePage={isHomePage}> */}
          {/* <button>
              <div
                className="hamburger"
                onMouseEnter={() => setCursor("melt")}
                onMouseLeave={setCursor}
              >
                <span></span>
                <span></span>
              </div>
            </button> */}
          {/* </Menu> */}
          <div style={{
            display: 'flex',
            columnGap: '30px',
            fontSize: '12px'
          }}>
            <Link to='/about-us'
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <p2 class="nav-item">About Us</p2>
            </Link>
            <Link to='/applications'
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <p class="nav-item">Applications</p>
            </Link>
            <Link to='/projects'
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <p class="nav-item">Projects</p>
            </Link>
            <Link to='/services'
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <p class="nav-item">Services</p>
            </Link>
            <Link to='/contact-us'
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={setCursor}
            >
              <p class="nav-item">Contact Us</p>
            </Link>
          </div>

        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header
