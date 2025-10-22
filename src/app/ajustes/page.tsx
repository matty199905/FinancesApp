"use client";
import React from 'react'
import { Modalcurrency, OptionCard, OptionsContainer, SettingsWrapper } from './pageStyled'
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { changeCurrency, changeTheme, setInitialBalance, openModal, setUserName } from '@/Redux/Slices/settingsSlice';


const Ajustes = () => {

  const { currencyModal, currency, initialBalance, userName, theme } = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch<AppDispatch>()

  
const handleOnClick_initialBalance = () => {
  const input = prompt("Indique su balance inicial");
  
  if (input === null) return; 
  const balance = Number(input.trim());
  if (Number.isNaN(balance)) {
    alert("Por favor ingrese un número válido");
    return;
  }

  dispatch(setInitialBalance(balance));
};


const handleOnClick_ChangeUserName = () => {
  const input = prompt("Asigne su Nombre de Usuario");
  
  if (input === null) return; 
  const Name = String(input.trim().charAt(0).toUpperCase() + input.slice(1));
  if (!Name) {
    alert("Por favor ingrese un número válido");
    return;
  }

  dispatch(setUserName(Name));
}

  return (
    <SettingsWrapper>
      <h1>Ajustes</h1>


      <OptionsContainer>

        <OptionCard $theme={theme}>
          <h3>Tema</h3>
          <div>
            <button className='light' onClick={()=> dispatch(changeTheme('light'))}>Light</button>
            <button className='dark' onClick={()=> dispatch(changeTheme('dark'))}>Dark</button>
          </div>
        </OptionCard>

        <OptionCard $theme={theme}>
          <div className='title-arrow-container' onClick={()=> handleOnClick_initialBalance()}>
            <h3>Balance Inicial</h3> <MdArrowForwardIos />
          </div>
          <span>{(currency === 'Ars' || currency === 'Usd') ? '$' : '€'}{initialBalance.toLocaleString('es-ES')}</span>
        </OptionCard>

        <OptionCard $theme={theme}>
          <div className='title-arrow-container' onClick={() => dispatch(openModal())}>
            <h3>Moneda</h3> <MdArrowForwardIos />
          </div>
          <span>{currency}.</span>
        </OptionCard>

        <OptionCard $theme={theme}>
          <div className='title-arrow-container' onClick={()=> handleOnClick_ChangeUserName()}>
            <h3>Nombre de usuario</h3> <MdArrowForwardIos />
          </div>
          <span>{userName}</span>
        </OptionCard>



        <Modalcurrency $modal={currencyModal} $theme={theme}>
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
