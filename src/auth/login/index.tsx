import React, { useEffect } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './style';

import LogoCliente from '../../assets/images/@types/svg/LOGIN-CLIENTE.svg';
import LogoProfissional from '../../assets/images/@types/svg/LOGIN-PROF.svg';

import { useState } from 'react';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import { useAuth } from '../../contexts/auth';
import { blackDefault, blueDefault, greyDefault, orangeDefault, orangeDefault4, redDefault, whiteDefault } from '../../shared/styleConsts';
import Register from '../register';


export default function SignIn({ navigation }: any) {
    const { signIn, register, isRegister, loading } = useAuth();

    const [color, setColor] = useState(orangeDefault4);
    const [isProfessional, setIsProfessional] = useState<boolean>(false);
    const [logo, setLogo] = useState(<LogoCliente />);
    const [text, setText] = useState('CLIENTE');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrectCredentials, setIncorrectCredentials] = useState<boolean>(false);

    useEffect(() => {
        setColor(isProfessional ? blueDefault : orangeDefault4)
        setLogo(isProfessional ? <LogoProfissional /> : <LogoCliente />);
        setText(isProfessional ? 'PROFISSIONAL' : 'CLIENTE');
    }, [isProfessional])

    const handleSignIn = () => {
        if (canSignIn()) {
            signIn({
                login: email,
                senha: password,
            })
                .then(() => {
                    setIncorrectCredentials(false)
                })
                .catch(() => {
                    setIncorrectCredentials(true)
                })
        } else setIncorrectCredentials(true);
    }

    const canSignIn = (): boolean => {
        return (email.length > 0 && password.length > 0)
    }

    const handleRegister = () => {
        register(isProfessional);
    }

    if (isRegister) {
        return <Register navigation={navigation} />;
    }

    return (
        <SafeAreaView style={style.container}>
            {
                loading ?
                    <ActivityIndicator size={70} color={orangeDefault} />
                    :
                    <>
                        {logo}
                        <TouchableOpacity
                            style={[style.botaoTrocaLogin, { backgroundColor: color }]}
                            onPress={() => setIsProfessional(!isProfessional)}>
                            <Icon name='change-circle' size={22} style={style.iconeTroca}></Icon>
                            <Text style={style.textTrocaLogin}> {text} </Text>
                        </TouchableOpacity>
                        <KeyboardAvoidingView style={{height: 165, width: '100%'}}>
                            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
                                <View style={style.inputsContainer}>
                                    <Input
                                        onFocus={() => setIncorrectCredentials(false)}
                                        borderColor={incorrectCredentials ? redDefault : greyDefault}
                                        placeholder='E-mail'
                                        keyboardType='email-address'
                                        text={email}
                                        onChangeText={(value) => setEmail(value.toLowerCase())} />
                                    <InputPassword
                                        onFocus={() => setIncorrectCredentials(false)}
                                        borderColor={incorrectCredentials ? redDefault : greyDefault}
                                        text={password}
                                        onChangeText={setPassword} />
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                        {
                            incorrectCredentials ?
                                <Text style={{ color: redDefault }}>*Email ou senha incorretos!</Text> : <></>
                        }
                        <View style={style.buttonsContainer}>
                            <View style={style.signInContainer}>
                                <TouchableOpacity style={[style.botaoAcao, { backgroundColor: color }]} onPress={() => handleSignIn()}>
                                    <Text style={style.textAcao}>ENTRAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', padding: 10 }}
                                    onPress={() => console.log('Esqueci minha senha!')}>
                                    <Text style={{ color: redDefault }}>Esqueci minha senha...</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.registerContainer}>
                                <Text style={{ color: blackDefault, fontFamily: 'Rubik-SemiBold' }}>
                                    Não tem uma conta?
                                </Text>
                                <TouchableOpacity style={[style.botaoAcao, { backgroundColor: color }]} onPress={() => handleRegister()}>
                                    <Text style={style.textAcao}>REGISTRAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
            }
        </SafeAreaView >
    )
}