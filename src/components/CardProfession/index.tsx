import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackDefault, greyDefault, orangeDefault1 } from '../../shared/styleConsts'
import style from './style'

export type CardProfession = {
  selected: boolean,
  profession: string,
  professionId: number,
  professionIcon: string
}

export default function CardProfession(props: CardProfession) {

  return (
    <SafeAreaView style={style.container}>
      <View style={[style.informationContainer, {backgroundColor: props.selected ? orangeDefault1 : greyDefault}]}>
        <Icon color={blackDefault} name={props.professionIcon} size={35}></Icon>
        <Text style={style.professionName}>{props.profession}</Text>
      </View>
    </SafeAreaView>
  )
}