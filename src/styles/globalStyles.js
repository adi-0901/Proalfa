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
`


export const AnimatedLogo = styled(motion.div)`
  // animation: 3s ease-in-out 0s 1 slideInFromLeft;
`