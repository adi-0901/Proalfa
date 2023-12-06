import styled, { css, createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"
import { Link } from "gatsby"
import { motion } from "framer-motion"

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  *{
    text-decoration : none;
    cursor: none;
          margin: 0;
      padding: 0;
  }
  html{
    box-sizing : border-box;
    -webkit-font-smoothing : antialiased;
    font-size : 16px;
  }
  body{
    font-family: 'Open Sans','Helvetica Neue', sans-serif;
    background-color : #191919;
    color: ${props => props.theme.current.color};
    overscroll-behavior: none;
    overflow-x : hidden;
  }
  

  p,li{
    font-size: 1.1.rem;
    font-weight: bold;
  }

  ul{
    list-style: none;

  }

  .nav-item{
      font-size: 1.5rem;
      font-weight: 800;
  }
  a{
    color: ${props => props.theme.current.color};
    transition: color 0.4s ease-in-out;
    &:hover {
      color: ${props => props.theme.current.red};
    }
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translate3d(50vh, 90vh, 0px) scale(10)
    }
    70%{
      transform: translate3d(50vh, 50vh, 0px) scale(4)
    }
    100% {
      transform: translate3d(0px, 0px, 0px) scale(1)
    }
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props =>
    props.theme.current.background === "#000" ? "#fff" : "#000"};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${props =>
      props.theme.current.background === "#000" ? "#fff" : "#000"};
  }
`

export const Colored = styled.span`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: crimson;
  }
`

export const Container = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  width: auto;
  height: 100%;
  z-index: 9999999;

  @media (min-width: 1024px) {
    max-width: 960px;
  }
  @media (min-width: 1216px) {
    max-width: 1152px;
  }
  @media (min-width: 1408px) {
    max-width: 1244px;
  }
  ${props =>
    props.fluid &&
    css`
      padding: 0;
      margin: 0;
      max-width: 100%;
    `}
`

