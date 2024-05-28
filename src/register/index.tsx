import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../contexts/auth'
import RegisterProfessional from './registerProfessional';
import RegisterClient from './registerCLient';

export default function Register({navigation}: any) {
    const {isProfessional} = useAuth();

    return isProfessional ? <RegisterProfessional goBack={() => navigation.goBack()}/> : <RegisterClient goBack={() => navigation.goBack()}/>
}