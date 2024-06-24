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
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({ email, telefone, cpfCnpj, nome, senha });

    if (canGoToTheNextStep()) {
      navigation.navigate('RegisterClient_CEP');
    } else {
      setIncorrectInformations(true);
    }
  }

  const handleGoBack = () => {
    clearClient();
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      regexEMAIL.test(email.trim().toLowerCase()) && senha.length > 0 && regexDocumento.test(cpfCnpj) && telefone.length == 15
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
              <Input onFocus={() => setIncorrectInformations(false)} placeholder='Nome' text={nome} onChangeText={setNome} />
              <Input keyboardType='number-pad' isMask mask={maskPhone} onFocus={() => setIncorrectInformations(false)} placeholder='Telefone' text={telefone} onChangeText={setTelefone}></Input>
              <Input onFocus={() => setIncorrectInformations(false)} keyboardType='number-pad' placeholder='CPF' text={cpfCnpj} onChangeText={setCpfCnpj}></Input>
              <Input keyboardType='email-address' onFocus={() => setIncorrectInformations(false)} placeholder='Email' text={email} onChangeText={setEmail} />
              <InputPassword onFocus={() => setIncorrectInformations(false)} text={senha} onChangeText={setSenha} />
            </View>
            {
              incorrectInformations ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
                : null
            }
            <TouchableOpacity style={styleRegister.buttonNext} onPress={handleButtonNext}>
              <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
            </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
