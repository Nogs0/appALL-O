import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional'
import Ok from '../../../../../components/Ok'
import { blueDefault } from '../../../../../shared/styleConsts'
import styleRegister from '../../style';

export default function RegisterProfessional_OkProfession({navigation} : any) {
  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} endingRegister />
      <View style={{ width: '80%', position: 'absolute', top: '25%' }}>
        <Ok buttonColor={blueDefault} title='Sua requisição foi enviada com sucesso!' text='Em até 7 dias sua conta estará pronta para você!' callbackOk={() =>  navigation.navigate('RegisterProfessional_Description')}></Ok>
      </View>
    </SafeAreaView>
  )
}