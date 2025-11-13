"use client";
import styled from "styled-components";

type CardProps = {
    $page: string,
    $theme?: string,
    $income?: boolean,
}

export const CardsWrapper = styled.div<CardProps>`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 15px;
width: 100%;
height: 300px;
min-height: 300px;
overflow-y: auto;
overflow-x: hidden;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        h2 {
            align-self: flex-start;
        }

        
    }
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 35px;
        padding: 0 15px;
        padding-right: 0px;
        border-bottom: 1px solid grey; 
        li {
            font-size: 15px;
            opacity: ${({ $theme }) => ($theme === 'dark' ? '0.4' : '0.8')};

        }
        li.amount {
            margin-right: 13px
    }
    }
    p{
        opacity: 0.5;
        margin-top: 50px; 
        font-weight: 100;
        font-style: oblique;
    }
@media (max-width: 500px) {
   min-height: 350px;
}
@media (max-width: 400px) {
ul {
    padding: 0;
    li.amount {
        margin: 0;
    }
    li {
        font-size: ${({ $page }) => ($page === 'home' && '13px')};
    }
}
}
`



export const TransactionCard = styled.div<CardProps>`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 0;
div {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
    gap: 10px;
    max-width: ${({ $page }) => ($page !== 'home' ? '140px' : '100px')};
}
span {
    text-align: center;
    min-width: 13%;
}
span.date{
    width:auto;
}
span.type {
    color: ${({$income})=>($income ? 'rgba(119, 255, 0, 1)' : 'rgba(255, 0, 0, 1)')}
}
button {
    display: ${({ $page }) => ($page === 'home' && 'none')};
    width: 35px;
    background-color:${({ $theme }) => ($theme === 'dark' ? ' rgba(25, 128, 255, 1)' : ' rgba(102, 170, 254, 1)')};
    border-radius: 20px;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ $theme }) => ($theme === 'dark' ? 'rgba(67, 152, 255, 1)' : 'lightblue')};
    }
}
@media (max-width: 500px) {
    div {
        gap: 5px;
        max-width: ${({ $page }) => ($page !== 'home' ? '120px' : '75px')};
    }
    span {
     font-size: ${({ $page }) => ($page === 'home' ? '13px' : '14px')};
   }
   button {
    width: 20px;
   }
}
`
