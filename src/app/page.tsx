"use client";
import React, { useEffect, useState } from 'react'
import { DashboardWrapper, ExpensesByCategory, FinancialGoals, GridContainer, IncomeVsExpenses, RecentTranstactions, TotalBalance } from './pageStyled'
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
  const { user, userPreferences } = useSelector((state: RootState) => state.user);
  const preferredUserName = useSelector((state: RootState) => state.settings.userName);
  const nameAcount = useSelector((state: RootState) => state.user.user?.name);

  const currentYear: number = new Date().getFullYear();

  const [year, setYear] = useState<number | ''>(currentYear);
  const [inputYear, setInputYear] = useState<number | ''>('')
  const dispatch = useDispatch<AppDispatch>()

  const displayedGoals = user?.uid ? userPreferences?.goals ?? [] : goals;

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

      <span className='user-name'> Bienvenido/a: {
        user ?
          (!preferredUserName ?
            nameAcount : preferredUserName) :
          'Cuenta Demo'
      }
      </span>
      <GridContainer>


        <TotalBalance $theme={theme} $number={incomeOrExpense >= 0}>

          < h3>Balance Total:</ h3>
          <span className='total'>
            {(currency === 'Ars' || currency === 'Usd') ? '$' : '€'}{(totalBalance ?? 0).toLocaleString('es-ES')}
          </span>
          <span className='income-or-expense'>
            {incomeOrExpense < 0
              ? `-$${Math.abs(incomeOrExpense).toLocaleString('es-ES')}`
              : `+$${incomeOrExpense.toLocaleString('es-ES')}`}
          </span>

        </TotalBalance>



        <IncomeVsExpenses $theme={theme}>

          <div>
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
          </div>
          <BarChart year={year} />

        </IncomeVsExpenses>




        <ExpensesByCategory $theme={theme}>
          < h3>Gasto por Categoría:</ h3>
          {
            transactions.length ?
              <PieChart year={year} />
              :
              <p>No hay gastos registrados.</p>
          }
        </ExpensesByCategory>


        <FinancialGoals $theme={theme}>
          < h3>Objetivos:</ h3>

          {
   displayedGoals.length > 0 ? displayedGoals.slice(-1).map((item) => (

              <GoalCard key={item.id} id={item.id}>
                <div>
                <h3>{item.name}</h3>
                <span>${item.progress} de ${item.amount}</span>
                </div>
              </GoalCard>
            )) : <p>No hay metas registradas.</p>
          }


        </FinancialGoals>



        <RecentTranstactions $theme={theme}>
            < h3>Transacciones Recientes:</ h3>

          <TransactionsCard page={'home'}/>

        </RecentTranstactions>

      </GridContainer>

    </DashboardWrapper>
  )
}

export default Dashboard

