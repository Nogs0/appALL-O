import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import InputPassword from '../../../../../components/InputPassword';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { regexDocumento, regexEMAIL } from '../../../../../shared/helpers';
import { redDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style'

export default function RegisterProfessional_InitialInformations({ navigation }: any) {
  const { professional, setInitialInformations, clearProfessional } = useRegisterProfessional();

  const [document, setDocument] = useState<string>(!!professional ? professional.document : '');
  const [name, setName] = useState<string>(!!professional ? professional.name : '');
  const [email, setEmail] = useState<string>(!!professional ? professional.email : '');
  const [password, setPassword] = useState<string>(!!professional ? professional.password : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({
      document, email, password
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
      regexDocumento.test(document) && regexEMAIL.test(email) && password.length > 0 && name.length > 0
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
            <Input onFocus={() => setIncorrectInformations(false)} placeholder='Nome' text={name} onChangeText={setName}></Input>
            <Input keyboardType='number-pad' onFocus={() => setIncorrectInformations(false)} placeholder='CNPJ ou CPF' text={document} onChangeText={setDocument}></Input>
            <Input keyboardType='email-address' onFocus={() => setIncorrectInformations(false)} placeholder='Email' text={email} onChangeText={setEmail}></Input>
            <InputPassword onFocus={() => setIncorrectInformations(false)} text={password} onChangeText={setPassword}></InputPassword>
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