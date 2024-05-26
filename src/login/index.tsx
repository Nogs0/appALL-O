import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth';
import style from './style';


import LogoCliente from '../assets/images/@types/svg/LOGIN-CLIENTE.svg'
import LogoProfissional from  '../assets/images/@types/svg/LOGIN-PROF.svg'


import { useState  } from 'react';
import {orangeDefault4, blueDefault } from "../shared/styleConsts";

import { TextInput } from 'react-native';

export default function SignIn() {
    const { signIn } = useAuth();
  
    const [ color, setColor ] = useState(orangeDefault4);
    const [ logo, setLogo ] = useState(<LogoCliente style={style.logo} />);
    const [ text, setText ] = useState('CLIENTE');
    const [ email, setEmail] = useState('E-mail');
    const [ senha, setSenha] = useState('');

    const switchColor= () => {
        if (color == blueDefault){
            setColor(orangeDefault4)
            setLogo(<LogoCliente style={style.logo} />);
            setText('CLIENTE');
        }else{
            setColor(blueDefault)
            setLogo(<LogoProfissional style={style.logo} />);
            setText('PROFISSIONAL');
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
            <TouchableOpacity style={[style.botaoTrocaLogin, {backgroundColor: color}]}  onPress={switchColor}>
                <Text style={style.textTrocaLogin}> {text} </Text>
            </TouchableOpacity>
           <TextInput placeholder="E-mail"style={style.input} onChangeText={setEmail}/>
           <TextInput placeholder="Senha"style={style.input} onChangeText={setSenha}/>
            
           <TouchableOpacity style={[style.botaoAcao, {backgroundColor: color}]} onPress={() => {console.log("Botao entrar")}}>
                <Text style={style.textAcao}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.botaoAcao, {backgroundColor: color}]} onPress={() => {console.log("Botao registrar")}}>
                <Text style={style.textAcao}>REGISTRAR</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}