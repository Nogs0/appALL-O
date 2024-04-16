import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/AntDesign'
import { whiteDefault } from '../../shared/styleConsts'

export default function SearchForAProfessional() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Search For A Professional</Text>
      <View style={style.containerSearch}>
        <TextInput
            style={style.search}
            placeholder='Search'
        />
        <Icon style={style.iconSearch} size={20} name='search1'></Icon>
    </View>
    </SafeAreaView>
  )
}