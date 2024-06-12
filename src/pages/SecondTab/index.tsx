import React from 'react';
import NotificationsProfessional from '../../components/NotificationsProfessional';
import { useAuth } from '../../contexts/auth';
import { blueDefault, orangeDefault } from '../../shared/styleConsts';
import ClientProfile from './ClientProfile';

export default function SecondTab(props: any) {
  const { user, isProfessional } = useAuth();
  return (isProfessional ?
    <NotificationsProfessional id={user?.id} /> :
    <ClientProfile id={user?.id}></ClientProfile>
  )
}