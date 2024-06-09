import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import CardProfession from '../CardProfession'
import style from './style'

export default function CardsMostAccessed(props: any) {
    const goToListProfession = (profession: string) =>  {
        props.navigation.navigate("ProfessionalList", {profession})
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Eletricista'} onPress={() => goToListProfession('Eletricista')} professionIcon={'lightning-bolt-outline'} professionId={1}/>
                <CardProfession profession={'Jardineiro'} onPress={() => goToListProfession('Jardineiro')} professionIcon={'flower'} professionId={1}/>
                <CardProfession profession={'Mecânico'} onPress={() => goToListProfession('Eletricista')} professionIcon={'tools'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Cozinheiro'} onPress={() => goToListProfession('Eletricista')} professionIcon={'food'} professionId={1}/>
                <CardProfession profession={'Motorista'} onPress={() => goToListProfession('Eletricista')} professionIcon={'car-hatchback'} professionId={1}/>
                <CardProfession profession={'Pedreiro'} onPress={() => goToListProfession('Eletricista')} professionIcon={'toy-brick-outline'} professionId={1}/>
            </View>
        </SafeAreaView>
    )
}