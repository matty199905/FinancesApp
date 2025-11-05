import { User, UserPreferences } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";



type UserInitialState = {
    user: User | null,
   userPreferences: UserPreferences | null,
}

const initialState: UserInitialState = {
    user: null,
    userPreferences:  { 
        currency: 'Ars',
        theme: 'dark',
        initialBalance: 0,
        userName: '',
        transactions: [],
        goals: [],
    }
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },
        setUserPreferences: (state, action) => {
            return {
                ...state,
                userPreferences: action.payload,
            }
        }
    }
});


export const { setCurrentUser, setUserPreferences } = userSlice.actions;
export default userSlice.reducer;