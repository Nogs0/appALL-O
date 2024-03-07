import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function StarsRating(stars: any) {
  const [estrelas, setEstrelas] = useState<number>(3);

  const getStars = () => {
    
    // for(let i = 0; i < starsAux; i++)
    if (estrelas > 1){
      setEstrelas(estrelas - 1);
      return 'star';
    }
    else if (estrelas > 0) return 'star-half-full';
    
    return 'star-outline'
  };

  const a1 = getStars();
  return (
    <View style={styles.container}>
      <Icon name={a1} size={50} color={'yellow'}></Icon>
      <Icon name={getStars()} size={50} color={'yellow'}></Icon>
      <Icon name={getStars()} size={50} color={'yellow'}></Icon>
      <Icon name={getStars()} size={50} color={'yellow'}></Icon>
      <Icon name={getStars()} size={50} color={'yellow'}></Icon>
    </View>
  )
}