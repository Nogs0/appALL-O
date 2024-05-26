import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';

export default function SignIn({ navigation }: any) {
    const { signIn, register, isProfessional } = useAuth();
    function handleSignIn(professional: boolean) {
        signIn(professional);
    }

    function handleRegister(professional: boolean) {
        register(professional);
    }

    return isProfessional ?
        navigation.navigate('RegisterProfessional')
        :
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
        </SafeAreaView>
}