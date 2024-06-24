import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import { blackDefault, blueDefault, orangeDefault, redDefault, whiteDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';
import { showMessage } from 'react-native-flash-message';
import { ALLORequestForm } from '../../../../../services/api';
import { useAPI } from '../../../../../contexts/api';

export default function RegisterCliente_AddProfilePic({ navigation }: any) {

  const { createImageClient } = useAPI();
  const { endingRegister, loading, setProfilePic } = useRegisterClient();
  const [imageTela, setImageTela] = useState<Asset>();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const handleButtonEnd = () => {
    if (imageTela?.uri && imageTela?.fileName) {
      createImageClient(imageTela.uri, imageTela.fileName)
        .then((result) => {
          setProfilePic(result)
          endingRegister().then(() => {
            navigation.navigate('RegisterClient_OkEndRegister');
          })
            .catch(() => {
              showMessage({
                message: 'Falha ao cadastrar cliente!',
                type: 'danger'
              })
            })
        }).catch((e) => {
          showMessage({
            message: 'Falha no upload da imagem',
            type: 'danger'
          })
        })
    } else {
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
            <Text style={{ fontFamily: 'Rubik-SemiBold' }}>(opcional)</Text>
          </Text>
          <TouchableOpacity style={style.imageContainer} onPress={() => changeImage()}>
            {imageTela?.uri ?
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {loadingImage ?
                  <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                  :
                  <></>
                }
                <Image style={style.image} source={{ uri: imageTela.uri }}></Image>
              </View>
              :
              <View style={style.noImage}>
                <Icon name={'camera'} size={50} color={blackDefault}></Icon>
                <Text style={{ color: blackDefault, fontFamily: 'Rubik-SemiBold' }}>Adicionar foto de perfil</Text>
                {loadingImage ?
                  <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                  :
                  <></>
                }
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonEnd()}>
            <Text style={styleRegister.textButtonNext}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}