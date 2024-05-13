import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import CardProfession from '../CardProfession'
import style from './style'

export default function CardsMostAccessed(props: any) {

    const goToListProfession = (professionId: number, professionName: string) =>  {
        props.navigation.navigate("ProfessionalList", {professionId, professionName})
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Eletricista'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'lightning-bolt-outline'} professionId={1}/>
                <CardProfession profession={'Jardineiro'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'flower'} professionId={1}/>
                <CardProfession profession={'Mecânico'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'tools'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Cozinheiro'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'food'} professionId={1}/>
                <CardProfession profession={'Motorista'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'car-hatchback'} professionId={1}/>
                <CardProfession profession={'Pedreiro'} onPress={() => goToListProfession(1, 'Eletricista')} selected={false} professionIcon={'toy-brick-outline'} professionId={1}/>
            </View>
        </SafeAreaView>
    )
}