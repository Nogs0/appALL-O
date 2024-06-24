import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import styleRegister from '../../style';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import { maskPhone } from '../../../../../shared/helpers';
import { showMessage } from 'react-native-flash-message';

export default function RegisterProfessional_Contact({ navigation }: any) {

  const { profissional, setContacts } = useRegisterProfessional();
  const [telefone, setTelefone] = useState<string>(!!profissional ? profissional.provedor.telefone : '');

  const handleButtonNext = () => {
    setContacts(telefone);

    if (canGoToTheNextStep())
      navigation.navigate('RegisterProfessional_AddProfilePic');
    else showMessage({
      message: 'Preencha os campos corretamente!',
      type: 'warning'
    })
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      telefone.length == 15
    )
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Como o cliente pode entrar em contato?</Text>
        <View style={styleRegister.inputsContainer}>
          <Input keyboardType='number-pad' isMask mask={maskPhone} placeholder='Celular' text={telefone} onChangeText={setTelefone} />
        </View>
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}