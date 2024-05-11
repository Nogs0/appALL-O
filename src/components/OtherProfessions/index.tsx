import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CardProfession from '../CardProfession'
import style from './style'

export default function OtherProfessions() {
  return (
    <SafeAreaView style={style.container}>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => console.log('pressionou')} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} onPress={() => console.log('pressionou')} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} onPress={() => console.log('pressionou')} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Informática'} onPress={() => console.log('pressionou')} professionIcon={'mouse'} professionId={1}/>
                <CardProfession profession={'Pintor'} onPress={() => console.log('pressionou')} professionIcon={'format-paint'} professionId={1}/>
                <CardProfession profession={'Funileiro'} onPress={() => console.log('pressionou')} professionIcon={'car-door'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => console.log('pressionou')} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} onPress={() => console.log('pressionou')} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} onPress={() => console.log('pressionou')} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => console.log('pressionou')} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} onPress={() => console.log('pressionou')} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} onPress={() => console.log('pressionou')} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
            <View style={style.row}>
                <CardProfession profession={'Fotográfo'} onPress={() => console.log('pressionou')} professionIcon={'camera'} professionId={1}/>
                <CardProfession profession={'Social Media'} onPress={() => console.log('pressionou')} professionIcon={'instagram'} professionId={1}/>
                <CardProfession profession={'Professor'} onPress={() => console.log('pressionou')} professionIcon={'script-text-outline'} professionId={1}/>
            </View>
        </SafeAreaView>
  )
}