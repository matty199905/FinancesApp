import React from 'react'
import { TransactionCard, CardsWrapper } from './transactionsStyled'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { deleteTransaction } from '@/Redux/Slices/transactionsSlice';
import { Transaction } from '@/Types/types';
import { deleteUserTransaction } from '@/Redux/Slices/userSlice';
import { saveUserPreferences } from '@/Firebase/firebaseUserData';

type WrapperProps = {
  page: string,
  displayedTransactions: Transaction[],
}

const TransactionsCardsWrapper: React.FC<WrapperProps> = ({ page, displayedTransactions }) => {

  const dispatch = useDispatch<AppDispatch>();

  const { user, userPreferences } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.settings);





const handleDeleteTransaction = (id: number) => {
  if (window.confirm('¿Deseas eliminar esta transacción?')) {
    if (user?.uid) {

      const updatedTransactions = userPreferences?.transactions?.filter(
        (t) => t.id !== id
      );

      dispatch(deleteUserTransaction(id));

      const updatedPreferences = {
        ...userPreferences,
        transactions: updatedTransactions,
      };

      saveUserPreferences(user.uid, updatedPreferences);
    }

    dispatch(deleteTransaction(id));
  }
};

  const renderDateByResol = (date: string) => {
    if (window.innerWidth < 500) {
      return date.replaceAll('-', '/').slice(2)
    }
    return date
  }

 const renderDescriptionByResol = (name: string) => {
   if (window.innerWidth < 400) {
     return name.slice(0,6);
   }
  if (window.innerWidth < 850) {
    return name.slice(0,7);
  }
  return name
 }

  return (
    <CardsWrapper $page={page}>

      <ul>
        <li>Fecha</li>
        <li className='type'>Tipo</li>
        <li className='description'>Descripción</li>
        <li className='amount'>Monto</li>
      </ul>

      {

        displayedTransactions.length > 0 ? (
          (page === "home"
            ? displayedTransactions.slice(-4)
            : displayedTransactions
          ).map((transaction) => (
            <TransactionCard
              $theme={theme}
              $page={page}
              key={transaction.id}
              $income={transaction.type === 'income'}>
              <span className='date'>{renderDateByResol(transaction.date)}</span>
              <span className='type'>{transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
              <span className='description'>{renderDescriptionByResol(transaction.name)}</span>
              <div>
                <span className='amount'>${(Number(transaction.amount)).toLocaleString('es-ES')}
                </span>
                <button onClick={() => handleDeleteTransaction(transaction.id)}> x
                </button>
              </div>
            </TransactionCard>
          ))
        ) : (
          <p>No hay transacciones registradas.</p>
        )
      }



    </CardsWrapper>
  )
}

export default TransactionsCardsWrapper
