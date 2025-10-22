import React from 'react'
import { IconContainer, LoginBtn, NavContainer } from './navbarStyled'
import { IoIosTrendingUp } from "react-icons/io";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/Types/types';

const Navbar = () => {

const {theme} = useSelector((state: RootState)=> state.settings);

  return (
    <NavContainer $theme={theme}>

      <IconContainer $theme={theme}>
        <IoIosTrendingUp/>
      </IconContainer>

      <ul>
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/transacciones">Transacciones</Link></li>
        <li><Link href="/metas">Metas</Link></li>
        <li><Link href="/ajustes">Ajustes</Link></li>
      </ul>

      <LoginBtn $theme={theme}>Login</LoginBtn>
      
    </NavContainer>
  )
}

export default Navbar
