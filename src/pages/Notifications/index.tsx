import { View, Text } from 'react-native'
import React from 'react'
import NotificationsProfessional from '../../components/NotificationsProfessional'
import { useAuth } from '../../contexts/auth'
import { blueDefault, orangeDefault } from '../../shared/styleConsts';

export default function Notifications(props: any) {
  const { user, isProfessional } = useAuth();
  return (
    <NotificationsProfessional id={user?.id} defaultColor={isProfessional ? blueDefault : orangeDefault} navigation={props.navigation} isProfessional={isProfessional}/>
  )
}