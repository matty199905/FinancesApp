"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";

export const GoalsWrapper = styled.div`
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
overflow-y: auto;
overflow-x: hidden;
p {
  align-self: center;
  text-align: center;
  opacity: 0.5;
  font-size: 14px;
  font-style: oblique;
}
@media (max-width: 1200px) {
  padding: 30px 30px;
}
@media (max-width: 930px) {
  width: 100vw;
  padding: 110px 30px 50px 30px;
  h1 {
    align-self: center;
    text-align: center;
  }
}
@media (max-width: 700px) {
padding: 110px 10px 50px 10px;
p {
  width: 85%;
  font-size: 12px;
}
}
  @media (max-width: 500px) {
  h1{
  font-size: 28px;
 }
}
`


export const GoalsRegisterContainer = styled.div<Theme>`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: auto;
padding: 20px;
background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')};
border-radius: 20px;
h2 {
    font-size: 19px;
    margin-right: 20px;
}
form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    input {
          background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--secondary_Dark)' : 'var(--secondary_Light)')};
          border: none;
          width: 200px;
          height: 30px;
          color: white;
          font-size: 18px;
          padding: 20px;
          border-radius: 20px;
          &::placeholder{
            color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
            opacity: 0.7;
          }
      &:focus {
              outline: none;
             }
          }
       button.deleteAll {
           padding: 10px 20px;
           border-radius: 20px;
           border: none;
           background-color: red ;
           color: white;
           font-weight: 600;
           cursor: pointer;
           transition: all 0.2s ease;
           &:hover {
             background-color: darkred;
               transition: all 0.2s ease;
             }
            }
}
button {
    height: 40px;
}
@media (max-width: 1000px) {
  flex-direction: column;
  h2 {
    margin: 0 0 20px 0;
  }
  form {
    align-items: center;
    justify-content: center;
  }
}
@media (max-width: 700px) {
  align-self: center;
width: 90%;
}
`

export const GoalsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 20px;
width:100%;
min-height: 400px;
padding: 0px 10px;
overflow-y: auto;
@media (max-width: 930px) {
min-height: 520px;
padding: 0px;
}
`