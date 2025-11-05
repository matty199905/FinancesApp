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
import { setToggle } from '@/Redux/Slices/navSlice';
import { eraseAllGoals } from '@/Redux/Slices/goalsSlice';
import { eraseAllTransactions } from '@/Redux/Slices/transactionsSlice';


const Navbar: React.FC = () => {

  const { theme } = useSelector((state: RootState) => state.settings);
  const { user } = useSelector((state: RootState) => state.user);
  const { toggleMenu } = useSelector((state: RootState) => state.mobileNav);

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user?.uid) {
        loadUserPreferences(user.uid).then((prefs) => {
        console.log(prefs);
        dispatch(syncUserSettings(prefs || null));
        dispatch(setUserPreferences(prefs));
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
          dispatch(eraseAllGoals());
          dispatch(eraseAllTransactions());
          console.log("Sesión cerrada correctamente");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      }
    }
  };



  return (
    <NavContainer $theme={theme} $toggle={toggleMenu}>

      <IconContainer $theme={theme} $responsive={false}>
        <IoIosTrendingUp />
      </IconContainer>

      <ul>
        <li><Link href="/" onClick={() => dispatch(setToggle())}>Dashboard</Link></li>
        <li><Link href="/transacciones" onClick={() => dispatch(setToggle())}>Transacciones</Link></li>
        <li><Link href="/metas" onClick={() => dispatch(setToggle())}>Metas</Link></li>
        <li><Link href="/ajustes" onClick={() => dispatch(setToggle())}>Ajustes</Link></li>
      </ul>

      <LoginBtn $theme={theme} onClick={handleGoogleLogin}>{!user ? 'Login' : 'Cerrar Sesión'}</LoginBtn>

    </NavContainer>
  )
}

export default Navbar
