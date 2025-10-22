import React from 'react'
import { ButtonStyled } from './buttonStyled'
import { Children, RootState } from '@/Types/types'
import { useSelector } from 'react-redux';


const Button: React.FC<Children> = ({children}) => {
  const {theme} = useSelector((state: RootState)=> state.settings);
  return (
 <ButtonStyled $theme={theme} type='submit'>
{children}
 </ButtonStyled>
  )
}

export default Button
