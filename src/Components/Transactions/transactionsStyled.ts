"use client";
import styled from "styled-components";

type CardProps = {
    $page: string,
    $theme?: string,
}

export const CardsWrapper = styled.div<CardProps>`

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 15px;
width: 100%;
height: 100%;
div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    h2 {
        align-self: flex-start;
    }
button.deleteAll {
  display: ${({ $page }) => ($page === 'home' ? 'none' : 'block')};
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
        opacity: 0.4;
    }
    li.amount {
        margin-right: ${({ $page }) => ($page === 'home' ? '50px' : '90px')}; 
    }

 }
p{
    opacity: 0.5;
    margin-top: 50px; 
    font-weight: 100;
    font-style: oblique;
}
`

export const TransactionCard = styled.div<CardProps>`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
span {
    text-align: start;
    width: 13%;

}
span.date {
    width: auto;
}
button {
    width: 35px;
    margin-left: ${({ $page }) => ($page === 'home' ? '-50px' : '-220px')};
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
`
