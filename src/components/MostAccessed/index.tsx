import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import style from './style'
import CardsMostAccessed from '../CardsMostAccessed'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

export default function MostAccessed() {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Most Accessed In Your Neighborhood</Text>
      <CardsMostAccessed navigation={navigation}></CardsMostAccessed>
    </SafeAreaView>
  )
}