import React, { useState } from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderRegisterProfessional from '../../../components/HeaderRegisterProfessional'
import { useRegister } from '../../../contexts/register'
import { greyDefault } from '../../../shared/styleConsts'
import style from './style'
import styleRegister from '../../style';

export default function Register_Description({ navigation }: any) {
  const { professional, setDescription } = useRegister();

  const [desc, setDesc] = useState<string>(!!professional ? professional.description : '');

  const handleButtonNext = () => {
    setDescription(desc);
    navigation.navigate('Register_ServiceLocation');
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Fale um pouco sobre seu modo de trabalho...</Text>

        <TextInput placeholder={'Sou um profissional pontual e que gosta de que tudo esteja bem feito!'}
          style={style.textArea}
          value={desc}
          onChangeText={setDesc}
          multiline={true}
          numberOfLines={6}
          placeholderTextColor={greyDefault}
          textAlignVertical='top' />

        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}