import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function TabBar({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Icon name='home' size={30}/>
            <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
            <Icon name='map' size={30}/>
            <Text>Map</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}