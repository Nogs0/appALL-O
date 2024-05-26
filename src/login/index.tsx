import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';

export default function SignIn() {
    const { signIn } = useAuth();
    
    function handleSignIn(professional: boolean) {
        signIn(professional);
    }

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={style.botao}
                onPress={() => handleSignIn(true)}>
                <Text style={style.text}>PROFISSIONAL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.botao}
                onPress={() => handleSignIn(false)}>
                <Text style={style.text}>CLIENTE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}