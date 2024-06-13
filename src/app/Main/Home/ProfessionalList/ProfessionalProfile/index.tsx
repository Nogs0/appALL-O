import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, View } from 'react-native';
import HeaderProfessional from '../../../../../components/HeaderProfessional';
import HighlightRate from '../../../../../components/HighlightRate';
import InfoCards from '../../../../../components/InfoCards';
import ProfessionalDescription from '../../../../../components/ProfessionalDescription';
import StarsRating from '../../../../../components/StarsRating';
import { useAuth } from '../../../../../contexts/auth';
import { blueDefault, orangeDefault, whiteDefault } from '../../../../../shared/styleConsts';
import style from './style';

export default function ProfessionalProfile(props: any) {
    const { isProfessional, signOut } = useAuth();
    const [params, setParams] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<any>();

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
            description: 'Meu trabalho é garantir que a corrente flua de forma segura e eficiente. Desde a instalação até a manutenção, estou sempre atento aos detalhes para evitar falhas elétricas. Cuido para que cada conexão seja firme e cada circuito seja adequadamente protegido.'
        })
    }

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        getProfessional(params?.id);
    }, [params])

    return (
        <SafeAreaView style={[style.container, { backgroundColor: isProfessional ? blueDefault : orangeDefault }]}>
            {professional ? (
                <>
                    <HeaderProfessional title={isProfessional ? 'SEU PERFIL' : professional.profession}
                        navigation={props.navigation}
                        signOut={handleSignOut}
                        isProfessional={isProfessional}
                        defaultColor={isProfessional ? blueDefault : orangeDefault} 
                        id={professional.id}/>
                    <View style={style.contentContainer}>
                        <Text style={[style.nameProfessional, { color: isProfessional ? blueDefault : orangeDefault }]}>{professional.name}</Text>
                        <View style={style.firstSection}>
                            <StarsRating id={professional.id} rate={professional.rate} numberRate={professional.numberRate} navigation={props.navigation} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                            <Image style={style.image} source={require('../../../../../assets/images/eletricista.jpg')}></Image>
                        </View>
                        <View style={style.secondSection}>
                            <ProfessionalDescription description={professional.description} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                        <View style={style.thirdSection}>
                            <HighlightRate id={professional.id} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                        <View style={style.fourthSection}>
                            <InfoCards id={professional.id} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                    </View>
                </>

            ) : (
                <ActivityIndicator size={70} color={whiteDefault} />
            )
            }
        </SafeAreaView>
    )
}