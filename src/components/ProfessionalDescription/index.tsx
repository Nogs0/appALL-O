import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import style from './style'

export default function ProfessionalDescription({ description }: any) {
  return (
    <View style={style.container}>
      <Text style={style.name}>{`Sobre o profissional...`}</Text>
      <Text ellipsizeMode='tail' numberOfLines={10} style={style.description}>{`"${description}"`}</Text>
    </View>
  )
}