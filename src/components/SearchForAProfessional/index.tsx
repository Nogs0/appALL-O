import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/AntDesign'
import { whiteDefault } from '../../shared/styleConsts'

export default function SearchForAProfessional() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Busque por um profissional</Text>
      <View style={style.containerSearch}>
        <TextInput
            style={style.search}
            placeholder='Pesquisar'
        />
        <Icon style={style.iconSearch} size={20} name='search1'></Icon>
    </View>
    </SafeAreaView>
  )
}