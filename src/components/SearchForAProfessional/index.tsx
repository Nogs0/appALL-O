import React from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { blackDefault } from '../../shared/styleConsts'
import style from './style'

interface SearchForAProfessionProps {
  search: string,
  onChangeSearch(value: string): void,
}

export default function SearchForAProfession(props: SearchForAProfessionProps) {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Busque por uma profissão</Text>
      <View style={style.containerSearch}>
        <TextInput
          value={props.search}
          onChangeText={props.onChangeSearch}
          style={style.search}
          placeholder='Pesquisar'
          placeholderTextColor={blackDefault}
        />
        <Icon style={style.iconSearch} size={20} name='search1'></Icon>
      </View>
    </SafeAreaView>
  )
}