import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/auth';
import style from './style';

import LogoCliente from '../assets/images/@types/svg/LOGIN-CLIENTE.svg';
import LogoProfissional from '../assets/images/@types/svg/LOGIN-PROF.svg';


import { useState } from 'react';
import { blueDefault, orangeDefault4 } from "../shared/styleConsts";

import Input from '../components/Input';
import Register from '../register';

export default function SignIn({ navigation }: any) {
    const { signIn, register, isRegister } = useAuth();

    const [color, setColor] = useState(orangeDefault4);
    const [isProfessional, setIsProfessional] = useState<boolean>(false);
    const [logo, setLogo] = useState(<LogoCliente />);
    const [text, setText] = useState('CLIENTE');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setColor(isProfessional ? blueDefault : orangeDefault4)
        setLogo(isProfessional ? <LogoProfissional /> : <LogoCliente />);
        setText(isProfessional ? 'PROFISSIONAL' : 'CLIENTE');
    }, [isProfessional])

    const handleSignIn = () => {
        setLoading(true)
        signIn(isProfessional)
            .finally(() => setLoading(false));
    }

    const handleRegister = () => {
        register(isProfessional);
    }

    if (isRegister) {
        return <Register navigation={navigation} />;
    }

    return (

        <SafeAreaView style={style.container}>
            {loading ?
                <ActivityIndicator size={70} color={color}></ActivityIndicator> :
                <>
                    {logo}
                    <TouchableOpacity
                        style={[style.botaoTrocaLogin, { backgroundColor: color }]}
                        onPress={() => setIsProfessional(!isProfessional)}>
                        <Icon name='change-circle' size={22} style={style.iconeTroca}></Icon>
                        <Text style={style.textTrocaLogin}> {text} </Text>
                    </TouchableOpacity>
                    <View style={style.inputsContainer}>
                        <Input placeholder='E-mail' text={email} onChangeText={setEmail} />
                        <Input placeholder="Senha" text={senha} onChangeText={setSenha} />
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity style={[style.botaoAcao, { backgroundColor: color }]} onPress={() => handleSignIn()}>
                            <Text style={style.textAcao}>ENTRAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[style.botaoAcao, { backgroundColor: color }]} onPress={() => handleRegister()}>
                            <Text style={style.textAcao}>REGISTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </>

            }
        </SafeAreaView>
    )
}