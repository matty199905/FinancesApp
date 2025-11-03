import { Theme } from "@/Types/types";
import styled from "styled-components";



export const NavContainer = styled.nav<Theme>`
position: fixed;
top: 0;
display: flex;
justify-content: space-between;
align-items: baseline;
width: 100%;
height: 75px;
padding: 25px 10px;
border-bottom: 2px solid rgba(255, 255, 255, 0.12);
background-color: ${({ $theme }) => ($theme === 'dark' ? 'rgba(7, 12, 21, 1)' : 'var(--bgCard_Light)')};
z-index: 1;
span.user-name {
    margin-left: 50px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.3;
    font-style: oblique;
}
div {
   font-size: 35px;
   cursor: pointer;
}

    @media (min-width: 930px) {
        display: none;
}
`
