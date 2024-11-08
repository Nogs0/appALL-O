import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional'
import { greyDefault, redDefault } from '../../../../../shared/styleConsts'
import style from './style'
import styleRegister from '../../style';
import { useAPI } from '../../../../../contexts/api'
import { showMessage } from 'react-native-flash-message'

export default function RegisterProfessional_CreatingProfession({ navigation }: any) {

  const { sugerirProfissao } = useAPI();
  const [desc, setDesc] = useState<string>('');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonNext = () => {
    if (canGoToTheNextStep()) {
      sugerirProfissao(desc)
        .then(() => {
          navigation.navigate('RegisterProfessional_OkProfession')
        })
        .catch(() => showMessage({
          message: 'Falha ao enviar sugestão!',
          type: 'danger'
        }))
    }
    else setIncorrectInformations(true)
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      desc.length > 0
    )
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Fale um pouco sobre sua profissão...</Text>

        <TextInput placeholder={'Domador de leões...'}
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
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, coloque alguma descrição sobre sua profissão!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}