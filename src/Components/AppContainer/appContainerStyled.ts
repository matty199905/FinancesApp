"use client";
import { Theme } from "@/Types/types";
import styled from "styled-components";

export const Container = styled.div<Theme>`
position: relative;
display: flex;
justify-content: center;
align-items: center;
align-self: center;
width: 95dvw;
height: 90dvh;
background-color:${({ $theme }) => ($theme === 'dark' ? 'rgba(7, 12, 21, 1)' : 'rgba(254, 247, 206, 1)')};
border-radius: 20px;
`