import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { settingsSlice } from './Slices/settingsSlice';
import { transactionsSlice } from './Slices/transactions';
import { goalsSlice } from './Slices/goals';




const reducers = combineReducers({
settings: settingsSlice.reducer,
transactions: transactionsSlice.reducer,
goals: goalsSlice.reducer
});

const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
  key: 'root',
  storage,
  whitelist: ['settings', 'transactions', 'goals'],
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


