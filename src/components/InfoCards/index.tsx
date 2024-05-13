import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style';

export default function InfoCards({ id }: any) {

    const [info, setInfo] = useState<any>();

    const getInfos = (id: number) => {
        setInfo({
            realized: 40,
            months: 5,
            fiveStars: 81
        })
    }

    const getCard = (data: any, description: string) => {
        return (
            <View style={style.card}>
                <Text style={style.data}>{data}</Text>
                <Text style={style.description}>{description}</Text>
            </View>
        )
    }

    useEffect(() => {
        getInfos(id);
    }, [id])

    return (
        <>
            {info ? (
                <SafeAreaView style={style.container}>
                    {getCard(info.realized, "Serviços feitos")}
                    {getCard(`${info.fiveStars}%`, "5 estrelas")}
                    {getCard(info.months, "Meses de ALL-O")}
                </SafeAreaView>
            ) : (<></>)}
        </>
    )
}