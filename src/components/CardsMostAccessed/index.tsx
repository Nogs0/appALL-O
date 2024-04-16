import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CardProfession from '../CardProfession'
import style from './style'

export default function CardsMostAccessed() {
    return (
        <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Eletricista'} selected={true} professionIcon={'lightning-bolt-outline'} professionId={1}/>
                <CardProfession profession={'Jardineiro'} selected={false} professionIcon={'flower'} professionId={1}/>
                <CardProfession profession={'Mecânico'} selected={false} professionIcon={'tools'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Cozinheiro'} selected={false} professionIcon={'food'} professionId={1}/>
                <CardProfession profession={'Motorista'} selected={false} professionIcon={'car-hatchback'} professionId={1}/>
                <CardProfession profession={'Pedreiro'} selected={false} professionIcon={'toy-brick-outline'} professionId={1}/>
            </View>
        </SafeAreaView>
    )
}