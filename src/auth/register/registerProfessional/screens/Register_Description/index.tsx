import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import style from './style'
import styleRegister from '../../style';
import { useRegister } from '../../../../../contexts/register';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import { greyDefault, redDefault } from '../../../../../shared/styleConsts';

export default function Register_Description({ navigation }: any) {
  const { professional, setDescription } = useRegister();

  const [desc, setDesc] = useState<string>(!!professional ? professional?.description : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);
  const handleButtonNext = () => {
    setDescription(desc);

    if (canGoToTheNextStep())
      navigation.navigate('Register_ServiceLocation');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextStep = (): boolean => {
    console.log(desc)
    return (
      desc.length > 0
    )
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Fale um pouco sobre seu modo de trabalho...</Text>

        <TextInput placeholder={'Sou um profissional pontual e que gosta de que tudo esteja bem feito!'}
          onFocus={() => setIncorrectInformations(false)}
          style={style.textArea}
          value={desc}
          onChangeText={setDesc}
          multiline={true}
          numberOfLines={6}
          placeholderTextColor={greyDefault}
          textAlignVertical='top' />
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, coloque alguma descrição sobre seu trabalho!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}