"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";

export const SettingsWrapper = styled.div`
position: absolute;
right: 0;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
gap: 40px;
width: 80%;
height: 100%;
padding: 30px 50px;
`

export const OptionsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 20px;
width: 100%;
height: auto;
`

type OptionCardProps = Theme & { $userName?: boolean };

export const OptionCard = styled.div<OptionCardProps>`
display: ${({ $userName }) => ($userName === false ? 'none' : 'flex')};
justify-content: space-between;
align-items: center;
width: 100%;
height: auto;
padding: 20px;
background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')} ;
border-radius: 20px;
h3 {
    font-weight: 500;
    font-size: 20px;
}
div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    button {
      color:  ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
        padding: 10px 30px;
    border: none;
    border-radius: 20px;
    background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--secondary_Dark)' : 'var(--secondary_Light)')} ;
    font-size: 20px;
    cursor: pointer;
 transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $theme }) => ($theme === 'dark' ? 'orange' : 'lightblue')} ;
    color: rgba(34, 34, 34, 1);
  }
    }
}
 span {
        font-size: 20px;
        margin-right: 10px;
        font-style: oblique;
 }
`


type ModalProps = {
  $modal: boolean,
  $theme: string,
}

export const Modalcurrency = styled.div<ModalProps>`
display: ${({ $modal }) => ($modal === true ? 'block' : 'none')};
position: absolute;
top: 370px;
left: 50px;
width: 300px;
height: auto;
padding: 20px 0;
background-color:${({ $theme }) => ($theme === 'dark' ? 'white' : 'rgba(219, 219, 219, 1)')};
color: black;
border-radius: 20px;
ul {
  display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 10px;
li {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
  color: orange;
    transition: all 0.2s ease;
}
}
div {
  width: 100%;
  height: 3px;
  opacity: 0.3;
  background-color: black;
}
}
`