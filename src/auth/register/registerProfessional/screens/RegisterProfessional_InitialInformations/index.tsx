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

  const [cpfCnpj, setCpfCnpj] = useState<string>(!!profissional ? profissional.provedor.cpfCnpj : '');
  const [razaoSocial, setRazaoSocial] = useState<string>(!!profissional ? profissional.provedor.razaoSocial : '');
  const [email, setEmail] = useState<string>(!!profissional ? profissional.usuario.login : '');
  const [senha, setSenha] = useState<string>(!!profissional ? profissional.usuario.senha : '');
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);
  const [incorrectEmail, setIncorrectEmail] = useState<boolean>(false);
  const [incorrectCpfCnpj, setIncorrectCpfCnpj] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({
      razaoSocial, cpfCnpj, email, senha
    });

    if (canGoToTheNextStep())
      navigation.navigate('RegisterProfessional_Services');
  }

  const handleGoBack = () => {
    clearProfessional();
  }

  const canGoToTheNextStep = (): boolean => {
    setIncorrectEmail(!regexEMAIL.test(email.trim().toLowerCase()))
    setIncorrectPassword(!(senha.length > 7))
    setIncorrectCpfCnpj(!regexDocumento.test(cpfCnpj))
    return (
      regexDocumento.test(cpfCnpj) && regexEMAIL.test(email) && senha.length > 7 && razaoSocial.length > 0
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
            <Input placeholder='Nome' text={razaoSocial} onChangeText={setRazaoSocial}></Input>
            <Input keyboardType='number-pad' onFocus={() => setIncorrectCpfCnpj(false)} placeholder='CNPJ ou CPF' text={cpfCnpj} onChangeText={setCpfCnpj}></Input>
            {
              incorrectCpfCnpj ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Insira um documento válido!</Text>
                : null
            }
            <Input keyboardType='email-address' onFocus={() => setIncorrectEmail(false)} placeholder='Email' text={email} onChangeText={(value) => setEmail(value.toLowerCase())}></Input>
            {
              incorrectEmail ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Insira um email válido!</Text>
                : null
            }
            <InputPassword onFocus={() => setIncorrectPassword(false)} text={senha} onChangeText={setSenha}></InputPassword>
            {
              incorrectPassword ?
                <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*A senha deve possuir no mínimo 8 digitos!</Text>
                : null
            }
          </View>
          <TouchableOpacity style={styleRegister.buttonNext}
            onPress={() => handleButtonNext()}>
            <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}