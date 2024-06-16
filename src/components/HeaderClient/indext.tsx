import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { orangeDefault, whiteDefault } from '../../shared/styleConsts'
import style from './style'

export default function HeaderClient({ title, navigation, hasButton }: any) {
    if (hasButton != false){
        return (
            <SafeAreaView style={style.container}>
                <TouchableOpacity style={style.goBack} onPress={() => navigation.goBack()}>
                    <Icon size={35} name={'chevron-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
                <Text style={style.label}>{title}</Text>
            </SafeAreaView>
        )
    }else
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.label}>{title}</Text>
        </SafeAreaView>
    )
  
}