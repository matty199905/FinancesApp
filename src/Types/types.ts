import { store } from "@/Redux/store";

export type Theme = {
    $theme: string,
    $percentage?: number,
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
}



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

