import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import InputPassword from '../../../../../components/InputPassword';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { maskPhone, regexDocumento, regexEMAIL } from '../../../../../shared/helpers';
import { redDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style'

export default function RegisterProfessional_InitialInformations({ navigation }: any) {
  const { profissional, setInitialInformations, clearProfessional } = useRegisterProfessional();

  const [cpfCnpj, setCpfCnpj] = useState<string>(!!profissional ? profissional.cpfCnpj : '');
  const [razaoSocial, setRazaoSocial] = useState<string>(!!profissional ? profissional.razaoSocial : '');
  const [email, setEmail] = useState<string>(!!profissional ? profissional.email : '');
  const [senha, setSenha] = useState<string>(!!profissional ? profissional.senha : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({
      razaoSocial, cpfCnpj, email, senha
    });

    if (canGoToTheNextStep())
      navigation.navigate('RegisterProfessional_Services');
    else setIncorrectInformations(true)
  }

  const handleGoBack = () => {
    clearProfessional();
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      regexDocumento.test(cpfCnpj) && regexEMAIL.test(email) && senha.length > 0 && razaoSocial.length > 0
    )
  }

  return (

    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} goBack={handleGoBack} initialScreen />
      <KeyboardAvoidingView style={style.scrollViewDefaultContentContainer}>
        <ScrollView>
          <Text style={styleRegister.title}>Seja bem-vindo!</Text>
          <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
          <View style={styleRegister.inputsContainer}>
            <Input onFocus={() => setIncorrectInformations(false)} placeholder='Nome' text={razaoSocial} onChangeText={setRazaoSocial}></Input>
            <Input keyboardType='number-pad' onFocus={() => setIncorrectInformations(false)} placeholder='CNPJ ou CPF' text={cpfCnpj} onChangeText={setCpfCnpj}></Input>
            <Input keyboardType='email-address' onFocus={() => setIncorrectInformations(false)} placeholder='Email' text={email} onChangeText={setEmail}></Input>
            <InputPassword onFocus={() => setIncorrectInformations(false)} text={senha} onChangeText={setSenha}></InputPassword>
          </View>
          {
            incorrectInformations ?
              <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
              : <></>
          }
          <TouchableOpacity style={styleRegister.buttonNext}
            onPress={() => handleButtonNext()}>
            <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}