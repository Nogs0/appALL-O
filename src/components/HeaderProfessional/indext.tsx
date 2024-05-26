import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blueDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'
import style from './style'

export default function HeaderProfessional({ title, navigation, isProfessional, signOut, defaultColor }: any) {
    return (
        <SafeAreaView style={[style.container, { backgroundColor: defaultColor}]}>
            {isProfessional ?
                <TouchableOpacity style={style.goBack} onPress={() => signOut()}>
                    <Icon size={35} name={'arrow-collapse-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
                :
                <TouchableOpacity style={style.goBack} onPress={() => navigation?.goBack()}>
                    <Icon size={35} name={'chevron-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
            }
            <Text style={style.label}>{title}</Text>
        </SafeAreaView>
    )
}