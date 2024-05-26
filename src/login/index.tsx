import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';
import LogoCliente from '../assets/images/@types/svg/LOGIN-CLIENTE.svg'


export default function SignIn() {
    const { signIn } = useAuth();
    
    function handleSignIn(professional: boolean) {
        signIn(professional);
    }
//  onPress={() => handleSignIn(true)} no botao de profissional
//  onPress={() => handleSignIn(false)} no botao de cliente
    return (
        <SafeAreaView style={style.container}>
            <LogoCliente style={style.logo}></LogoCliente>
            <TouchableOpacity style={style.botao}
               >
                <Text style={style.text}>PROFISSIONAL</Text>

            </TouchableOpacity>
            <TouchableOpacity style={style.botao}
                >
                <Text style={style.text}>CLIENTE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}