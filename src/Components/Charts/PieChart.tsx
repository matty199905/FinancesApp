import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '@/Types/types';
import { ChartWrapper } from './pieChartStyled';


type PieChartProps = {
    year: number | string,
}

const PieChart: React.FC<PieChartProps> = ({ year }) => {

    const { transactions } = useSelector((state: RootState) => state.transactions);
    const { user, userPreferences } = useSelector((state: RootState) => state.user);

    const displayedGoals = user?.uid ? userPreferences?.transactions ?? [] : transactions;


    const selectedYear = year; // o el año seleccionado dinámicamente

    const totalsByCategory = displayedGoals
        .filter(t => t.year === selectedYear && t.type === "expense") // 🔹 Solo gastos del año
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {} as Record<string, number>);

    // 🔹 Convertís el objeto en un array de objetos { category, total }
    const totalsArray = Object.entries(totalsByCategory).map(([category, total]) => ({
        category,
        total,
    }));


    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const data = {
        labels: totalsArray.map((item) => item.category),
        datasets: [
            {
                data: totalsArray.map((item) => item.total),
                backgroundColor: [
                    'rgba(255, 120, 140, 0.95)',
                    'rgba(255, 170, 80, 0.95)',
                    'rgba(255, 215, 90, 0.95)',
                    'rgba(145, 215, 110, 0.95)',
                    'rgba(80, 190, 255, 0.95)',
                    'rgba(145, 130, 255, 0.95)',
                    'rgba(90, 230, 200, 0.95)',
                    'rgba(255, 140, 100, 0.95)',
                    'rgba(200, 140, 255, 0.95)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 10,
                    boxHeight: 10,
                    color: 'rgba(255, 255, 255, 0.853)',
                },
            },
        },
    };


    return (
        <ChartWrapper>
            <Pie data={data} options={options} />
        </ChartWrapper>
    )
}


export default PieChart






