import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import { useRegister } from '../../../../contexts/register';
import { blackDefault, blueDefault, whiteDefault } from '../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';

export default function Register_Images({ navigation }: any) {

  const { endingRegister, loading } = useRegister();

  const handleButtonEnd = async () => {
    let response = await endingRegister();
    console.log(response);
    navigation.navigate('Register_OkEndRegister');
  }

  const addImage = () => {
    console.log("adicionando imagem");
  }

  return (
    loading ?
      <View style={{flex: 1, backgroundColor: blueDefault, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={70} color={whiteDefault} />
      </View>

      :

      <SafeAreaView style={styleRegister.defaultContainer}>
        <HeaderRegisterProfessional navigation={navigation} />
        <View style={styleRegister.defaultContentContainer}>
          <Icon name={'image-plus'} size={50} color={blackDefault}></Icon>
          <Text style={styleRegister.title}>Adicione imagens!</Text>

          <Text style={styleRegister.text}>
            <Text style={{ fontFamily: 'Rubik-SemiBold' }}>Recomendamos </Text>
            que adicione imagens que demonstrem seu serviço, um
            <Text style={{ fontStyle: 'italic' }}>'antes e depois'</Text>
            , a fachada do seu estabelecimento ou até uma foto do veículo que você utiliza para ir aos locais!
          </Text>

          <TouchableOpacity style={style.buttonAddImage} onPress={() => addImage()}>
            <Text style={style.textButtonAddImage}>Adicionar Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonEnd()}>
            <Text style={styleRegister.textButtonNext}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}