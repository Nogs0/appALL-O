import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import { blackDefault } from '../../../../shared/styleConsts';
import style from './style';
import styleRegister from '../../style';
import { useAuth } from '../../../../contexts/auth';
import { useRegister } from '../../../../contexts/register';
import { useRegisterClient } from '../../../../contexts/registerClient';
import HeaderRegisterClient from '../../../../components/HeaderRegisterClient';

export default function Register_OkEndRegister({ navigation, type }: any) {
  if (type === 'client'){
    const { endRegister } = useAuth();
    const { clearProfessional } = useRegister();
    const handleButtonOk = () => {
      clearProfessional();
      endRegister();
      navigation.navigate('SignIn')
    }
  
    return (
      <SafeAreaView style={styleRegister.defaultContainer}>
        <HeaderRegisterProfessional navigation={navigation} endingRegister/>
        <View style={styleRegister.defaultContentContainer}>
          <Icon name={'emoticon-happy-outline'} size={50} color={blackDefault}></Icon>
          <Text style={styleRegister.title}>Tudo pronto!</Text>
          <Text style={styleRegister.text}>Sua conta foi criada com sucesso!</Text>
          <Text style={styleRegister.text}>Você será redirecionado para a tela de login...</Text>
  
          <TouchableOpacity style={style.buttonOk} onPress={() => handleButtonOk()}>
            <Text style={style.textButtonOk}>OK!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  else{
    const { endRegister } = useAuth();
    const { clearClient } = useRegisterClient();
    const handleButtonOk = () => {
      clearClient();
      endRegister();
      navigation.navigate('SignIn')
    }
  
    return (
      <SafeAreaView style={styleRegister.defaultContainer}>
        <HeaderRegisterClient navigation={navigation} endingRegister/>
        <View style={styleRegister.defaultContentContainer}>
          <Icon name={'emoticon-happy-outline'} size={50} color={blackDefault}></Icon>
          <Text style={styleRegister.title}>Tudo pronto!</Text>
          <Text style={styleRegister.text}>Sua conta foi criada com sucesso!</Text>
          <Text style={styleRegister.text}>Você será redirecionado para a tela de login...</Text>
  
          <TouchableOpacity style={style.buttonOKClient} onPress={() => handleButtonOk()}>
            <Text style={style.textButtonOk}>OK!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
 
}