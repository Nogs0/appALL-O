import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function TabBar(props: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
            <Icon name='home' size={40}/>
            <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Icon name='home' size={40}/>
            <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}