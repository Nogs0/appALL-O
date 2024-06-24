import React from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from './style'
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    id: 1,
    image: require('../../assets/images/jardineiro.jpg'),
    name: 'Marcio Grass',
    profissao: 'Soldador'
  },
  {
    id: 1,
    image: require('../../assets/images/eletricista.jpg'),
    name: 'Marcio Fios',
    profissao: 'Soldador'

  },
  {
    id: 1,
    image: require('../../assets/images/encanador.jpg'),
    name: 'Marcio Canos',
    profissao: 'Soldador'
  },
  {
    id: 1,
    image: require('../../assets/images/mecanico.jpg'),
    name: 'Marcio Rodas',
    profissao: 'Soldador'
  }
]

export default function Highlights({ navigation }: any) {

  const renderItem = (item: any, navigation: any) => {
    return (
      <TouchableOpacity style={style.containerImage} onPress={() => {
        navigation.navigate('ProfessionalProfile', { id: item.id, profissao: item.profissao })
      }}>
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
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item, navigation)}
      />
    </SafeAreaView>
  )
}