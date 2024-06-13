import { View, Text } from 'react-native'
import React from 'react'
import RegisterProfessional from './registerProfessional';
import RegisterClient from './registerCLient';
import { useAuth } from '../../contexts/auth';

export default function Register({navigation}: any) {
    const {isProfessional} = useAuth();

    return isProfessional ? <RegisterProfessional goBack={() => navigation.goBack()}/> : <RegisterClient goBack={() => navigation.goBack()}/>
}