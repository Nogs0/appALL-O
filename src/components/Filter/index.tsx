import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FilterProps = {
    navigation: () => any,
    profession: string
}
export default function Filter(props: FilterProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.arrowBack} onPress={props.navigation}>
                <Icon name='arrow-left-thick' size={30}></Icon>
            </TouchableOpacity>
            <Text style={styles.profession}>{props.profession}</Text>
            <TouchableOpacity style={styles.filter} onPress={props.navigation}>
                <Icon name='filter' size={30}></Icon>
            </TouchableOpacity>
        </View>
    )
}