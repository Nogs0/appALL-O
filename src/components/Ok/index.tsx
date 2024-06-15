import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackDefault } from '../../shared/styleConsts'

interface OkProps {
    title: string,
    text: string,
    callbackOk(): void
}

export default function Ok(props: OkProps) {
    return (
        <View style={style.defaultContentContainer}>
            <Icon name={'emoticon-happy-outline'} size={50} color={blackDefault}></Icon>
            <Text style={style.title}>Tudo pronto!</Text>
            <Text style={style.text}>{props.title}</Text>
            <Text style={style.text}>{props.text}</Text>

            <TouchableOpacity style={style.buttonOk} onPress={props.callbackOk}>
                <Text style={style.textButtonOk}>OK!</Text>
            </TouchableOpacity>
        </View>
    )
}