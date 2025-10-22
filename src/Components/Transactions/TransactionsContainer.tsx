import React from 'react'
import { TransactionCard, CardsWrapper } from './transactionsStyled'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Types/types';
import { deleteTransaction, eraseAllTransactions } from '@/Redux/Slices/transactions';

type WrapperProps = {
  title: string,
  page: string,
}

const TransactionsCardsWrapper: React.FC<WrapperProps> = ({ title, page }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector((state: RootState) => state.transactions);
  const { theme } = useSelector((state: RootState) => state.settings);


  const handleDeleteTransaction = (id: number) => {
    if (window.confirm('¿Desea eliminar esta transacción?')) {
      dispatch(deleteTransaction(id));
    }
    else { return }

  };

  const handleEraseTransactions = () => {
    if (window.confirm('¿Estas seguro de eliminar todas las transacciones?')) {
      dispatch(eraseAllTransactions());
    }
    else { return }
  }

  return (
    <CardsWrapper $page={page}>
      <div>
        <h2>{title}</h2>
        {
          transactions.length > 0 &&
          <button className='deleteAll' onClick={() => handleEraseTransactions()}>Borrar Todo</button>
        }
      </div>
      
      <ul>
        <li>Fecha</li>
        <li className='type'>Tipo</li>
        <li className='description'>Descripción</li>
        <li className='amount'>Monto</li>
      </ul>

      {
        transactions.length > 0 ? (
          (page === "home"
            ? transactions.slice(-4)
            : transactions
          ).map((transaction) => (
            <TransactionCard
              $theme={theme}
              $page={page}
              key={transaction.id}>
              <span className='date'>{transaction.date}</span>
              <span className='type'>{transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
              <span className='description'>{transaction.name}</span>
              <span className='amount'>${(Number(transaction.amount)).toLocaleString('es-ES')}</span>
              <button onClick={() => handleDeleteTransaction(transaction.id)}> x </button>
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
