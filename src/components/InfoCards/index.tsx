import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style';

export default function InfoCards({ servicosConcluidos, mediaAvaliacao, tempoCadastro, defaultColor }: any) {

    const getCard = (data: any, description: string) => {
        return (
            <View style={style.card}>
                <Text style={[style.data, { color: defaultColor }]}>{data}</Text>
                <Text style={style.description}>{description}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={style.container}>
            {getCard(servicosConcluidos, "Serviços feitos")}
            {getCard(mediaAvaliacao, "Média de avaliações")}
            {getCard(tempoCadastro, "Tempo de app")}
        </SafeAreaView>
    )
}