"use client";
import React, { useEffect, useState } from 'react'
import { DashboardWrapper, ExpensesByCategory, FinancialGoals, GridContainer, IncomeOrExpense, IncomeVsExpenses, RecentTranstactions, TotalBalance } from './pageStyled'
import TransactionsCard from '@/Components/Transactions/TransactionsContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Types/types'
import GoalCard from '@/Components/GoalCard/GoalCard';
import { setTotalBalance } from '@/Redux/Slices/settingsSlice';
import BarChart from '@/Components/Charts/BarChart';
import PieChart from '@/Components/Charts/PieChart';
import { IoIosSearch } from "react-icons/io";
import Button from '@/Components/UI/SubmitBtn/Button';


const Dashboard = () => {

  const { initialBalance, totalBalance, currency, theme } = useSelector((state: RootState) => state.settings);
  const { goals } = useSelector((state: RootState) => state.goals);
  const { transactions } = useSelector((state: RootState) => state.transactions);
  const currentYear: number = new Date().getFullYear();
  const [year, setYear] = useState<number | ''>(currentYear);
  const [inputYear, setInputYear] = useState<number | ''>('')
  const dispatch = useDispatch<AppDispatch>()


  const incomeTransactions = transactions
    .filter((item) => item.type === 'income')
    .reduce((acc, item) =>
      acc + Number(item.amount), 0);

  const expenseTransactions = transactions
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) =>
      acc - Math.abs(Number(item.amount)), 0);


  const incomeOrExpense = (expenseTransactions + incomeTransactions);

  useEffect(() => {

    dispatch(setTotalBalance(incomeOrExpense + initialBalance));

  }, [incomeOrExpense, initialBalance])


  const handleYearOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setYear(inputYear);
    setInputYear('');
    }

  return (
    <DashboardWrapper>
      <h1>Dashboard</h1>

      <GridContainer>


        <TotalBalance $theme={theme}>

          <h2>Balance Total:</h2>
          <span className='total'>
            {(currency === 'Ars' || currency === 'Usd') ? '$' : '€'}{(totalBalance).toLocaleString('es-ES')}
          </span>

          <IncomeOrExpense $theme={theme} $number={incomeOrExpense >= 0}>
            {incomeOrExpense < 0
              ? `-$${Math.abs(incomeOrExpense).toLocaleString('es-ES')}`
              : `+$${incomeOrExpense.toLocaleString('es-ES')}`}
          </IncomeOrExpense>

        </TotalBalance>



        <ExpensesByCategory $theme={theme}>
          <h2>Gasto por Categoría:</h2>
          {
            transactions.length ?
          <PieChart year={year} /> 
          :
          <p>No hay gastos registrados.</p>
          }
        </ExpensesByCategory>


        <FinancialGoals $theme={theme}>
          <h2>Objetivos:</h2>

          {
            goals.length > 0 ? goals.slice(-1).map((item) => (

              <GoalCard key={item.id} id={item.id}>
                <h3>{item.name}</h3>
                <span>${item.progress} de ${item.amount}</span>
              </GoalCard>
            )) : <p>No hay metas registradas.</p>
          }


        </FinancialGoals>



        <IncomeVsExpenses $theme={theme}>
          <h3>{year}</h3>
          <form onSubmit={handleYearOnSubmit}>
            <input
              type="number"
              placeholder="Busque por año..."
              value={inputYear}
              onChange={(e) => {
                const value = e.target.value;
                setInputYear(value === '' ? '' : Number(value))
              }}
            />
            <Button>
              <IoIosSearch />
            </Button>
          </form>
          <BarChart year={year} />
        </IncomeVsExpenses>


        <RecentTranstactions $theme={theme}>

          <TransactionsCard title={"Transacciones Recientes:"} page={'home'} />

        </RecentTranstactions>

      </GridContainer>

    </DashboardWrapper>
  )
}

export default Dashboard

