import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';
import LogoCliente from '../assets/images/@types/svg/LOGIN-CLIENTE.svg'
import LogoProfissional from  '../assets/images/@types/svg/LOGIN-PROF.svg'
import { useState  } from 'react';
import {orangeDefault, blueDefault } from "../shared/styleConsts";
import { View, Button } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function SignIn() {
    const { signIn } = useAuth();
    const [ color, setColor ] = useState('orange');
    const [logo, setLogo] = useState(<LogoCliente style={style.logo} />);

    const switchColor= () => {
        if (color == blueDefault){
            setColor(orangeDefault)
            setLogo(<LogoCliente style={style.logo} />);
        }else{
            setColor(blueDefault)
            setLogo(<LogoProfissional style={style.logo} />);
        }
        

    }

    function handleSignIn(professional: boolean) {
        signIn(professional);
    }
//  onPress={() => handleSignIn(true)} no botao de profissional
//  onPress={() => handleSignIn(false)} no botao de cliente

    return (
        <SafeAreaView style={style.container}>
            {logo}
            <TouchableOpacity style={style.botao}>
                <Text>PROFISSIONAL</Text>

            </TouchableOpacity>


            <Button title="Botão 1" color={color} onPress={switchColor} />
        </SafeAreaView>
    )
}