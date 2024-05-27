import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import HeaderRegisterProfessional from '../../../components/HeaderRegisterProfessional'
import Input from '../../../components/Input'
import { useRegister } from '../../../contexts/register'
import style from './style'

import styleRegister from '../../style';
export default function Register_ServiceLocation({ navigation }: any) {

  const { professional, setAddress } = useRegister();

  const [postalCode, setPostalCode] = useState<string>(!!professional ? professional.address?.postalCode : '');
  const [neighborhood, setNeighborhood] = useState<string>(!!professional ? professional.address?.neighborhood : '');
  const [street, setStreet] = useState<string>(!!professional ? professional.address?.street : '');
  const [number, setNumber] = useState<string>(!!professional ? professional.address?.number : '');

  const handleButtonNext = () => {
    setAddress({
      postalCode,
      neighborhood,
      street,
      number,
    });
    navigation.navigate('Register_Contact');
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Como o cliente pode te encontrar?</Text>
        <View style={style.inputsContainer}>
          <Input placeHolder='CEP' text={postalCode} onChangeText={setPostalCode} />
          <Input placeHolder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
          <Input placeHolder='Rua' text={street} onChangeText={setStreet} />
          <Input placeHolder='Número' text={number} onChangeText={setNumber} />
        </View>
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}