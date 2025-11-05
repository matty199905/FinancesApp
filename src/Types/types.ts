import { store } from "@/Redux/store";

export type Settings = {
    theme: string;
    currency: string,
    initialBalance: number,
    totalBalance?: number,
    currencyModal?: boolean,
    userName: string | null,
}

export type Theme = {
    $theme: string,
};

export type Children = {
    children: React.ReactNode
};

export type Transaction = {
    id: number,
    name: string,
    amount: string,
    category: string,
    date: string,
    month: number,
    year: number,
    type: string,
};

export type Goal = {
    id: number,
    name: string,
    amount: string | number,
    progress: number,
};

export type User = {
    uid: string,
    name: string,
};


export type UserPreferences = {
    transactions?: Transaction[] | [],
    goals?: Goal[] | [],
} & Settings;



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

