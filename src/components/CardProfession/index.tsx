import { View, Text, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackDefault, greyDefault, orangeDefault } from '../../shared/styleConsts'
import style from './style'
import { useNavigation } from '@react-navigation/native'

export type CardProfession = {
  profession: string,
  professionId: number,
  professionIcon: string,
  onPress: () => void
}

export default function CardProfession(props: CardProfession) {

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity 
        style={style.informationContainer}
        onPress={props.onPress}>
        <Icon color={blackDefault} name={props.professionIcon} size={35}></Icon>
        <Text style={style.professionName}>{props.profession}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}