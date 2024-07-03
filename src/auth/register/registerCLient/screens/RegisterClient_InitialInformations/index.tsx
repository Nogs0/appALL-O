import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import Input from '../../../../../components/Input';
import InputPassword from '../../../../../components/InputPassword';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import { maskPhone, regexDocumento, regexEMAIL } from '../../../../../shared/helpers';
import { redDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';

export default function RegisterProfessional_InitialInformations({ navigation }: any) {

  const { client, setInitialInformations, clearClient } = useRegisterClient();
  const [cpfCnpj, setCpfCnpj] = useState<string>(!!client ? client.cliente.cpfCnpj : '');
  const [nome, setNome] = useState<string>(client ? client.cliente.nome : '');
  const [email, setEmail] = useState<string>(client ? client.cliente.email : '');
  const [telefone, setTelefone] = useState<string>(client ? client.cliente.telefone : '');
  const [senha, setSenha] = useState<string>(client ? client.usuario.senha : '');
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);
  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  const [incorrectCpfCnpj, setIncorrectCpfCnpj] = useState<boolean>(false);
  const [incorrectTelefone, setIncorrectTelefone] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({ email, telefone, cpfCnpj, nome, senha });

    if (canGoToTheNextStep()) {
      navigation.navigate('RegisterClient_CEP');
    } 
  }

  const handleGoBack = () => {
    clearClient();
  }

  const canGoToTheNextStep = (): boolean => {
    setIncorrectEmail(!regexEMAIL.test(email.trim().toLowerCase()))
    setIncorrectPassword(!(senha.length > 7))
    setIncorrectCpfCnpj(!regexDocumento.test(cpfCnpj))
    setIncorrectTelefone(telefone.length != 15)
    
    return (
      regexEMAIL.test(email.trim().toLowerCase()) && senha.length > 7 && regexDocumento.test(cpfCnpj) && telefone.length == 15
    );
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterClient navigation={navigation} goBack={handleGoBack} initialScreen />
      <KeyboardAvoidingView style={style.scrollViewDefaultContentContainer}>
        <ScrollView>
          <Text style={styleRegister.title}>Seja bem-vindo!</Text>
          <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
          <View style={styleRegister.inputsContainer}>
            <Input placeholder='Nome' text={nome} onChangeText={setNome} />
            <Input keyboardType='number-pad' isMask mask={maskPhone} onFocus={() => setIncorrectTelefone(false)} placeholder='Telefone' text={telefone} onChangeText={setTelefone}></Input>
            {
              incorrectTelefone ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Insira um telefone válido!</Text>
                : null
            }
            <Input onFocus={() => setIncorrectCpfCnpj(false)} keyboardType='number-pad' placeholder='CPF' text={cpfCnpj} onChangeText={setCpfCnpj}></Input>
            {
              incorrectCpfCnpj ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Insira um documento válido!</Text>
                : null
            }
            <Input keyboardType='email-address' onFocus={() => setIncorrectEmail(false)} placeholder='Email' text={email} onChangeText={(value) => setEmail(value.toLowerCase())} />
            {
              incorrectEmail ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Insira um email válido!</Text>
                : null
            }
            <InputPassword onFocus={() => setIncorrectPassword(false)} text={senha} onChangeText={setSenha} />
            {
              incorrectPassword ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*A senha deve possuir no mínimo 8 digitos!</Text>
                : null
            }
          </View>
          <TouchableOpacity style={styleRegister.buttonNext} onPress={handleButtonNext}>
            <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
