"use client";
import React, { useState } from 'react';
import { OverFlowContainer, TransactionsWrapper } from './pageStyled';
import TransactionsCardsWrapper from '@/Components/Transactions/TransactionsContainer';
import { AppDispatch, RootState, Transaction } from '@/Types/types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/Components/UI/SubmitBtn/Button';
import { addTransaction } from '@/Redux/Slices/transactionsSlice';



const Registro = () => {

  const { theme } = useSelector((state: RootState) => state.settings);
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
      [name]:
        name === "amount" ? Number(value) : value
    });
  }




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const transactionWithID = {
      ...newTransaction,
      id: Date.now(),
      name: newTransaction.name.slice(0, 1).toUpperCase() + newTransaction.name.slice(1),
      month: Number(newTransaction.date.slice(5, 7)),
      year: Number(newTransaction.date.slice(0, 4)),

    };

    dispatch(addTransaction(transactionWithID));

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

  return (
    <TransactionsWrapper $theme={theme}>
      <h1>Registrar nueva Transaccion</h1>
      <form onSubmit={(e) => handleSubmit(e)}>

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
            <option value="perdida">Pérdida/Inversiones</option>
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

        <Button>Guardar</Button>
      </form>

      <OverFlowContainer>
        <TransactionsCardsWrapper title='Registro de Transacciones' page='transactions' />
      </OverFlowContainer>

    </TransactionsWrapper>
  )
}

export default Registro
