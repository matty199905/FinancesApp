"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";


export const ButtonStyled = styled.button<Theme>`
    background-color:${({$theme})=>($theme === 'dark' ? ' rgba(25, 128, 255, 1)' : ' rgba(102, 170, 254, 1)')};
    width: 150px;
    height: 50px;
    border-radius: 20px;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({$theme})=>($theme === 'dark' ? 'rgba(67, 152, 255, 1)' : 'lightblue' )};
    }
`