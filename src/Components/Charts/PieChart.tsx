import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { RootState, Transaction } from '@/Types/types';
import { ChartWrapper } from './pieChartStyled';
import { useSelector } from 'react-redux';


type PieChartProps = {
    year: number | string,
    displayedTransactions: Transaction[]
}

const PieChart: React.FC<PieChartProps> = ({ year, displayedTransactions }) => {

    const { theme } = useSelector((state: RootState) => state.settings);

    const selectedYear = year; // o el año seleccionado dinámicamente

    const totalsByCategory = displayedTransactions
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
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.853)' : 'black',
                },
            },
        },
    };


    return (
        <ChartWrapper theme={theme}>
            <Pie data={data} options={options} />
        </ChartWrapper>
    )
}


export default PieChart






