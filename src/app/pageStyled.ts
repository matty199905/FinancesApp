"use client";
import styled from "styled-components";


export const DashboardWrapper = styled.div`
position: absolute;
right: 0; 
top: 0;
bottom: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 20px;
width: 80%;
height: 100%;
padding: 50px 35px;
overflow-y: hidden;
span.user-name {
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 17px;
    font-weight: 600;
    opacity: 0.5;
    font-style: oblique;
}
@media (max-width: 1200px) {
    padding: 50px 20px;
    }
@media (max-width: 1100px) {
    padding: 30px 20px;
    }
@media (max-width: 930px) {
    padding-top: 110px;
    width: 100%;
    h1 {
        align-self: center;
    }
    span.user-name {
        display: none;
    }
    }
    @media (max-width: 500px) {
     h1 {
        font-size: 30px;
     }
    }
    @media (max-width: 450px) {
       padding: 110px 10px 20px 10px;
    }
`

export const GridContainer = styled.div`
display: grid;
gap: 15px;
grid-template-columns: 44.3% 54.3%;
grid-template-rows: 28% 18% 18% 28%;
width: 100%;
height: 100%;
    @media (max-width: 1100px) {
     display: flex;
     flex-direction: column;
     height: auto;
     overflow-y: auto;
     margin-bottom: -100px;
    }

`



type BalanceProps = {
    $theme: string,
    $number?: boolean,
}

export const TotalBalance = styled.div<BalanceProps>`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
gap: 8px;
grid-column: 1/2;
grid-row: 1/2;
padding: 25px;
background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')} ;
border-radius: 20px;
transition: all 0.5s ease;
h3{
    font-size: 17px;
    font-weight: 500;
    opacity: 0.9;
    
}
span.total {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 1.5px;
}
span.income-or-expense {
    color: ${({ $theme, $number }) =>
        $theme === 'dark'
            ? ($number
                ? 'rgba(119, 255, 0, 1)'
                : 'rgba(255, 0, 0, 1)')
            : ($number
                ? 'rgba(64, 136, 0, 1)'
                : 'rgba(255, 0, 0, 1)')
    };
    font-size: 18px;
    letter-spacing: 1.5px;
}
@media (max-width: 930px) {
    align-items: center;
    padding: 20px 25px;
    }
`


export const IncomeVsExpenses = styled(TotalBalance)`
position: relative;
align-items: center;
padding: 30px 10px 10px 10px;
grid-column: 2/3;
grid-row: 1/3;
div {
    position: absolute;
    top: 7px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    h3 {
        margin-top:5px;
        font-size: 30px;
        font-weight: 700;
        opacity: 0.2;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        input {
            height:25px;
            border-radius: 20px;
            width: 180px;
            text-align: center;
            outline: none;
            box-shadow: none;
            border-color: transparent;
            ::placeholder {
                color: grey;
            }
        }
        button {
            border: none;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            font-size: 16px;
            margin-right: 15px;
        }
    }
}
    @media (max-width: 1100px) {
        min-height: 320px;
    }
    @media (max-width: 500px) {
        padding: 30px 5px 10px 5px;
        div {
            gap: 15px;
            h3 {
                font-size: 27px;
            }
            form {
                gap: 5px;
                input {
                  width:130px;
                }
            }
        }
    }
`

export const ExpensesByCategory = styled(TotalBalance)`
padding: 20px 20px 30px 20px;
grid-column: 1/2;
grid-row: 2/4;
p{
    align-self: center;
    opacity: 0.5;
    font-weight: 100;
    font-size: 14px;
    font-style: oblique;
    margin-bottom: 60px;
}
    @media (max-width: 1100px) {
        min-height: 300px;
        p {
            margin: auto;
        }
    }
        @media (max-width: 930px) {
       
            align-items: center;
         
    }
`

export const FinancialGoals = styled(TotalBalance)`
justify-content: center;
gap: 20px;
grid-column: 1/2;
grid-row: 4/5;
padding: 20px;
div{
   padding: 0px;
   div{
    h3 {
        font-size: 14px;
    }
    span{
        font-size: 12px;
        opacity: 0.8;
    }
   }
}
p{
    align-self: center;
    opacity: 0.5;
    font-weight: 100;
    font-size: 14px;
    font-style: oblique;
    margin-bottom: 30px;
}
@media (max-width: 1100px) {
    gap: 30px;
}
`

export const RecentTranstactions = styled(TotalBalance)`
justify-content: flex-start;
grid-column: 2/3;
grid-row: 3/5;
padding: 20px;
font-size: 14px;

@media (max-width: 1100px) {
    min-height: 240px;
    padding-bottom: 0px;
    }
         @media (max-width: 500px) {
     padding: 20px 15px;
    }
`


