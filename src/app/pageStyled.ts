"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";


export const DashboardWrapper = styled.div`
position: absolute;
right: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 20px;
width: 80%;
height: 100%;
padding: 30px 50px;
`

export const GridContainer = styled.div`
align-self: flex-end;
display: grid;
gap: 15px;
grid-template-columns: 44.3% 54.3%;
grid-template-rows: 28% 18% 18% 28%;
width: 100%;
height: 90%;
`


export const TotalBalance = styled.div<Theme>`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
grid-column: 1/2;
grid-row: 1/2;
padding: 25px;
background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')} ;
border-radius: 20px;
transition: all 0.5s ease;
h2{
    font-size: 17px;
    font-weight: 500;
    opacity: 0.9;
    
}
span.total {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 1.5px;
}
`

type IncomeOrExpenseProps = {
    $theme: string,
    $number: boolean,
}

export const IncomeOrExpense = styled.span<IncomeOrExpenseProps>`
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
`

export const ExpensesByCategory = styled(TotalBalance)`
max-width: 650px;
padding: 20px 0 25px 20px;
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
`

export const FinancialGoals = styled(TotalBalance)`
grid-column: 1/2;
grid-row: 4/5;
div{
   padding: 0px;
}
p{
    align-self: center;
        opacity: 0.5;
    font-weight: 100;
    font-size: 14px;
    font-style: oblique;
    margin-bottom: 30px;
}
`

export const IncomeVsExpenses = styled(TotalBalance)`
position: relative;
align-items: center;
max-width: 650px;
padding: 30px 10px 10px 15px;
grid-column: 2/3;
grid-row: 1/3;
h3 {
    position: absolute;
    top: 15px;
    font-size: 30px;
    color: grey;
    font-weight: 100;
}
form {
    position: absolute;
    right: 0;
    top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input {
        height: 25px;
        border-radius: 20px;
        width: auto;
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
`

export const RecentTranstactions = styled(TotalBalance)`
justify-content: flex-start;
gap: 15px;
grid-column: 2/3;
grid-row: 3/5;
font-size: 14px;
`


