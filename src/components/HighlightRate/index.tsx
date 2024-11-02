import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { whiteDefault } from '../../shared/styleConsts';
import style from './style';
import { AvaliacaoOutput, ServicoOutput } from '../../contexts/api';

interface HighlightRateProps {
    avaliacao: AvaliacaoOutput,
    defaultColor: string
}

export default function HighlightRate(props: HighlightRateProps) {

    return (
        <SafeAreaView style={style.container}>
            {props.avaliacao ?
                <View style={[style.infoContainer, { backgroundColor: props.defaultColor }]}>
                    <View style={style.avaliacao}>
                        <Text style={style.name}>Avaliação em destaque</Text>
                        <Text ellipsizeMode='tail' numberOfLines={4} style={style.rateNote}>{`"${props.avaliacao.descricao}"`}</Text>
                    </View>
                    <View style={style.rateStars}>
                        <Icon name={'star'} color={whiteDefault} size={13}>{`${((props.avaliacao.qualidade + props.avaliacao.agilidade + props.avaliacao.preco)/3).toFixed(1)}`}</Icon>
                    </View>
                </View>
                :
                <View style={[style.infoContainer, { backgroundColor: props.defaultColor }]}>
                    <View style={style.avaliacao}>
                        <Text style={style.name}>Avaliação em destaque</Text>
                        <Text ellipsizeMode='tail' numberOfLines={4} style={style.rateNote}>{`"Este profissional ainda não destacou uma avaliação..."`}</Text>
                    </View>
                    <View style={style.rateStars}>
                        <Icon name={'star'} color={whiteDefault} size={13}>{`-.-`}</Icon>
                    </View>
                </View>
            }

        </SafeAreaView>
    )
}