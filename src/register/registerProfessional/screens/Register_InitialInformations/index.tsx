import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import Input from '../../../../components/Input';
import { useRegister } from '../../../../contexts/register';
import styleRegister from '../../style';
import InputPassword from '../../../../components/InputPassword';

export default function Register_InitialInformations({ navigation, goBack }: any) {
  const { professional, setInitialInformations } = useRegister();

  const [document, setDocument] = useState<string>(!!professional ? professional.document : '');
  const [email, setEmail] = useState<string>(!!professional ? professional.email : '');
  const [password, setPassword] = useState<string>(!!professional ? professional.password : '');

  const handleButtonNext = () => {
    setInitialInformations({
      document, email, password
    });

    if (canGoToTheNextStep())
      navigation.navigate('Register_Services');
    else Alert.alert("Erro", "Por favor preencha todos os campos!")
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      document.length > 0 && email.length > 0 && password.length > 0
    )
  }
  
  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} goBack={goBack} initialScreen />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Seja bem-vindo!</Text>
        <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
        <View style={styleRegister.inputsContainer}>
          <Input placeholder='CNPJ ou CPF' text={document} onChangeText={setDocument}></Input>
          <Input placeholder='Email' text={email} onChangeText={setEmail}></Input>
          <InputPassword text={password} onChangeText={setPassword}></InputPassword>
        </View>
        <TouchableOpacity style={styleRegister.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}