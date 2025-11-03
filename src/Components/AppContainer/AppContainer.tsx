import React from 'react'
import { Container } from './appContainerStyled'
import { Children, RootState } from '@/Types/types'
import { useSelector } from 'react-redux';


const AppContainer: React.FC<Children> = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.settings);

  return (
    <Container $theme={theme}>
      {children}
    </Container>
  )
}

export default AppContainer
