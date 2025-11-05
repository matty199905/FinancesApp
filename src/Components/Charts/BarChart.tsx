import React, { useEffect, useState } from 'react'
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


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);


type BarChartProps = {
    year: number | string,
    displayedTransactions: Transaction[]
}

const BarChart: React.FC<BarChartProps> = ({ year, displayedTransactions }) => {

    const [legendDisplay, setLegendDisplay] = useState<boolean>(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 600 : true
    );
   
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(min-width: 600px)');
        const handler = (e: MediaQueryListEvent | MediaQueryList) => {
            // cuando la media query se cumple (>=600) queremos mostrar la leyenda
            setLegendDisplay(e.matches);
        };

        // inicial
        setLegendDisplay(mq.matches);

        if (mq.addEventListener) mq.addEventListener('change', handler as any);
        else mq.addListener(handler as any);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', handler as any);
            else mq.removeListener(handler as any);
        };
    }, []);


    // Logica renderizar por años.
    const selectedYear = year;

    const transactionsThisYear = displayedTransactions.filter(item => {
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



    // Ajustar labels por resolucion.
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const adjustedLabel = (window.innerWidth < 500)
        ? labels.map(label => label.slice(0, -1))
        : labels;


    const data = {
        labels: adjustedLabel,
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
                display: legendDisplay,
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
