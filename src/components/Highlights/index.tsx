import React from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from './style'

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

const renderItem = (image: any, name: string) => {
  return (
    <TouchableOpacity style={style.containerImage}>
      <Image style={style.imageProfessional}
        source={image}></Image>
      <Text style={style.nameProfessional}>{name}</Text>
    </TouchableOpacity>
  )
}

export default function Highlights() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Outstanding Professional</Text>
      <FlatList
        horizontal={true}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item.image, item.name)}
      />
    </SafeAreaView>
  )
}