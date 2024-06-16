import { View, Text } from 'react-native'
import React from 'react'
import RegisterProfessional from './registerProfessional';
import RegisterClient from './registerCLient';
import { useAuth } from '../../contexts/auth';
import { RegisterProfessionalProvider } from '../../contexts/registerProfessional';
import { RegisterClientProvider } from '../../contexts/registerClient';

export default function Register({ navigation }: any) {
    const { isProfessional } = useAuth();

    return isProfessional ?
        <RegisterProfessionalProvider>
            <RegisterProfessional goBack={() => navigation.goBack()} />
        </RegisterProfessionalProvider> :
        <RegisterClientProvider>
            <RegisterClient goBack={() => navigation.goBack()} />
        </RegisterClientProvider>
}