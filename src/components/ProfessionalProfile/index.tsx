import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import HeaderProfessional from '../HeaderProfessional/indext'
import StarsRating from '../StarsRating';
import ProfessionalDescription from '../ProfessionalDescription';
import { orangeDefault1, whiteDefault } from '../../shared/styleConsts';
import HighlightRate from '../HighlightRate';
import InfoCards from '../InfoCards';

export default function ProfessionalProfile(props: any) {
    const [params, setParams] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<any>();
    const [backgroundColor, setBackgroundColor] = useState<string>(whiteDefault);

    const getProfessional = (id: number) => {
        setProfessional({
            id: 1,
            profession: 'Eletricista',
            name: 'Marcio DME',
            rate: 4.7,
            obs: 'Melhor avaliado',
            priceAvg: 70,
            favorite: true,
            timeDistance: 30,
            numberRate: 30,
            description: 'Meu trabalho é garantir que a corrente flua de forma segura e eficiente. Desde a instalação até a manutenção, estou sempre atento aos detalhes para evitar falhas elétricas. Cuido para que cada conexão seja firme e cada circuito seja adequadamente protegido. Minha meta é fornecer energia confiável para que todos possam contar com eletricidade sempre que necessário.'
        })
        setBackgroundColor(orangeDefault1);
    }

    useEffect(() => {
        getProfessional(params.id);
    }, [params])

    return (
        <SafeAreaView style={[style.container, { backgroundColor }]}>
            {professional ? (
                <>
                    <HeaderProfessional title={professional.profession} navigation={params.navigation} />
                    <View style={style.contentContainer}>
                        <Text style={style.nameProfessional}>{professional.name}</Text>
                        <View style={style.firstSection}>
                            <StarsRating id={professional.id} rate={professional.rate} numberRate={professional.numberRate} navigation={params.navigation} />
                            <ProfessionalDescription description={professional.description} />
                        </View>
                        <View style={style.secondSection}>
                            <HighlightRate id={professional.id}/>
                            <InfoCards id={professional.id}/>
                        </View>
                        <View style={style.thirdSection}>
                            <Text style={style.doesntSendMessage}>Este usuário ainda não anexou nenhuma imagem!</Text>
                        </View>
                    </View>
                </>
            ) : (
                <ActivityIndicator size={'large'} color={orangeDefault1} />
            )}
        </SafeAreaView>
    )
}