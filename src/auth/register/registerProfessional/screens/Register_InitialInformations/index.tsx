import React, { useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styleRegister from '../../style';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import InputPassword from '../../../../../components/InputPassword';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { regexCPF, regexEMAIL } from '../../../../../shared/helpers';
import { redDefault } from '../../../../../shared/styleConsts';

export default function Register_InitialInformations({ navigation }: any) {
  const { professional, setInitialInformations, clearProfessional } = useRegisterProfessional();

  const [document, setDocument] = useState<string>(!!professional ? professional.document : '');
  const [email, setEmail] = useState<string>(!!professional ? professional.email : '');
  const [password, setPassword] = useState<string>(!!professional ? professional.password : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({
      document, email, password
    });

    if (canGoToTheNextStep())
      navigation.navigate('Register_Services');
    else setIncorrectInformations(true)
  }

  const handleGoBack = () => {
    clearProfessional();
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      2 > 1
    )
  }

  return (
    
    <ScrollView contentContainerStyle={styleRegister.defaultContainer} keyboardShouldPersistTaps='handled' scrollEnabled={false}>
      <TouchableOpacity onPress={() => navigation.navigate('Register_CreatingProfession')}>
        <Text style={{color: redDefault}}>AAAAAAAAAAAA</Text>
      </TouchableOpacity>
      <HeaderRegisterProfessional navigation={navigation} goBack={handleGoBack} initialScreen />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Seja bem-vindo!</Text>
        <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
        <View style={styleRegister.inputsContainer}>
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
      </View>

    </ScrollView>
  )
}