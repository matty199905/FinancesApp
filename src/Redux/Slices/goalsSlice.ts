import { Goal } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";



type TransactionsState = {
    goals: Goal[];
}

const initialState: TransactionsState = {
    goals: []
}


export const goalsSlice = createSlice({
    name: 'goals',
    initialState: initialState,
    reducers: {
        addGoal: (state, action) => {
            return {
                ...state,
                goals: [...state.goals, action.payload]

            }
        },

        eraseAllGoals: () => {
            return {
                goals: []
            }
        },

        deleteGoal: (state, action) => {
            return {
                ...state,
                goals: state.goals.filter(
                    (item) => item.id !== action.payload
                ),

            }
        },
        setProgress: (state, action) => {

            const { id, progress, progressPercentage } = action.payload;
            state.goals = state.goals.map(goal =>
                goal.id === id ? { ...goal, progress, progressPercentage } : goal
            );

        }
    }
});


export const { addGoal, eraseAllGoals, deleteGoal, setProgress } = goalsSlice.actions;
export default goalsSlice.reducer;