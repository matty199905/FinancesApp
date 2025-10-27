import { Transaction } from "@/Types/types";
import { createSlice } from "@reduxjs/toolkit";


type TransactionsState = {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
transactions: []
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
     addTransaction: (state, action) => {
         return {
            ...state,
        transactions: [...state.transactions, action.payload]
         
     }
    },
    eraseAllTransactions: () => {
        return {
            transactions: []
        }
    },
    deleteTransaction: (state, action) => {
        return {
            ...state,
           transactions: state.transactions.filter(
      (item) => item.id !== action.payload
    )

        }
    },
}
})

export const {addTransaction, eraseAllTransactions, deleteTransaction} = transactionsSlice.actions
export default transactionsSlice.reducer