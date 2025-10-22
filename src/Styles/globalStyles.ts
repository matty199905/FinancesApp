"use client"
import { Theme } from "@/Types/types";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle<Theme>`

:root {
  --bgCard_Dark: rgba(18, 23, 36, 1);
  --secondary_Dark: rgba(48, 63, 93, 1);
   --bgCard_Light: rgba(255, 228, 132, 1);
  --secondary_Light: rgba(255, 249, 197, 1);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

}

html,
body {
  max-width: 100vw;
  height: 100%;
  overflow-x: hidden;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({$theme})=>($theme === 'dark' ? 'white' : 'black')};
  background-color:  ${({$theme})=>($theme === 'dark' ? 'rgba(0, 6, 19, 1)' : 'white')};
  letter-spacing: 1px;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scrollbar-color: rgba(131, 142, 165, 0.9) rgba(100, 100, 100, 0.1);
}

a {
  color: inherit;
  text-decoration: none;
}

li{
  list-style: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`


export default GlobalStyles




