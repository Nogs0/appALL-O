import React from 'react';
import { useAuth } from '../../contexts/auth';
import ClientProfile from './ClientProfile';
import ProfessionalNotifications from './ProfessionalNotifications';

export default function SecondTab(props: any) {
  const { user, isProfessional } = useAuth();
  return (isProfessional ?
    <ProfessionalNotifications id={user?.id} /> :
    <ClientProfile id={user?.id}></ClientProfile>
  )
}