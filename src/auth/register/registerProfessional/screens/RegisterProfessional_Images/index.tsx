import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styleRegister from '../../style';
import style from './style';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { blueDefault, whiteDefault, blackDefault, greyDefault, redDefault } from '../../../../../shared/styleConsts';
import { showMessage } from 'react-native-flash-message';
import { useAPI } from '../../../../../contexts/api';

export default function RegisterProfessional_Images({ navigation }: any) {

  const { updateImageProfessionalServico } = useAPI();
  const { endingRegister, loading, setImages, profissional } = useRegisterProfessional();
  const [imagesTela, setImagesTela] = useState<any[]>([]);
  const [imagesIds, setImagesIds] = useState<string[]>(profissional ? profissional.provedor.servicoImagens : []);
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  useEffect(() => {
    setImages(imagesIds)
  }, [imagesIds])

  const handleButtonEnd = async () => {
    if (canGoToTheNextPage()) {
      endingRegister().then(() => {
        navigation.navigate('RegisterProfessional_OkEndRegister');
      }).catch(() => {
        showMessage({
          message: 'Falha ao criar profissional!',
          type: 'danger'
        })
      });
    }
    else setIncorrectInformations(true)
  }

  const canGoToTheNextPage = (): boolean => {
    return (
      imagesTela.length > 0
    )
  }

  const addImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0 && response.assets[0].uri && response.assets[0].fileName) {
        updateImageProfessionalServico(response.assets[0].uri, response.assets[0].fileName)
          .then((newImage) => {
            setImagesIds((prev) => [...prev, ...[newImage]])
            setImagesTela((prev) => {
              if (response.assets)
                prev.push({ uri: response.assets[0].uri, fileName: response.assets[0].fileName });
              return [...prev];
            })
          })
          .catch((e) => {
            showMessage({
              message: 'Falha no upload da imagem',
              type: 'danger'
            })
          })
      }
    })
  }

  const renderImage = (item: any) => {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 4 }}
        onLongPress={() => {
          setImagesTela((prev) => {
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
          <Icon name={'image-plus'} size={30} color={blackDefault}></Icon>
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
              imagesTela.length == 0 ?
                <Text style={{ color: greyDefault, fontFamily: 'Rubik-Light' }}>As imagens selecionadas serão mostradas aqui!</Text>
                :
                <FlatList
                  overScrollMode='never'
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  data={imagesTela}
                  renderItem={({ item }) => renderImage(item)}
                />
            }
          </View>
          {
            imagesTela.length > 0
              ?
              <Text style={{ textAlign: 'left', color: greyDefault, fontFamily: 'Rubik-Light' }}>Para remover uma foto basta pressioná-la por 2 segundos...</Text> :
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