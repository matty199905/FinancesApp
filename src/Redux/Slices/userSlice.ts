import { User, UserPreferences } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";



type UserInitialState = {
    user: User | null,
    userPreferences: UserPreferences,
}

const initialState: UserInitialState = {
    user: null,
    userPreferences: {
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
        },
        eraseAllUserTransactions: (state) => {
            return {
                ...state,
                userPreferences: { ...state.userPreferences, transactions: [] }
            }
        },
        deleteUserTransaction: (state, action) => {
            state.userPreferences.transactions = state.userPreferences?.transactions?.filter(
                (t) => t.id !== action.payload
            );
        },
        eraseAllUserGoals: (state) => {
            return {
                ...state,
                userPreferences: { ...state.userPreferences, goals: [] }
            }
        },

        deleteUserGoal: (state, action) => {
            state.userPreferences.goals = state.userPreferences?.goals?.filter(
                (t) => t.id !== action.payload
            );
        },
    }
});


export const { setCurrentUser, setUserPreferences, eraseAllUserTransactions, deleteUserTransaction, eraseAllUserGoals, deleteUserGoal } = userSlice.actions;
export default userSlice.reducer;