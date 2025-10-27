import { store } from "@/Redux/store";

export type Settings = {
    theme: string,
    initialBalance: number,
    totalBalance: number,
    currency: string,
    currencyModal: boolean,
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
    amount: string,
    progress: number,
};

export type User = {
    uid: string,
    name: string,
};


export type UserPreferences = {
    theme: "light" | "dark";
    currency: "ARS" | "USD" | "EUR";
    initialBalance: number,

};



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

