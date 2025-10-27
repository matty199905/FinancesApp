import { Settings } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Settings = {
    theme: 'dark',
    initialBalance: 0,
    totalBalance: 0,
    currency: 'Ars',
    currencyModal: false,
    userName: null,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        openModal: (state) => {
            return {
                ...state,
                currencyModal: !state.currencyModal,
            }
        },
        changeCurrency: (state, action) => {
            return {
                ...state,
                currency: action.payload
            }
        },
        setInitialBalance: (state, action) => {
            return {
                ...state,
                initialBalance: action.payload
            }

        },
        setTotalBalance: (state, action) => {
            return {
                ...state,
                totalBalance: action.payload
            }

        },
        setUserName: (state, action) => {
            return {
                ...state,
                userName: action.payload,
            }
        },
        changeTheme: (state, action) => {
            return {
                ...state,
                theme: action.payload,
            }
        },
        resetSettings: () => {
            return {
                theme: 'dark',
                initialBalance: 0,
                totalBalance: 0,
                currency: 'Ars',
                currencyModal: false,
                userName: null,
            }
        },
        syncUserSettings: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

    }
})


export const { openModal, changeCurrency, setInitialBalance, setTotalBalance, setUserName, changeTheme, resetSettings, syncUserSettings } = settingsSlice.actions
export default settingsSlice.reducer