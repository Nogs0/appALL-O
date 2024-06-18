import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blueDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'
import style from './style'
import { PerfilProvedorOutput } from '../../contexts/api'

interface HeaderProfessionalProps {
    title?: string,
    navigation?: any,
    isProfessional?: boolean,
    isNotifications?: boolean,
    signOut?: any,
    defaultColor: string,
    professionalId?: number
}

export default function HeaderProfessional(props: HeaderProfessionalProps) {

    const handleEditProfessional = () => {
        props.navigation.navigate('ProfessionalEdit', { professionalId: props.professionalId })
    }

    return (
        <SafeAreaView style={[style.container, { backgroundColor: props.defaultColor }]}>
            {props.isProfessional ?
                <TouchableOpacity style={style.goBack} onPress={() => props.signOut()}>
                    <Icon size={35} name={'arrow-collapse-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
                :
                <TouchableOpacity style={style.goBack} onPress={() => props.navigation?.goBack()}>
                    <Icon size={35} name={'chevron-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
            }
            <Text style={style.label}>{props.title}</Text>
            {props.isProfessional && !props.isNotifications ?
                <TouchableOpacity style={style.goEdit} onPress={() => handleEditProfessional()}>
                    <Icon size={35} name={'account-edit'} color={whiteDefault}></Icon>
                </TouchableOpacity>
                : <></>
            }
        </SafeAreaView>
    )
}