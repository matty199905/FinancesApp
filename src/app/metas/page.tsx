"use client";
import React, { useState } from 'react'
import { GoalsContainer, GoalsRegisterContainer, GoalsWrapper } from './pageStyled'
import GoalCard from '@/Components/GoalCard/GoalCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, Goal, RootState } from '@/Types/types';
import Button from '@/Components/UI/SubmitBtn/Button';
import { addGoal, eraseAllGoals } from '@/Redux/Slices/goalsSlice';
import { saveUserPreferences } from '@/Firebase/firebaseUserData';




const Metas: React.FC = () => {

  const { theme } = useSelector((state: RootState) => state.settings);
  const { goals } = useSelector((state: RootState) => state.goals);
  const settings = useSelector((state: RootState) => state.settings);
  const { user, userPreferences } = useSelector((state: RootState) => state.user);
  const [newGoal, setNewGoal] = useState<Goal>({
    id: 0,
    name: '',
    amount: '',
    progress: 0,
  });
  const dispatch = useDispatch<AppDispatch>();

  const displayedGoals = user?.uid ? userPreferences?.goals ?? [] : goals;

  const handleOnChcange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const goalWithID = {
      ...newGoal,
      id: Date.now(),
      amount: Number(newGoal.amount),
      name: newGoal.name.slice(0, 1).toUpperCase() + newGoal.name.slice(1)
    };

    dispatch(addGoal(goalWithID));

    if (user?.uid) {
      await saveUserPreferences(user.uid, { ...settings, goals: [...goals, goalWithID] });
    }

    setNewGoal({
      id: 0,
      name: '',
      amount: '',
      progress: 0,
    });
  }


  const handleEraseGoals = () => {
    if (window.confirm('¿Estas seguro de eliminar todas las transacciones?')) {
      dispatch(eraseAllGoals());
    }
    return;
  };

  return (
    <GoalsWrapper>
      <h1>Registros de Metas</h1>

      <GoalsRegisterContainer $theme={theme}>
        <h2>Nueva Meta</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder='Ingrese su meta...'
            name='name'
            value={newGoal.name ?? ''}
            required
            onChange={(e) => handleOnChcange(e)} />

          <input
            type="number"
            step="any"
            placeholder='Monto de la meta...'
            name='amount'
            value={newGoal.amount ?? ''}
            required
            onChange={(e) => handleOnChcange(e)} />
          <Button>Guardar</Button>
          {
            goals.length > 0 &&
            <button type='button' className='deleteAll' onClick={() => handleEraseGoals()}>
              Borrar Todo
            </button>
          }
        </form>
      </GoalsRegisterContainer>

      <p>NOTA: Recuerde registrar el progreso asignado en la sección de transacciones para que se vea reflejado en su balance.</p>



      <GoalsContainer>
        {
          displayedGoals.length > 0 ? (
            displayedGoals.map((item) => (
              <GoalCard key={item.id} id={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <span className='remaining-money'>
                    Dinero Restante: ${(Number(item.amount) - item.progress).toLocaleString('es-ES')}
                  </span>
                  <span>
                    ${(item.progress).toLocaleString('es-ES')} de ${(Number(item.amount)).toLocaleString('es-ES')}
                  </span>
                </div>
              </GoalCard>
            ))
          ) : (
            <p>No hay metas registradas.</p>
          )
        }


      </GoalsContainer>


    </GoalsWrapper>
  )
}

export default Metas
