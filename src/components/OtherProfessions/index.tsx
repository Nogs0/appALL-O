import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CardProfession from '../CardProfession'
import style from './style'

export default function OtherProfessions() {
  return (
    <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} selected={true} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} selected={false} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} selected={false} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} selected={true} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} selected={false} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} selected={false} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} selected={true} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} selected={false} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} selected={false} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} selected={true} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} selected={false} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} selected={false} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} selected={true} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} selected={false} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} selected={false} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
        </SafeAreaView>
  )
}