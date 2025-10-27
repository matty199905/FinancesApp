import { Settings, User } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";



type UserInitialState = {
    user: User | null,
   userPreferences: Settings | null,
}

const initialState: UserInitialState = {
    user: null,
    userPreferences: null,
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