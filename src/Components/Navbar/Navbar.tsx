import React, { useEffect } from 'react'
import { IconContainer, LoginBtn, NavContainer } from './navbarStyled'
import { IoIosTrendingUp } from "react-icons/io";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from "@/Firebase/firebaseConfig";
import { setCurrentUser, setUserPreferences } from '@/Redux/Slices/userSlice';
import { resetSettings, syncUserSettings } from '@/Redux/Slices/settingsSlice';
import { loadUserPreferences } from '@/Firebase/firebaseUserData';



const Navbar = () => {

  const { theme } = useSelector((state: RootState) => state.settings);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()

useEffect(() => {
    if (user?.uid) {
      loadUserPreferences(user.uid).then((prefs) => {
        console.log(prefs);
        dispatch(syncUserSettings(prefs || null));
      });
    } else {
      dispatch(setUserPreferences(null));
    }
  }, [user?.uid, dispatch]);

const handleGoogleLogin = async () => {

  if (!user) {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;

      dispatch(setCurrentUser({
        uid: loggedUser.uid,
        name: loggedUser.displayName,

      }));

      console.log("Usuario logueado:", loggedUser.displayName, loggedUser.email);
    } catch (error) {
      console.error("Error en login:", error);
    }
  } 
  
  else {
    if (window.confirm("¿Desea cerrar sesión?")) {
      try {
        await signOut(auth);
        dispatch(setCurrentUser(null));
        dispatch(resetSettings());
        console.log("Sesión cerrada correctamente");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  }
};



  return (
    <NavContainer $theme={theme}>

      <IconContainer $theme={theme}>
        <IoIosTrendingUp />
      </IconContainer>

      <ul>
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/transacciones">Transacciones</Link></li>
        <li><Link href="/metas">Metas</Link></li>
        <li><Link href="/ajustes">Ajustes</Link></li>
      </ul>

      <LoginBtn $theme={theme} onClick={handleGoogleLogin}>{!user ? 'Login' : 'Logout'}</LoginBtn>

    </NavContainer>
  )
}

export default Navbar
