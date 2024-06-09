import React, { useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional';
import { useRegister } from '../../../../contexts/register';
import { blackDefault, blueDefault, greyDefault, redDefault, whiteDefault } from '../../../../shared/styleConsts';
import styleRegister from '../../style';
import style from './style';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';

export default function Register_Images({ navigation }: any) {

  const { endingRegister, loading } = useRegister();
  const [images, setImages] = useState<any[]>([]);
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const handleButtonEnd = async () => {
    console.log(images)
    if (canGoToTheNextPage()) {
      let response = await endingRegister();
      console.log(response);
      navigation.navigate('Register_OkEndRegister');
    }
    else setIncorrectInformations(true)
  }

  const canGoToTheNextPage = (): boolean => {
    return (
      images.length > 0
    )
  }

  const addImage = () => {
    console.log(images)
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0)
        setImages((prev) => {
          if (response.assets)
            prev.push(response.assets[0]);
          return [...prev];
        })
    })
  }

  const renderImage = (item: any) => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 4 }}
        onLongPress={() => {
          setImages((prev) => {
            let indexToDelete = prev.findIndex(x => x.fileName == item.fileName)
            if (indexToDelete != -1)
              prev.splice(indexToDelete, 1)
            return [...prev];
          })
        }}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: item.uri }}></Image>
      </TouchableOpacity>
    )
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
          <View style={style.listContainer}>
            {
              images.length == 0 ?
                <Text style={{color: greyDefault, fontFamily: 'Rubik-Light'}}>As imagens selecionadas serão mostradas aqui!</Text> 
                :
                <FlatList
                  overScrollMode='never'
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  data={images}
                  renderItem={({ item }) => renderImage(item)}
                />
            }
          </View>
          {
            images.length > 0 
            ? 
            <Text style={{ textAlign: 'left', color: greyDefault, fontFamily: 'Rubik-Light'}}>Para remover uma foto basta pressionar por 2 segundos...</Text> :
            <></>
          }
          {
            incorrectInformations ?
              <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, adicione pelo menos uma imagem!</Text>
              : <></>
          }
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonEnd()}>
            <Text style={styleRegister.textButtonNext}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}