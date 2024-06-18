import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { whiteDefault } from '../../shared/styleConsts';

export default function HighlightRate({ avaliacao, defaultColor }: any) {

    return (
        <SafeAreaView style={style.container}>
            {avaliacao ?
                <View style={style.rateContent}>
                    <View style={[style.infoContainer, { backgroundColor: defaultColor }]}>
                        <View style={style.avaliacao}>
                            <Text style={style.name}>{avaliacao.client}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={4} style={style.rateNote}>{`"${avaliacao.rateNote}"`}</Text>
                        </View>
                        <View style={style.rateStars}>
                            <Icon name={'star'} color={whiteDefault} size={13}>{`${avaliacao.rateGrade?.toFixed(1)}`}</Icon>
                        </View>
                    </View>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={avaliacao.image}></Image>
                    </View>
                </View>
                :
                <></>
            }

        </SafeAreaView>
    )
}