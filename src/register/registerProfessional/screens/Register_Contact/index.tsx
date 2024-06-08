import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { isValidElement, useState } from 'react'
import { useRegister } from '../../../../contexts/register';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import Input from '../../../../components/Input';
import styleRegister from '../../style';
import MaskInput from 'react-native-mask-input';

export default function Register_Contact({ navigation }: any) {

  const { professional, setContacts } = useRegister();
  const [phoneNumber, setPhoneNumber] = useState<string>(!!professional ? professional.phoneNumber : '');

  const handleButtonNext = () => {
    setContacts(phoneNumber);

    if (canGoToTheNextStep())
      navigation.navigate('Register_Images');
    else Alert.alert("Erro", "Preencha os campos corretamente!")
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      phoneNumber.length == 15
    )
  }

  const maskPhone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Como o cliente pode entrar em contato?</Text>
        <View style={styleRegister.inputsContainer}>
          <Input isMask mask={maskPhone} placeholder='Celular' text={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}