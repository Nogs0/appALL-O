import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { regexEMAIL } from '../../../../shared/helpers';
import HeaderRegisterClient from '../../../../components/HeaderRegisterClient';
import Input from '../../../../components/Input';
import InputPassword from '../../../../components/InputPassword';
import styleRegister from '../../style'
import { redDefault } from '../../../../shared/styleConsts';
import { useRegisterClient } from '../../../../contexts/registerClient';

export default function Register_InitialInformations({ navigation }: any) {
  const { client, setInitialInformations, clearClient } = useRegisterClient();

  console.log("Context:", { client, setInitialInformations, clearClient });
  const [name, setName] = useState<string>(client ? client.email : '');
  const [email, setEmail] = useState<string>(client ? client.email : '');
  const [password, setPassword] = useState<string>(client ? client.password : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {


    setInitialInformations({ name, email, password });

    if (canGoToTheNextStep()) {
      navigation.navigate('Register_CEP');
    } else {
      setIncorrectInformations(true);
    }
  }

  const handleGoBack = () => {
    clearClient();
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      regexEMAIL.test(email.trim().toLowerCase()) && password.length > 0
    );
  }

  return (
    <ScrollView contentContainerStyle={styleRegister.defaultContainer} keyboardShouldPersistTaps='handled' scrollEnabled={false}>
      <HeaderRegisterClient navigation={navigation} goBack={handleGoBack} initialScreen />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Seja bem-vindo!</Text>
        <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
        <View style={styleRegister.inputsContainer}>
          <Input onFocus={() => setIncorrectInformations(false)} placeholder='Email' text={email} onChangeText={setEmail} />
          <Input onFocus={() => setIncorrectInformations(false)} placeholder='Nome' text={name} onChangeText={setName} />
          <InputPassword onFocus={() => setIncorrectInformations(false)} text={password} onChangeText={setPassword} />
        </View>
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
            : null
        }
        <TouchableOpacity style={styleRegister.buttonNext} onPress={handleButtonNext}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
