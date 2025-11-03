'use-client'
import React from 'react'
import { NavContainer } from './navbarStyled'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContainer } from '../Navbar/navbarStyled';
import { IoIosTrendingUp } from "react-icons/io";
import { setToggle } from '@/Redux/Slices/navSlice';



const NavMobile = () => {

    const { theme } = useSelector((state: RootState) => state.settings);
    const { user } = useSelector((state: RootState) => state.user);
    const preferredUserName = useSelector((state: RootState) => state.settings.userName);
    const nameAcount = useSelector((state: RootState) => state.user.user?.name);
    const dispatch = useDispatch<AppDispatch>()

    return (
        <NavContainer $theme={theme}>

            <IconContainer $theme={theme} $responsive={true}>
                <IoIosTrendingUp />
            </IconContainer>

            <span className='user-name'> Bienvenido/a: {
                user ?
                    (!preferredUserName ?
                        nameAcount : preferredUserName) :
                    'Cuenta Demo'
            }
            </span>

            
            <div className='icon-container' onClick={() => dispatch(setToggle())}>
                <GiHamburgerMenu />
            </div>


        </NavContainer>
    )
}

export default NavMobile
