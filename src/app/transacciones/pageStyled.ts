"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";


export const TransactionsWrapper = styled.div<Theme>`
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

form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    gap: 20px;
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')} ;
        padding: 15px;
        border-radius: 20px;
        width: 19.5%;
        height: 90px;

        select {
            width: 100%;
            background-color: transparent;
            color: ${({ $theme }) => ($theme === 'dark' ? 'grey' : 'black')} ;
            border: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 18px;
            opacity: 0.95;
            option {
                color: black;
            }
        }

        input.date {
               color: grey; 
               font-family: Arial, Helvetica, sans-serif;
               
            }

        input {
            background-color: transparent;
            border: none;
            width: 100%;
            height: 30px;
            color: white;
            font-size: 18px;
            &::placeholder {
                opacity: 0.95;
               }  
        &:focus {
                outline: none;
               }
            }
          
    }

    
        div.type {
            padding: 10px 40px;
            label {
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0.9;
                gap: 10px;
            }
        }
}
`

export const OverFlowContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
gap: 20px;
width: 100%;
height: 100%;
margin-top: 20px;
padding-right: 20px;
overflow-y: auto;
overflow-x: hidden;
`