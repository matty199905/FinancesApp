"use client";
import React from 'react';
import { AssignRemoveContainer, CardContainer, GoalAndMount, GoalContainer, ProgressBar } from './goalCardStyled';
import { AppDispatch, RootState } from '@/Types/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGoal, setProgress } from '@/Redux/Slices/goalsSlice';
import { usePathname } from 'next/navigation';

type GoalCardProps = {
    children: React.ReactNode,
    id: number,
}

const GoalCard: React.FC<GoalCardProps> = ({ children, id }) => {

    const { theme, totalBalance } = useSelector((state: RootState) => state.settings);
    const { goals } = useSelector((state: RootState) => state.goals);
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();



    const matchGoal = goals.find((item) => item.id === id);

    const progressPercentage = matchGoal ?
        Math.round((Number(matchGoal.progress) * 100) /
            Number(matchGoal.amount)) :
        0;

    const handleProgress = (addOrRemove: string, id: number) => {
        if (addOrRemove === 'add' && matchGoal) {

            const input = window.prompt('¿Cuánto desea ingresar a esta meta?');
            if (input !== null && input > matchGoal.amount) {
                alert('El progreso no puede ser mayor al Monto de la Meta');
                return;
            }
            else if (Number(input) > totalBalance) {
                alert('El progreso no puede ser mayor al Balance Total');
                return;}
            const newProgress = input !== null ? Number(input) : null;
            const progressPercentage = (Number(newProgress) * 100) / Number(matchGoal.amount);

            if (newProgress !== null && !isNaN(newProgress)) {
                dispatch(setProgress({ id, progress: newProgress, progressPercentage: progressPercentage }));
            }
            return;
        }
    };

      const handleDeleteGoal = (id: number) => {
        if (window.confirm('¿Desea eliminar esta transacción?')) {
          dispatch(deleteGoal(id));
        }
        else { return }
    
      };

    return (
    
        <CardContainer $theme={theme}>

            <GoalContainer $theme={theme}>

                <GoalAndMount>{children}</GoalAndMount>

                <div className='empty-bar'>
                    <ProgressBar $theme={theme} $percentage={progressPercentage} />
                </div>

            </GoalContainer>


            <AssignRemoveContainer $theme={theme} $metasUrl={pathname === '/metas'}>
                <button title='Asignar monto' onClick={() => handleProgress('add', id)}>+</button>
                <button
                    className='delete'
                    title='Eliminar meta'
                    onClick={() => matchGoal && handleDeleteGoal(matchGoal.id)}
                >x</button>
            </AssignRemoveContainer>

        </CardContainer>

    )
}

export default GoalCard
