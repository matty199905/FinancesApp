import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState, Transaction } from '@/Types/types';


type BarChartProps = {
    year: number | string,
}

const BarChart: React.FC<BarChartProps> = ({year}) => {

    const { transactions } = useSelector((state: RootState) => state.transactions);

    const selectedYear = year; 

    const transactionsThisYear = transactions.filter(item => {
        const year = new Date(item.date).getFullYear();
        return year === selectedYear;
    });


    const grouped: Record<number, Transaction[]> = {};

    transactionsThisYear.forEach((item) => {
        const month = item.month;
        if (!grouped[month]) grouped[month] = [];
        grouped[month].push(item);
    });


    const transactionsByMonth: Transaction[][] = Array.from(
        { length: 12 },
        (_, i) => grouped[i + 1] || []
    );


    const incomePerMonth: number[] = [];
    const expensePerMonth: number[] = [];


    transactionsByMonth.forEach((monthArr) => {
        const totalIncome = monthArr
            .filter(item => item.type === 'income')
            .reduce((acc: number, item: Transaction) => acc + Number(item.amount), 0);

        const totalExpense = monthArr
            .filter(item => item.type === 'expense')
            .reduce((acc: number, item: Transaction) => acc + Number(item.amount), 0);

        incomePerMonth.push(totalIncome);
        expensePerMonth.push(-totalExpense);
    });




    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend);

    const data = {
        labels: ['Ene', 'Febr', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Ingresos',
                data: incomePerMonth,
                backgroundColor: 'rgba(64, 255, 0, 1)',

            },
            {
                label: 'Gastos',
                data: expensePerMonth,
                backgroundColor: 'rgba(255, 0, 0, 1)',

            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    color: 'rgba(255, 255, 255, 0.823)',
                    font: { size: 10 },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
            x: {
                ticks: {
                    color: 'grey',
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: false,
                }
            },
        }
    }

    return (
        <Bar data={data} options={options} style={{ width: 'auto', paddingTop: '20px' }} />
    )
}

export default BarChart
