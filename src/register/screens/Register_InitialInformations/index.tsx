import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../../components/Input';
import { useRegister } from '../../../contexts/register';
import style from './style';
import styleRegister from '../../style';

export default function Register_InitialInformations({ navigation }: any) {
  const { professional, setInitialInformations } = useRegister();

  const [document, setDocument] = useState<string>(!!professional ? professional.document : '');
  const [email, setEmail] = useState<string>(!!professional ? professional.email : '');
  const [password, setPassword] = useState<string>(!!professional ? professional.password : '');

  const handleButtonNext = () => {
    setInitialInformations({
      document, email, password
    });

    navigation.navigate('Register_Services');
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={styleRegister.title}>Seja bem-vindo!</Text>
      <Text style={styleRegister.text}>Preencha os campos para criar a sua conta...</Text>
      <View style={style.contentContainer}>
        <Input placeHolder='CNPJ ou CPF' text={document} onChangeText={setDocument}></Input>
        <Input placeHolder='Email' text={email} onChangeText={setEmail}></Input>
        <Input placeHolder='Senha' text={password} onChangeText={setPassword}></Input>
        <TouchableOpacity style={styleRegister.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}