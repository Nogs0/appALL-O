import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Stars from '../Stars';

export default function StarsRating({ rate, numberRate, navigation, id }: any) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProfessionalReviews', { id })}>
      <Stars rate={rate} />
      <Text style={styles.label}>{`${numberRate} ratings`}</Text>
    </TouchableOpacity>
  )
}