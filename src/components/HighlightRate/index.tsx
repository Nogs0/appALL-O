import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { whiteDefault } from '../../shared/styleConsts';

export default function HighlightRate({ id }: any) {

    const [rate, setRate] = useState<any>();

    useEffect(() => {
        setRate({
            client: 'Fernando Clientela',
            rateGrade: 5,
            rateNote: 'Esse cara foi fera, profissional muito bom!',
            image: require('../../assets/images/foto-de-perfil-homem.png')
        });
    }, [id])

    return (
        <SafeAreaView style={style.container}>
            {rate ? (
                <View style={style.rateContent}>
                    <View style={style.infoContainer}>
                        <View style={style.rate}>
                            <Text style={style.name}>{rate.client}</Text>
                            <Text style={style.rateNote}>{`"${rate.rateNote}"`}</Text>
                        </View>
                        <View style={style.rateStars}>
                            <Icon name={'star'} color={whiteDefault} size={13}>{`${rate.rateGrade.toFixed(1)}`}</Icon>
                        </View>
                    </View>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={rate.image}></Image>
                    </View>
                </View>
            ) : (
                <></>
            )}
        </SafeAreaView>
    )
}