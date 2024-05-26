import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderRegisterProfessional from '../components/HeaderRegisterProfessional'
import style from './style'
import Register_InitialInformations from './screens/Register_InitialInformations'

export default function RegisterProfessional({ navigation }: any) {
  return (
    <SafeAreaView style={style.container}>
      <HeaderRegisterProfessional navigation={navigation} initialScreen />
      <View style={style.contentContainer}>
        <Register_InitialInformations navigation={navigation}/>
      </View>
    </SafeAreaView>
  )
}