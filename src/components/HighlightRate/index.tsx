import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { whiteDefault } from '../../shared/styleConsts';
import { AvaliacaoOutput } from '../../contexts/api';

interface HighlightRateProps {
    avaliacao: AvaliacaoOutput,
    defaultColor: string
}

export default function HighlightRate(props: HighlightRateProps) {

    return (
        <SafeAreaView style={style.container}>
            {props.avaliacao ?
                <View style={style.rateContent}>
                    <View style={[style.infoContainer, { backgroundColor: props.defaultColor }]}>
                        <View style={style.avaliacao}>
                            <Text style={style.name}>{props.avaliacao.cliente.nome}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={4} style={style.rateNote}>{`"${props.avaliacao.descricao}"`}</Text>
                        </View>
                        <View style={style.rateStars}>
                            <Icon name={'star'} color={whiteDefault} size={13}>{`${props.avaliacao.nota.toFixed(1)}`}</Icon>
                        </View>
                    </View>
                    <View style={style.imageContainer}>
                        <Image style={style.image} source={require('../../assets/images/foto-de-perfil-homem.png')}></Image>
                    </View>
                </View>
                :
                <></>
            }

        </SafeAreaView>
    )
}