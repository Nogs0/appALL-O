import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

export default function Highlights() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Outstanding Professional</Text>
      <TouchableOpacity style={style.containerImage}>
        <Image style={style.imageProfessional} 
               source={require(`../../assets/images/jardineiro.jpg`)}></Image>
        <Text style={style.nameProfessional}>{`Marcio Grass`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}