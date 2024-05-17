import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CardProfession from '../CardProfession'
import style from './style'
import { useNavigation } from '@react-navigation/native'

export default function OtherProfessions(props: any) {

    const goToListProfession = (profession: string) => {
        props.navigation.navigate("ProfessionalList", { profession })
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => goToListProfession('Encanador')} professionIcon={'camera'} professionId={1} />
                <CardProfession profession={'Social Media'} onPress={() => goToListProfession('Encanador')} professionIcon={'instagram'} professionId={1} />
                <CardProfession profession={'Professor'} onPress={() => goToListProfession('Encanador')} professionIcon={'script-text-outline'} professionId={1} />
            </View>
            <View style={style.row}>
                <CardProfession profession={'Informática'} onPress={() => goToListProfession('Encanador')} professionIcon={'mouse'} professionId={1} />
                <CardProfession profession={'Pintor'} onPress={() => goToListProfession('Encanador')} professionIcon={'format-paint'} professionId={1} />
                <CardProfession profession={'Funileiro'} onPress={() => goToListProfession('Encanador')} professionIcon={'car-door'} professionId={1} />
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => goToListProfession('Encanador')} professionIcon={'camera'} professionId={1} />
                <CardProfession profession={'Social Media'} onPress={() => goToListProfession('Encanador')} professionIcon={'instagram'} professionId={1} />
                <CardProfession profession={'Professor'} onPress={() => goToListProfession('Encanador')} professionIcon={'script-text-outline'} professionId={1} />
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => goToListProfession('Encanador')} professionIcon={'camera'} professionId={1} />
                <CardProfession profession={'Social Media'} onPress={() => goToListProfession('Encanador')} professionIcon={'instagram'} professionId={1} />
                <CardProfession profession={'Professor'} onPress={() => goToListProfession('Encanador')} professionIcon={'script-text-outline'} professionId={1} />
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => goToListProfession('Encanador')} professionIcon={'camera'} professionId={1} />
                <CardProfession profession={'Social Media'} onPress={() => goToListProfession('Encanador')} professionIcon={'instagram'} professionId={1} />
                <CardProfession profession={'Professor'} onPress={() => goToListProfession('Encanador')} professionIcon={'script-text-outline'} professionId={1} />
            </View>
        </SafeAreaView>
    )
}