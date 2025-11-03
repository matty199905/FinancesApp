import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { settingsSlice } from './Slices/settingsSlice';
import { transactionsSlice } from './Slices/transactionsSlice';
import { goalsSlice } from './Slices/goalsSlice';
import { userSlice } from './Slices/userSlice';
import { mobileNavSlice } from './Slices/navSlice';




const reducers = combineReducers({
mobileNav: mobileNavSlice.reducer, 
settings: settingsSlice.reducer,
transactions: transactionsSlice.reducer,
goals: goalsSlice.reducer,
user: userSlice.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
  key: 'root',
  storage,
  whitelist: ['settings', 'transactions', 'goals', 'user'],
};


const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);


