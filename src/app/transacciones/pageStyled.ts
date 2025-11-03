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
overflow-y: auto;
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
        width: 190px;
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

div.title-and-deleteBtn {
    display: flex;
    align-items: center;
    gap: 20px;
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
@media (max-width: 1200px) {
  padding: 30px 30px;
}
@media (max-width: 930px) {
    width: 100%;
    padding-top: 120px;
    h1, div.title-and-deleteBtn  {
        align-self: center; 
        text-align: center;
    }
    form {
        justify-content: center;
    }
}

@media (max-width: 580px) {
     div.title-and-deleteBtn {
        margin-top: 20px;
        flex-direction: column;
        gap: 30px;
    }
}

@media (max-width: 500px) {
    padding: 110px 10px 50px 10px;
      h1{
        padding: 0 30px;
  font-size: 28px;
 }
    form {
        div {
            width: 90%;
            align-items: center;
        input, select {
            text-align: center;
        }
        }
    }
    div.title-and-deleteBtn {
        margin-top: 40px;
        gap: 25px;
    }


}
`

