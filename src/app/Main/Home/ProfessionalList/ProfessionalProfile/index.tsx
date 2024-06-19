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
import { PerfilProvedorOutput, useAPI } from '../../../../../contexts/api';
import { showMessage } from 'react-native-flash-message';

export default function ProfessionalProfile(props: any) {

    const { getPerfilProfissional } = useAPI();
    const { isProfessional, signOut, user } = useAuth();
    const [params, setParams] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<PerfilProvedorOutput>();

    const getProfessional = (id: number) => {
        getPerfilProfissional(id)
            .then((result) => {
                console.log(result);
                setProfessional(result);
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar profissional!',
                    type: 'danger'
                })
            })
    }

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            getProfessional(isProfessional ? user?.id : params?.id);
        })
    }, [])

    return (
        <SafeAreaView style={[style.container, { backgroundColor: isProfessional ? blueDefault : orangeDefault }]}>
            {professional ? (
                <>
                    <HeaderProfessional title={isProfessional ? 'SEU PERFIL' : params.profissao.replace(/^\w/, (c:string) => c.toUpperCase())}
                        navigation={props.navigation}
                        signOut={handleSignOut}
                        isProfessional={isProfessional}
                        defaultColor={isProfessional ? blueDefault : orangeDefault}
                        professionalId={professional.provedor.id} />
                    <View style={style.contentContainer}>
                        <Text style={[style.nameProfessional, { color: isProfessional ? blueDefault : orangeDefault }]}>{professional.nome}</Text>
                        <View style={style.firstSection}>
                            <StarsRating id={professional.id} rate={professional.mediaAvaliacao} numberRate={professional.quantidadeAvaliacoes} navigation={props.navigation} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                            <Image style={style.image} source={require('../../../../../assets/images/eletricista.jpg')}></Image>
                        </View>
                        <View style={style.secondSection}>
                            <ProfessionalDescription description={professional.descricao} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                        <View style={style.thirdSection}>
                            <HighlightRate avaliacao={professional.avaliacao} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                        <View style={style.fourthSection}>
                            <InfoCards servicosConcluidos={professional.servicosConcluidos} mediaAvaliacao={professional.mediaAvaliacao} tempoCadastro={professional.mediaAvaliacao} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>
                    </View>
                </>
            ) :
                <ActivityIndicator size={70} color={whiteDefault} />
            }
        </SafeAreaView>
    )
}