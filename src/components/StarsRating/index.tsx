import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function StarsRating(stars: number) {
  return (
    <View style={styles.container}>
      <Icon name={'star'} size={50} color={'yellow'}></Icon>
      <Icon name={'star'} size={50} color={'yellow'}></Icon>
      <Icon name={'star'} size={50} color={'yellow'}></Icon>
      <Icon name={'star-half-full'} size={50} color={'yellow'}></Icon>
      <Icon name={'star-outline'} size={50} color={'yellow'}></Icon>
    </View>
  )
}

// const getStars = (stars: number) => {
  
//   for(let i = 0; i < Math.floor(stars); i++)

// }