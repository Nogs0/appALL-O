import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import style from './style'

export default function ProfessionalDescription({ description, defaultColor }: any) {
  return (
    <View style={style.container}>
      <Text style={[style.name, {color: defaultColor}]}>{`Sobre o profissional...`}</Text>
      <Text ellipsizeMode='tail' numberOfLines={6} style={style.description}>{`"${description}"`}</Text>
    </View>
  )
}