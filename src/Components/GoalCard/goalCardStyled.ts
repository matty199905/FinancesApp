"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";

export const CardContainer = styled.div<Theme>`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: auto;
background-color: ${({ $theme }) => ($theme === 'dark' ? 'var(--bgCard_Dark)' : 'var(--bgCard_Light)')} ;
border-radius: 20px;
padding: 20px;
`

export const GoalContainer = styled.div<Theme>`
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
gap: 15px;
width: 100%;
height: auto;
div.empty-bar {
width: 100%;
height: 12px;
border-radius: 20px;
background-color: grey;
}
`

type ProgressBarprops = Theme & {$percentage?: number} 

export const ProgressBar = styled.div<ProgressBarprops>`
    width: ${({$percentage})=>($percentage ? `${$percentage}%` : '0%')};
    height: 100%;
    border-radius: 20px;
    border-right: 1px solid black;
    background-color:${({ $theme }) => ($theme === 'dark' ? 'rgba(67, 152, 255, 1)' : 'rgba(109, 175, 255, 1)')};
`



export const GoalAndMount = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
h3 {
    font-weight: 500;
}
span.remaining-money {
    opacity: 0.7;
}
`

type AssignRemoveProps = {
    $theme: string,
    $metasUrl: boolean,

}

export const AssignRemoveContainer = styled.div<AssignRemoveProps >`
display: ${({$metasUrl})=>($metasUrl === true ? 'flex' : 'none')};
justify-content: center;
align-items: center;
gap:5px;
width: 5%;
margin-left: 10px;
button {
    width: 23px;
    height: 23px;
    background-color:${({ $theme }) => ($theme === 'dark' ? ' rgba(25, 128, 255, 1)' : ' rgba(102, 170, 254, 1)')};
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ $theme }) => ($theme === 'dark' ? 'rgba(67, 152, 255, 1)' : 'lightblue')};
    }
}
.delete {
    background-color: red;
}
`
