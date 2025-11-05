"use client";
import React from 'react';
import { AssignRemoveContainer, CardContainer, GoalAndMount, GoalContainer, ProgressBar } from './goalCardStyled';
import { AppDispatch, RootState } from '@/Types/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGoal, setProgress } from '@/Redux/Slices/goalsSlice';
import { usePathname } from 'next/navigation';
import { deleteUserGoal } from '@/Redux/Slices/userSlice';
import { saveUserPreferences } from '@/Firebase/firebaseUserData';

type GoalCardProps = {
    children: React.ReactNode,
    id: number,
}

const GoalCard: React.FC<GoalCardProps> = ({ children, id }) => {

    const { theme } = useSelector((state: RootState) => state.settings);
    const { user, userPreferences } = useSelector((state: RootState) => state.user);
    const { goals } = useSelector((state: RootState) => state.goals);
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();


    const matchGoal = goals.find((item) => item.id === id);

    const progressPercentage = matchGoal ?
        Math.round((Number(matchGoal.progress) * 100) /
            Number(matchGoal.amount)) :
        0;

    const handleProgress = (id: number) => {
        if (matchGoal) {
            const input = window.prompt('¿Cuánto desea ingresar a esta meta?');
            if (input !== null && input > matchGoal.amount) {
                alert('El progreso no puede ser mayor al Monto de la Meta');
                return;
            }

            const newProgress = input !== null ? Number(input) : null;
            const progressPercentage = (Number(newProgress) * 100) / Number(matchGoal.amount);

            if (newProgress !== null && !isNaN(newProgress)) {
                dispatch(setProgress({ id, progress: newProgress, progressPercentage: progressPercentage }));
            }
            return;
        }
    };

    const handleDeleteGoal = (id: number) => {
        if (window.confirm('¿Deseas eliminar esta meta?')) {
            if (user?.uid) {
                const updatedGoals = userPreferences?.goals?.filter(
                    (t) => t.id !== id
                );

                dispatch(deleteUserGoal(id));

                const updatedPreferences = {
                    ...userPreferences,
                    goals: updatedGoals,
                };

                saveUserPreferences(user.uid, updatedPreferences);
            }

            dispatch(deleteGoal(id));
        }
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
                <button title='Asignar monto' onClick={() => handleProgress(id)}>+</button>
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
