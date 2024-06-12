import React from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from './style'
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    image: require('../../assets/images/jardineiro.jpg'),
    name: 'Marcio Grass'
  },
  {
    image: require('../../assets/images/eletricista.jpg'),
    name: 'Marcio Fios'
  },
  {
    image: require('../../assets/images/encanador.jpg'),
    name: 'Marcio Canos'
  },
  {
    image: require('../../assets/images/mecanico.jpg'),
    name: 'Marcio Rodas'
  }
]

export default function Highlights() {

  const navigation = useNavigation();

  const renderItem = (item: any, navigation: any) => {
    return (
      <TouchableOpacity style={style.containerImage} onPress={() => navigation.navigate('ProfessionalProfile', { id: 1, navigation })}>
        <Image style={style.imageProfessional}
          source={item.image}></Image>
        <Text style={style.nameProfessional}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Profissionais em destaque</Text>
      <FlatList
        horizontal={true}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item, navigation)}
      />
    </SafeAreaView>
  )
}