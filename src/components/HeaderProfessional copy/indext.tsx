import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { orangeDefault, whiteDefault } from '../../shared/styleConsts'
import style from './style'

export default function HeaderClient({ title, navigation }: any) {
    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={style.goBack} onPress={() => navigation.goBack()}>
                <Icon size={35} name={'chevron-left'} color={whiteDefault}></Icon>
            </TouchableOpacity>
            <Text style={style.label}>{title}</Text>
        </SafeAreaView>
    )
}