"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";


export const NavContainer = styled.nav<Theme>`
position: absolute;
top: 0;
left: 0;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 20%;
height: 100%;
padding: 30px;
border-top-left-radius: 20px;
border-bottom-left-radius:20px;
background-color: ${({$theme})=>($theme === 'dark' ? 'rgba(10, 23, 39, 1)' : 'var(--bgCard_Light)' )};
ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 126%;

    margin: 30px 0 0 0px;
    padding: 20px 0 20px 40px;
    li {
      width: 100%;
      letter-spacing: 2px;
      font-size: 20px;
      cursor: pointer;
      padding: 15px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      transition: all 0.3s ease;
      &:hover {
          color:${({$theme})=>($theme === 'dark' ? 'orange' : 'black' )};
          background-color: ${({$theme})=>($theme === 'dark' ? ' rgba(25, 40, 57, 1)' : ' rgba(255, 241, 198, 1)' )};
      }
      
}
}
` 

export const IconContainer = styled.div<Theme>` 
align-self: flex-start;
height: 40px;
font-size: 40px;
margin-left: 10px;
border-bottom: ${({$theme})=>($theme === 'dark' ? '2px solid white' : '2px solid black' )};
transform: scaleY(1.2);
`

export const LoginBtn = styled.button<Theme>`
  width: 75%;
  height: 70px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  color: ${({$theme})=>($theme === 'dark' ? 'white' : 'black' )};
  background-color: ${({$theme})=>($theme === 'dark' ? 'rgba(25, 40, 57, 1)' : ' rgba(232, 202, 112, 1)' )};
  font-size: 20px;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;

  &:hover {
    background-color: orange;
    color: rgba(34, 34, 34, 1);
  }
`