import { RootState } from '@/Types/types';
import React from 'react'
import { useSelector } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyles from './globalStyles';

const GlobalStylesWrapper = () => {
const { theme } = useSelector((state: RootState) => state.settings);

  const darkTheme: DefaultTheme = {
    mode: "dark",
  };

  const lightTheme: DefaultTheme = {
    mode: "light",
  };

  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles $theme={theme} />
    </ThemeProvider>
  );
}

export default GlobalStylesWrapper
