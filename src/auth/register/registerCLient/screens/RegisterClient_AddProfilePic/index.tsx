import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import { blackDefault, orangeDefault, redDefault, whiteDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';
import { showMessage } from 'react-native-flash-message';

export default function RegisterProfessional_Images({ navigation }: any) {

  const { endingRegister, loading, client } = useRegisterClient();
  const [image, setImage] = useState<string>('../../../../../assets/images/default-profile-pic.png');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonEnd = async () => {
    console.log(image)

    endingRegister().then(() => {
      navigation.navigate('RegisterClient_OkEndRegister');
    })
      .catch(() => {
        showMessage({
          message: 'Falha ao cadastrar cliente!',
          type: 'danger'
        })
      })
  }

  const addImage = () => {

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    })
  }

  return (
    loading ?
      <View style={{ flex: 1, backgroundColor: orangeDefault, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={70} color={whiteDefault} />
      </View>
      :

      <SafeAreaView style={styleRegister.defaultContainer}>
        <HeaderRegisterClient navigation={navigation} />
        <View style={styleRegister.defaultContentContainer}>
          <Icon name={'image-plus'} size={50} color={blackDefault}></Icon>
          <Text style={styleRegister.title}>Adicione uma foto de perfil!</Text>
          <Text style={styleRegister.subTitle}>
            <Text style={{ fontFamily: 'Rubik-SemiBold' }}>(se quiser)</Text>
          </Text>
          <TouchableOpacity style={style.buttonAddImage} onPress={() => addImage()}>
            <Text style={style.textButtonAddImage}>Adicionar Imagem</Text>
          </TouchableOpacity>
          <Image source={{uri: image}} style={style.profilePicture}></Image>
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonEnd()}>
            <Text style={styleRegister.textButtonNext}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}