import { View, Text, Image } from 'react-native'
import React from 'react'
import style from './style'
import { orangeDefault } from '../../shared/styleConsts'

interface ImageDialogProps {
    uri: any
}

export default function ImageDialog(props: ImageDialogProps) {
    return (
        <View style={style.container}>
            <View style={style.contentContainer}>
                <View style={style.headerContainer}>
                    <Text style={{ color: orangeDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>Imagem</Text>
                </View>
                <Image style={{}} source={{ uri: props.uri }}></Image>
            </View>
        </View>
    )
}