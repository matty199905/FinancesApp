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
    
}
form {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    width: 85%;
    input {
          background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--secondary_Dark)' : 'var(--secondary_Light)')};
          border: none;
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
`

export const GoalsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 20px;
width:100%;
padding-right: 10px;
overflow-y: auto;
p {
  opacity: 0.5;
  font-size: 14px;
  margin-bottom: 20px;
    font-style: oblique;
}
`