"use client";
import React, { useEffect, useState } from 'react';
import { TransactionsWrapper } from './pageStyled';
import TransactionsCardsWrapper from '@/Components/Transactions/TransactionsContainer';
import { AppDispatch, RootState, Transaction } from '@/Types/types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/Components/UI/SubmitBtn/Button';
import { addTransaction, eraseAllTransactions } from '@/Redux/Slices/transactionsSlice';
import { saveUserPreferences } from '@/Firebase/firebaseUserData';
import { eraseAllUserTransactions, setUserPreferences } from '@/Redux/Slices/userSlice';



const Registro = () => {

  const { theme } = useSelector((state: RootState) => state.settings);
  const { transactions } = useSelector((state: RootState) => state.transactions);
  const settings = useSelector((state: RootState) => state.settings);
  const { user, userPreferences } = useSelector((state: RootState) => state.user);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);


useEffect(() => {
  if (user?.uid) {
    setDisplayedTransactions(userPreferences?.transactions ?? []);
  } 
  else {
    setDisplayedTransactions(transactions);
  }
}, [user, userPreferences, transactions]);
  const dispatch = useDispatch<AppDispatch>();
  

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    name: '',
    amount: '',
    category: '',
    date: '',
    month: 0,
    year: 0,
    type: '',
  })



  const handleOnChcange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value.replace(',', '.'),
    });
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionWithID = {
      ...newTransaction,
      id: Date.now(),
      name: newTransaction.name.slice(0, 1).toUpperCase() + newTransaction.name.slice(1),
      month: Number(newTransaction.date.slice(5, 7)),
      year: Number(newTransaction.date.slice(0, 4)),
      amount: Number(newTransaction.amount) || 0,
    };

    dispatch(addTransaction(transactionWithID));

    if (user?.uid) {
      dispatch(setUserPreferences({...userPreferences, transactions: [...transactions, transactionWithID]}))
      await saveUserPreferences(user.uid, { ...settings, transactions: [...transactions, transactionWithID], });
    }

    setNewTransaction({
      id: 0,
      name: '',
      amount: '',
      category: '',
      date: '',
      month: 0,
      year: 0,
      type: '',
    });

  }


  const handleEraseTransactions = () => {
    if (window.confirm('¿Estas seguro de eliminar todas las transacciones?')) {
      if(user?.uid) {
        dispatch(eraseAllUserTransactions());
        dispatch(eraseAllTransactions());
        const updatedPreferences = {
        ...userPreferences,
        transactions: [],
      };
        saveUserPreferences(user.uid, {...updatedPreferences});
      }
    }
    else { return }
  }

  return (
    <TransactionsWrapper $theme={theme}>
      <h1>Registrar nueva Transaccion</h1>

      <form onSubmit={(e) => handleSubmit(e)}>


        <div>
          <label htmlFor='monto'>Monto</label>
          <input
            type="text"
            placeholder='$0.00'
            name='amount'
            value={newTransaction.amount ?? ''}
            required
            onChange={(e) => handleOnChcange(e)} />
        </div>

        <div>
          <label htmlFor='description'>Descripción</label>
          <input
            type="text"
            placeholder='Ingrese un título...'
            name='name'
            value={newTransaction.name ?? ''}
            required
            onChange={(e) => handleOnChcange(e)} />
        </div>

        <div>
          <label htmlFor='category'>Categoría</label>
          <select
            id="category"
            name="category"
            value={newTransaction.category}
            onChange={(e) => handleOnChcange(e)}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="alimentos">Alimentos</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            <option value="impuestos">Impuestos</option>
            <option value="salud">Salud</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="seguros">Seguros</option>
            <option value="perdida">Inversiones</option>
            <option value="otros">Otros</option>
          </select>
        </div>


        <div>
          <label htmlFor='fecha'>Fecha</label>
          <input
            className='date'
            type="date"
            placeholder='30/5/2025'
            name='date'
            value={newTransaction.date ?? ''}
            required
            onChange={(e) => handleOnChcange(e)} />
        </div>

        <div className='type'>
          <label htmlFor='tipo'>
            <input
              type="radio"
              name="type"
              value="income"
              checked={newTransaction.type === "income"}
              required
              onChange={() => setNewTransaction({ ...newTransaction, type: newTransaction.type === "income" ? "" : "income" })}
            />
            Ingreso
          </label>
          <label htmlFor='tipo'>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={newTransaction.type === "expense"}
              required
              onChange={() => setNewTransaction({ ...newTransaction, type: newTransaction.type === "expense" ? "" : "expense" })}
            />
            Gasto
          </label>
        </div>

        <Button>Guardar</Button>
      </form>



      <div className='title-and-deleteBtn'>
        <h2>Transacciones Registradas:</h2>
        {
          displayedTransactions.length > 0 &&
          <button className='deleteAll' onClick={() => handleEraseTransactions()}>Borrar Todo</button>
        }
      </div>
      <TransactionsCardsWrapper page={'transactions'} displayedTransactions={displayedTransactions} />


    </TransactionsWrapper>
  )
}

export default Registro
