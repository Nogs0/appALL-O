import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';
import Register from '../register';

export default function SignIn({ navigation }: any) {
    const { signIn, register, isProfessional, isRegister } = useAuth();

    const handleSignIn = (professional: boolean) => {
        signIn(professional);
    }

    const handleRegister = (professional: boolean) => {
        register(professional);
    }

    if (isRegister) {
        return <Register navigation={navigation}/>; 
    }

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={style.botao}
                onPress={() => handleSignIn(true)}>
                <Text style={style.text}>PROFISSIONAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.botao2}
                onPress={() => handleRegister(true)}>
                <Text style={style.text2}>registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.botao}
                onPress={() => handleSignIn(false)}>
                <Text style={style.text}>CLIENTE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.botao2}
                onPress={() => handleRegister(false)}>
                <Text style={style.text2}>registrar</Text>
            </TouchableOpacity>
        </SafeAreaView>)
}