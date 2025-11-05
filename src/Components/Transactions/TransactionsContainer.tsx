import React from 'react'
import { TransactionCard, CardsWrapper } from './transactionsStyled'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { deleteTransaction } from '@/Redux/Slices/transactionsSlice';

type WrapperProps = {
  page: string,
}

const TransactionsCardsWrapper: React.FC<WrapperProps> = ({ page }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector((state: RootState) => state.transactions);
  const { theme } = useSelector((state: RootState) => state.settings);
  const { user, userPreferences } = useSelector((state: RootState) => state.user);



  const displayedTransactions = user?.uid ? userPreferences?.transactions ?? [] : transactions;


  const handleDeleteTransaction = (id: number) => {
    if (window.confirm('¿Desea eliminar esta transacción?')) {
      dispatch(deleteTransaction(id));
    }
    else { return }
  };


  const renderDateByResol = (date: string) => {
    if (window.innerWidth < 500) {
      return date.replaceAll('-', '/').slice(2)
    }
    return date
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
              key={transaction.id}>
              <span className='date'>{renderDateByResol(transaction.date)}</span>
              <span className='type'>{transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
              <span className='description'>{transaction.name}</span>
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
