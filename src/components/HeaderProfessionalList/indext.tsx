import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import style from './style'
import { orangeDefault1 } from '../../shared/styleConsts'
import FilterProfessions from '../FilterProfessions'

export default function HeaderProfessionalList({ profession, navigation }: any) {
    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={style.goBack} onPress={() => navigation.goBack()}>
                <Icon size={35} name={'chevron-left'} color={orangeDefault1}></Icon>
            </TouchableOpacity>
            <Text style={style.label}>{profession}</Text>
        </SafeAreaView>
    )
}