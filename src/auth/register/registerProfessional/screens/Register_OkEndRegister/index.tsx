import React from 'react';
import { SafeAreaView } from 'react-native';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import { useAuth } from '../../../../../contexts/auth';
import { useRegister } from '../../../../../contexts/register';
import styleRegister from '../../style';
import Ok from '../../../../../components/Ok';

export default function Register_OkEndRegister({ navigation }: any) {

  const { endRegister } = useAuth();
  const { clearProfessional } = useRegister();
  const handleButtonOk = () => {
    clearProfessional();
    endRegister();
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} endingRegister />
      <Ok title='Sua conta foi criada com sucesso!' text='Você será redirecionado para a tela de login!' callbackOk={() => handleButtonOk()}></Ok>
    </SafeAreaView>
  )
}