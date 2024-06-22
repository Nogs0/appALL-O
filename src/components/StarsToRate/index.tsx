import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';

interface StarsToRateProps {
    estrelas: number, 
    setEstrelas(value: number): void
}

export default function StarsToRate({estrelas, setEstrelas}: StarsToRateProps) {

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => setEstrelas(1)}>
                <Icon name={estrelas >= 1 ? 'star' : 'star-outline'} size={50} color={'yellow'}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstrelas(2)}>
                <Icon name={estrelas >= 2 ? 'star' : 'star-outline'} size={50} color={'yellow'}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstrelas(3)}>
                <Icon name={estrelas >= 3 ? 'star' : 'star-outline'} size={50} color={'yellow'}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstrelas(4)}>
                <Icon name={estrelas >= 4 ? 'star' : 'star-outline'} size={50} color={'yellow'}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEstrelas(5)}>
                <Icon name={estrelas >= 5 ? 'star' : 'star-outline'} size={50} color={'yellow'}></Icon>
            </TouchableOpacity>
        </View>
    )
}