'use client';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/Redux/store';
import { Provider } from 'react-redux';
import { Children } from '@/Types/types';
import AppContainer from '@/Components/AppContainer/AppContainer';
import Navbar from '@/Components/Navbar/Navbar';
import GlobalStylesWrapper from '@/Styles/GlobalStylesWrapper';




const ReduxProvider: React.FC<Children> = ({ children }) => {
  
  

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer>
            <GlobalStylesWrapper/>
            <Navbar/>
            {children}
          </AppContainer>
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider
