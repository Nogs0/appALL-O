import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import { useAPI } from '../../../../../contexts/api';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { blackDefault, blueDefault, whiteDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';

export default function RegisterProfessional_AddProfilePic({ navigation }: any) {

  const { createImageProfessional } = useAPI();
  const { endingRegister, loading, setProfilePic } = useRegisterProfessional();
  const [imageTela, setImageTela] = useState<Asset>();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const handleButtonEnd = () => {
    if (imageTela?.uri && imageTela?.fileName) {
      createImageProfessional(imageTela.uri, imageTela.fileName)
        .then((result) => {
          setProfilePic(result);  
          navigation.navigate('RegisterProfessional_Images');
        }).catch((e) => {
          showMessage({
            message: 'Falha no upload da imagem',
            type: 'danger'
          })
        })
    } 
  }

  const changeImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      setLoadingImage(true)
      if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setImageTela(response.assets[0]);
      }
      setLoadingImage(false)
    })
  }

  return (
    loading ?
      <View style={{ flex: 1, backgroundColor: blueDefault, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={70} color={whiteDefault} />
      </View>
      :

      <SafeAreaView style={styleRegister.defaultContainer}>
        <HeaderRegisterProfessional navigation={navigation} />
        <View style={styleRegister.defaultContentContainer}>
          <Icon name={'image-plus'} size={50} color={blackDefault}></Icon>
          <Text style={styleRegister.title}>Adicione uma foto de perfil!</Text>
          <Text style={styleRegister.subTitle}>
            <Text style={{ fontFamily: 'Rubik-SemiBold' }}>(opcional)</Text>
          </Text>
          <TouchableOpacity style={style.imageContainer} onPress={() => changeImage()}>
            {imageTela?.uri ?
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {loadingImage ?
                  <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                  :
                  <></>
                }
                <Image style={style.image} source={{ uri: imageTela.uri }}></Image>
              </View>
              :
              <View style={style.noImage}>
                <Icon name={'camera'} size={50} color={blackDefault}></Icon>
                <Text style={{ color: blackDefault, fontFamily: 'Rubik-SemiBold', textAlign: 'center' }}>Adicionar foto de perfil</Text>
                {loadingImage ?
                  <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                  :
                  <></>
                }
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonEnd()}>
            <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}