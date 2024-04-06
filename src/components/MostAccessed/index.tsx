import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import style from './style'
import CardsMostAccessed from '../CardsMostAccessed'

export default function MostAccessed() {
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Most Accessed In Your Neighborhood</Text>
      <CardsMostAccessed></CardsMostAccessed>
    </SafeAreaView>
  )
}