import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import Input from '../../../../../components/Input';
import InputPassword from '../../../../../components/InputPassword';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import { regexEMAIL } from '../../../../../shared/helpers';
import { redDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';

export default function RegisterProfessional_InitialInformations({ navigation }: any) {

  const { client, setInitialInformations, clearClient } = useRegisterClient();
  const [nome, setNome] = useState<string>(client ? client.nome : '');
  const [email, setEmail] = useState<string>(client ? client.email : '');
  const [senha, setSenha] = useState<string>(client ? client.senha : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    setInitialInformations({ email, nome, senha });

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
      regexEMAIL.test(email.trim().toLowerCase()) && senha.length > 0
    );
  }

  return (
    <ScrollView contentContainerStyle={styleRegister.defaultContainer} keyboardShouldPersistTaps='handled' scrollEnabled={false}>
      <HeaderRegisterClient navigation={navigation} goBack={handleGoBack} initialScreen />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Seja bem-vindo!</Text>
        <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
        <View style={styleRegister.inputsContainer}>
          <Input onFocus={() => setIncorrectInformations(false)} placeholder='Nome' text={nome} onChangeText={setNome} />
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
        <TouchableOpacity style={styleRegister.buttonNext} onPress={(()=>{setInitialInformations({ email, nome, senha }); console.log(client)})}>
          <Text style={styleRegister.textButtonNext}>Printar</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