export const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${props =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `}
  ${props =>
    props.flexEnd &&
    css`
      justify-content: flex-end;
    `}
    ${props =>
    props.alignTop &&
    css`
      align-items: top;
    `}
    ${props =>
    props.noHeight &&
    css`
      height: 0;
    `}
`

export const Cursor = styled.div`
  position: absolute;
  top: 200px;
  left: 200px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${props =>
    props.isHomePage ? props.theme.current.red : props.theme.anti.color};
  z-index: 999;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  transition-property: width, height, border, background;
  will-change: width, height, border, transform, background;
  pointer-events: none;

  &.pointer {
    background: none;
    height: 30px;
    width: 30px;
    border: 2px solid ${props => props.theme.current.red};
  }

  &.hovered {
    background: none
    height: 30px;
    width: 30px;
    border: 2px solid ${props => props.theme.current.color};
  }

  &.big-hovered {
    background: none;
    height: 100px;
    width: 100px;
    background: crimson;
    mix-blend-mode: color;
  }

  &.melt {
    width: 0;
    height: 0;
  }

  &.xmark {
    height: 120px;
    width: 120px;
    background-repeat: no-repeat;
    background: unset;
    background-size: contain;
    background-repeat: no-repeat;
    mix-blend-mode: color;
    background-image: url('data:image/svg+xml;utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.9393 25.9393C26.5251 25.3536 27.4749 25.3536 28.0607 25.9393L35.25 33.1287L42.4393 25.9393C43.0251 25.3536 43.9749 25.3536 44.5607 25.9393C45.1464 26.5251 45.1464 27.4749 44.5607 28.0607L37.3713 35.25L44.5607 42.4393C45.1464 43.0251 45.1464 43.9749 44.5607 44.5607C43.9749 45.1464 43.0251 45.1464 42.4393 44.5607L35.25 37.3713L28.0607 44.5607C27.4749 45.1464 26.5251 45.1464 25.9393 44.5607C25.3536 43.9749 25.3536 43.0251 25.9393 42.4393L33.1287 35.25L25.9393 28.0607C25.3536 27.4749 25.3536 26.5251 25.9393 25.9393Z" fill="%23DC143C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69C53.7777 69 69 53.7777 69 35C69 16.2223 53.7777 1 35 1C16.2223 1 1 16.2223 1 35C1 53.7777 16.2223 69 35 69ZM35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z" fill="%23E391A2"/></svg>');
  }
  `
  // background-image: url('data:image/svg+xml;charset=utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(220, 20, 60,1)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69C53.7777 69 69 53.7777 69 35C69 16.2223 53.7777 1 35 1C16.2223 1 1 16.2223 1 35C1 53.7777 16.2223 69 35 69ZM35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.2929 26.2929C26.6834 25.9024 27.3166 25.9024 27.7071 26.2929L35 33.5858L42.2929 26.2929C42.6834 25.9024 43.3166 25.9024 43.7071 26.2929C44.0976 26.6834 44.0976 27.3166 43.7071 27.7071L36.4142 35L43.7071 42.2929C44.0976 42.6834 44.0976 43.3166 43.7071 43.7071C43.3166 44.0976 42.6834 44.0976 42.2929 43.7071L35 36.4142L27.7071 43.7071C27.3166 44.0976 26.6834 44.0976 26.2929 43.7071C25.9024 43.3166 25.9024 42.6834 26.2929 42.2929L33.5858 35L26.2929 27.7071C25.9024 27.3166 25.9024 26.6834 26.2929 26.2929Z" fill="crimson"/></svg>');    

    // background-image: url('data:image/svg+xml;charset=utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 18C1.5 8.88707 8.88707 1.5 18 1.5C27.1129 1.5 34.5 8.88707 34.5 18C34.5 27.1129 27.1129 34.5 18 34.5C8.88707 34.5 1.5 27.1129 1.5 18ZM18 4.5C10.5439 4.5 4.5 10.5439 4.5 18C4.5 25.4561 10.5439 31.5 18 31.5C25.4561 31.5 31.5 25.4561 31.5 18C31.5 10.5439 25.4561 4.5 18 4.5ZM12.6966 12.6966C13.2824 12.1108 14.2321 12.1108 14.8179 12.6966L18 15.8787L21.1821 12.6966C21.7679 12.1108 22.7176 12.1108 23.3034 12.6966C23.8892 13.2824 23.8892 14.2321 23.3034 14.8179L20.1213 18L23.3034 21.1821C23.8892 21.7679 23.8892 22.7176 23.3034 23.3034C22.7176 23.8892 21.7679 23.8892 21.1821 23.3034L18 20.1213L14.8179 23.3034C14.2321 23.8892 13.2824 23.8892 12.6966 23.3034C12.1108 22.7176 12.1108 21.7679 12.6966 21.1821L15.8787 18L12.6966 14.8179C12.1108 14.2321 12.1108 13.2824 12.6966 12.6966Z" fill="crimson"/></svg>');
    // background-image: url('data:image/svg+xml;charset=utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(220, 20, 60,0.2)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69C53.7777 69 69 53.7777 69 35C69 16.2223 53.7777 1 35 1C16.2223 1 1 16.2223 1 35C1 53.7777 16.2223 69 35 69ZM35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.2929 26.2929C26.6834 25.9024 27.3166 25.9024 27.7071 26.2929L35 33.5858L42.2929 26.2929C42.6834 25.9024 43.3166 25.9024 43.7071 26.2929C44.0976 26.6834 44.0976 27.3166 43.7071 27.7071L36.4142 35L43.7071 42.2929C44.0976 42.6834 44.0976 43.3166 43.7071 43.7071C43.3166 44.0976 42.6834 44.0976 42.2929 43.7071L35 36.4142L27.7071 43.7071C27.3166 44.0976 26.6834 44.0976 26.2929 43.7071C25.9024 43.3166 25.9024 42.6834 26.2929 42.2929L33.5858 35L26.2929 27.7071C25.9024 27.3166 25.9024 26.6834 26.2929 26.2929Z" fill="crimson"/></svg>');    
    // background-image: url('data:image/svg+xml;charset=utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke='red' xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_1623_4899)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69C53.7777 69 69 53.7777 69 35C69 16.2223 53.7777 1 35 1C16.2223 1 1 16.2223 1 35C1 53.7777 16.2223 69 35 69ZM35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z" fill="#DC143C" fill-opacity="0.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.2929 26.2929C26.6834 25.9024 27.3166 25.9024 27.7071 26.2929L35 33.5858L42.2929 26.2929C42.6834 25.9024 43.3166 25.9024 43.7071 26.2929C44.0976 26.6834 44.0976 27.3166 43.7071 27.7071L36.4142 35L43.7071 42.2929C44.0976 42.6834 44.0976 43.3166 43.7071 43.7071C43.3166 44.0976 42.6834 44.0976 42.2929 43.7071L35 36.4142L27.7071 43.7071C27.3166 44.0976 26.6834 44.0976 26.2929 43.7071C25.9024 43.3166 25.9024 42.6834 26.2929 42.2929L33.5858 35L26.2929 27.7071C25.9024 27.3166 25.9024 26.6834 26.2929 26.2929Z" fill="crimson"/></g><defs><clipPath id="clip0_1623_4899"><rect width="70" height="70" fill="crimson"/></clipPath></defs></svg>');
    // background-image: url('data:image/svg+xml;charset=utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_1624_4912)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69C53.7777 69 69 53.7777 69 35C69 16.2223 53.7777 1 35 1C16.2223 1 1 16.2223 1 35C1 53.7777 16.2223 69 35 69ZM35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z" fill="#6D454D"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.2929 26.2929C26.6834 25.9024 27.3166 25.9024 27.7071 26.2929L35 33.5858L42.2929 26.2929C42.6834 25.9024 43.3166 25.9024 43.7071 26.2929C44.0976 26.6834 44.0976 27.3166 43.7071 27.7071L36.4142 35L43.7071 42.2929C44.0976 42.6834 44.0976 43.3166 43.7071 43.7071C43.3166 44.0976 42.6834 44.0976 42.2929 43.7071L35 36.4142L27.7071 43.7071C27.3166 44.0976 26.6834 44.0976 26.2929 43.7071C25.9024 43.3166 25.9024 42.6834 26.2929 42.2929L33.5858 35L26.2929 27.7071C25.9024 27.3166 25.9024 26.6834 26.2929 26.2929Z" fill="#DC143C"/></g></svg>');
    // background-image: url('data:image/svg+xml;charset=utf8,<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="34" stroke="#451821" stroke-width="2"/><path d="M27 27L43 43M27 43L43 27" stroke="#DC143C" stroke-width="3" stroke-linecap="round"/></svg>');
    


export const AnimatedLogo = styled(motion.div)`
  // animation: 3s ease-in-out 0s 1 slideInFromLeft;
`