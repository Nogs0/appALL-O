import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, SafeAreaView, Text } from 'react-native'
import CardsMostAccessed from '../CardsMostAccessed'
import style from './style'

export default function MostAccessed() {

  const navigation = useNavigation();
  const win = Dimensions.get('window');

  return (
    <SafeAreaView style={{
      marginHorizontal: 25
    }}>
      <Text style={style.label}>Mais utilizados</Text>
      <CardsMostAccessed navigation={navigation} ></CardsMostAccessed>
    </SafeAreaView>
  )
}