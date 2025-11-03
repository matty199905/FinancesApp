"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";

type NavContainerProps = {
  $toggle: boolean
}

export const NavContainer = styled.nav<Theme & NavContainerProps>`
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
background-color: ${({ $theme }) => ($theme === 'dark' ? 'rgba(10, 23, 39, 1)' : 'var(--bgCard_Light)')};
 ul {
    position: absolute;
    top: 70px;
    right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 30px 0 0 0px;
    padding: 20px 0 20px 20px;
    li {
      width: 100%;
      letter-spacing: 2px;
      font-size: 20px;
      padding: 15px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
          color:${({ $theme }) => ($theme === 'dark' ? 'orange' : 'black')};
          background-color: ${({ $theme }) => ($theme === 'dark' ? ' rgba(25, 40, 57, 1)' : ' rgba(255, 241, 198, 1)')};
      }
    }
  }
    @media (max-width: 1100px) {
      padding:30px 20px;
      ul{
        padding-left: 5px;
        li {
          font-size: 18px;
        }
      }
    }
        @media (max-width: 930px) {
        z-index: 1;
        position: absolute;
        transform:${({ $toggle }) => ($toggle === false ? 'translateY(-700px)' : 'translateY(0px)')};
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        background-color: rgba(7, 12, 21, 1);
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        ul {
          align-items: center;
          text-align: center;
          top: 0px;
          margin-top: 100px;
           li {
            margin-right: 5px;
            border-radius: 0;
           }
        }
    }
`

type IconContainer = {
  $responsive: boolean,
} & Theme

export const IconContainer = styled.div<IconContainer>` 
align-self: flex-start;
height: 40px;
font-size: 40px;
margin-left: 10px;
border-bottom: ${({ $theme }) => ($theme === 'dark' ? '2px solid white' : '2px solid black')};
transform: scaleY(1.2);
@media (max-width: 930px) {
    display: ${({ $responsive }) => ( $responsive === false ? 'none' : 'flex')};
    position: absolute;
    left: 5px;
    bottom: 15px;
  height: 35px;
    color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
    }
`

export const LoginBtn = styled.button<Theme>`
  width: 75%;
  height: 70px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
  background-color: ${({ $theme }) => ($theme === 'dark' ? 'rgba(25, 40, 57, 1)' : ' rgba(232, 202, 112, 1)')};
  font-size: 20px;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;

  &:hover {
    background-color: orange;
    color: rgba(34, 34, 34, 1);
  }
`