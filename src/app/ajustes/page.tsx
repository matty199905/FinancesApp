"use client";
import React from 'react'
import { Modalcurrency, OptionCard, OptionsContainer, SettingsWrapper } from './pageStyled'
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { changeCurrency, changeTheme, setInitialBalance, openModal, setUserName, resetSettings } from '@/Redux/Slices/settingsSlice';
import { saveUserPreferences } from '@/Firebase/firebaseUserData';
import { setUserPreferences } from '@/Redux/Slices/userSlice';


const Ajustes = () => {

  const settings = useSelector((state: RootState) => state.settings);
  const { currencyModal, currency, initialBalance, userName, theme } = useSelector((state: RootState) => state.settings);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()



  const handleOnClick_initialBalance = async () => {
    const input = prompt("Indique su balance inicial");

    if (input === null) return;
    const balance = Number(input.trim().replace(',', '.'));
    if (Number.isNaN(balance)) {
      alert("Por favor ingrese un número válido");
      return;
    }

    dispatch(setInitialBalance(balance));

    if (user?.uid) {
      const updatedPrefs = { ...settings, initialBalance: balance };
      dispatch(setUserPreferences(updatedPrefs));
      await saveUserPreferences(user.uid, updatedPrefs);
    }
  };


  const handleOnClick_ChangeUserName = async () => {
    const input = prompt("Asigne su Nombre de Usuario");

    if (input === null) return;
    const Name = String(input.trim().charAt(0).toUpperCase() + input.slice(1));
    if (!Name) {
      alert("Por favor ingrese un número válido");
      return;
    }
    dispatch(setUserName(Name));

    if (user?.uid) {
      const updatedPrefs = { ...settings, userName: Name };
      dispatch(setUserPreferences(updatedPrefs));
      await saveUserPreferences(user.uid, updatedPrefs);
    }
  }

  const handleChangeTheme = async (newTheme: "light" | "dark") => {

    const updatedPrefs = {
      ...settings,
      theme: newTheme,
    };
    dispatch(changeTheme(newTheme));

    if (user?.uid) {
      dispatch(setUserPreferences(updatedPrefs));
      await saveUserPreferences(user.uid, updatedPrefs);
    }
  };

const handleOnClick_resetSettings = async () => {
  if (window.confirm('¿Desea formatear los ajustes de la cuenta? Se perderá todo el progreso guardado.')) {
    if (user?.uid) {
      dispatch(resetSettings());
      await saveUserPreferences(user.uid, {
        currency: 'Ars',
        theme: 'dark',
        initialBalance: 0,
        userName: '',
        currencyModal: false,
        transactions: [],
        goals: [],
      });
    }
  }
}


  return (
    <SettingsWrapper>
      <h1>Ajustes</h1>


      <OptionsContainer>

        <OptionCard $theme={theme}>
          <h3>Tema</h3>
          <div>
            <button className='light' onClick={() => handleChangeTheme('light')}>Light</button>
            <button className='dark' onClick={() => handleChangeTheme('dark')}>Dark</button>
          </div>
        </OptionCard>

        <OptionCard $theme={theme}>
          <div className='title-arrowContainer' onClick={() => handleOnClick_initialBalance()}>
            <h3>Balance Inicial</h3> <MdArrowForwardIos />
          </div>
          <span>{(currency === 'Ars' || currency === 'Usd') ? '$' : '€'}{initialBalance.toLocaleString('es-ES')}</span>
        </OptionCard>

        <OptionCard $theme={theme}>
          <div className='title-arrowContainer' onClick={() => dispatch(openModal())}>
            <h3>Moneda</h3> <MdArrowForwardIos />
          </div>
          <span>{currency}.</span>
        </OptionCard>
        {
          user &&
          <>
            <OptionCard $theme={theme}>
              <div className='title-arrowContainer' onClick={() => handleOnClick_ChangeUserName()}>
                <h3>Nombre de usuario</h3> <MdArrowForwardIos />
              </div>
              <span>{userName}</span>
            </OptionCard>

            <OptionCard $theme={theme}>
              <div className='title-arrowContainer' onClick={() => handleOnClick_resetSettings()}>
                <h3>Reiniciar Preferencias de Usuario</h3> <MdArrowForwardIos />
              </div>
              <span>{userName}</span>
            </OptionCard>
          </>

        }



        <Modalcurrency $modal={currencyModal || false} $theme={theme}>
          <ul>
            <li onClick={() => {
              dispatch(changeCurrency('Ars')),
                dispatch(openModal())
            }}> Ars </li>

            <div />

            <li onClick={() => {
              dispatch(changeCurrency('Usd')),
                dispatch(openModal())
            }}> Usd </li>

            <div />

            <li onClick={() => {
              dispatch(changeCurrency('Eur')),
                dispatch(openModal())
            }}> Eur </li>
          </ul>
        </Modalcurrency>


      </OptionsContainer>

    </SettingsWrapper>
  )
}

export default Ajustes