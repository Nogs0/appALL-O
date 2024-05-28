import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRegister } from '../../../../contexts/register';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import Input from '../../../../components/Input';
import styleRegister from '../../style';

export default function Register_Contact({ navigation }: any) {

  const { professional, setContacts } = useRegister();

  const [phoneNumber, setPhoneNumber] = useState<string>(!!professional ? professional.contacts?.phoneNumber : '');
  const [cellPhoneNumber, setCellPhoneNumber] = useState<string>(!!professional ? professional.contacts?.cellPhoneNumber : '');

  const handleButtonNext = () => {
    setContacts({
      phoneNumber,
      cellPhoneNumber
    });

    navigation.navigate('Register_Images');
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Como o cliente pode entrar em contato?</Text>
        <View style={styleRegister.inputsContainer}>
          <Input placeHolder='Celular' text={cellPhoneNumber} onChangeText={setCellPhoneNumber} />
          <Input placeHolder='Telefone Fixo' text={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}