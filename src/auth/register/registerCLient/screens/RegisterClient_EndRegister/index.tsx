import React from 'react';
import { SafeAreaView, View } from 'react-native';
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import Ok from '../../../../../components/Ok';
import { useAuth } from '../../../../../contexts/auth';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import { orangeDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';

export default function RegisterClient_OkEndRegister({ navigation }: any) {

  const { endRegister } = useAuth();
  const { clearClient } = useRegisterClient();

  const handleButtonOk = () => {
    clearClient();
    endRegister();
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterClient navigation={navigation} endingRegister />
      <View style={{ width: '80%', position: 'absolute', top: '25%' }}>
        <Ok buttonColor={orangeDefault} title='Sua conta foi criada com sucesso!' text='Você será redirecionado para a tela de login!' callbackOk={() => handleButtonOk()}></Ok>
      </View>
    </SafeAreaView>
  )
}