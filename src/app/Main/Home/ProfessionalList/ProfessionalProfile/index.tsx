import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import CustomDialog from '../../../../../components/CustomDialog';
import { ScrollView } from 'react-native';
import HeaderProfessional from '../../../../../components/HeaderProfessional';
import HighlightRate from '../../../../../components/HighlightRate';
import InfoCards from '../../../../../components/InfoCards';
import ProfessionalDescription from '../../../../../components/ProfessionalDescription';
import StarsRating from '../../../../../components/StarsRating';
import WhatsappButton from '../../../../../components/WhatsappButton';
import { FeedbackServicoInput, PerfilProvedorOutput, ServicoOutput, useAPI } from '../../../../../contexts/api';
import { useAuth } from '../../../../../contexts/auth';
import { fixPhone } from '../../../../../shared/helpers';
import { blackDefault, blueDefault, greyLoadingDefault2, orangeDefault, whiteDefault } from '../../../../../shared/styleConsts';
import style from './style';

export default function ProfessionalProfile(props: any) {

    const { getPerfilProfissional, getImageProfessional, getServicosNaoVistosProfissional, feedbackServico } = useAPI();
    const { isProfessional, signOut, user } = useAuth();
    const [params, setParams] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<PerfilProvedorOutput>();
    const [imagem, setImagem] = useState<any>();
    const wppNumber = professional?.provedor.telefone.replace(fixPhone, "55$1$2$3");

    const handleScroll = (event: Event) => {
        console.log("nossa")
    };
    const openWhatsapp = () => {
        Linking.openURL('http://wa.me/' + wppNumber)
    }
    const registerService = () => {
        console.log("Optou por registrar um serviço")
    }

    const handleWhatsapp = () => {

        Alert.alert("Atenção!", "Você deseja abrir uma ordem de serviço?", [
            {
                text: 'Cancelar',
                onPress: () => {
                    console.log('Cancelou')
                }

            },
            {
                text: 'Sim',
                onPress: () => {
                    registerService()
                    openWhatsapp()
                }

            }
        ])

    }

    const [servicoAtual, setServicoAtual] = useState<number>(0);
    const [servicosNaoVistos, setServicosNaoVistos] = useState<ServicoOutput[]>([]);

    const getProfessional = (id: number) => {
        getPerfilProfissional(id)
            .then((result) => {
                setProfessional(result);
                if (result.imagemPerfil)
                    getImage(result.imagemPerfil);

                if (isProfessional)
                    getServicosNaoVistosProfissional(id)
                        .then((result) => {
                            setServicosNaoVistos(result);
                        })
                        .catch((e) => {
                            showMessage({
                                message: 'Falha ao carregar serviços',
                                type: 'danger'
                            })
                        });
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar profissional!',
                    type: 'danger'
                })
            })
    }

    const getImage = (idImage: string) => {
        getImageProfessional(idImage)
            .then((result) => {
                setImagem(result);
            })
            .catch((e) => {
                console.log(e)
                showMessage({
                    message: 'Falha ao carregar imagem',
                    type: 'danger'
                })
            })
    }

    const handleSignOut = () => {
        signOut();
    }

    const removeServico = (id: number) => {
        setServicosNaoVistos((prev) => {
            let index = servicosNaoVistos.findIndex(x => x.idServico == id)
            if (index != -1)
                prev.splice(index, 1)
            return [...prev]
        })
    }

    const handlePress = (idServico: number, confirmado: boolean) => {
        removeServico(idServico)
        showMessage({
            message: 'Obrigado pelo feedback!',
            type: 'success'
        })

        feedbackServico({ idServico, confirmado } as FeedbackServicoInput)
            .finally(() =>
                showMessage({
                    message: 'Obrigado pelo feedback!',
                    type: 'success'
                }))
    }

    useEffect(() => {
        getProfessional(isProfessional ? user?.id : params?.id);
    }, [])

    const renderItem = (item: ServicoOutput) => {
        return (
            <CustomDialog
                isProfessional
                cancel={() => handlePress(item.idServico, false)}
                ok={() => handlePress(item.idServico, true)}
                title='NOTIFICAÇÃO DE SERVIÇO'
                text={`Olá, ${professional?.nome}, você prestou algum serviço para o(a) cliente ${item.nomeCliente}?`}
            />
        )
    }

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems[0] !== undefined) {
            setServicoAtual(viewableItems[0]?.index)
            console.log(viewableItems[0]?.index)
        }
    }

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: {
                itemVisiblePercentThreshold: 20
            },
            onViewableItemsChanged
        }
    ]);

    return (
        <SafeAreaView style={[style.container, { backgroundColor: isProfessional ? blueDefault : orangeDefault }]}>
            {professional ? (
                <>
                    {servicosNaoVistos.length > 0 ?
                        <View style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: greyLoadingDefault2,
                            position: 'absolute',
                            zIndex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FlatList
                                horizontal
                                style={{
                                    height: '100%',
                                }}
                                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                                data={servicosNaoVistos}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => renderItem(item)}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                            />
                            <FlatList
                                horizontal
                                style={{ alignSelf: 'center', bottom: 240 }}
                                data={servicosNaoVistos}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={{
                                                width: index === servicoAtual ? 12 : 8,
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: index === servicoAtual ? blackDefault : blueDefault,
                                                marginHorizontal: 2
                                            }} />
                                    )
                                }}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                                scrollEnabled={false}
                            />
                        </View>
                        :
                        <></>
                    }

                    <HeaderProfessional title={isProfessional ? 'SEU PERFIL' : params.profissao.replace(/^\w/, (c: string) => c.toUpperCase())}
                        navigation={props.navigation}
                        signOut={handleSignOut}
                        isProfessional={isProfessional}
                        defaultColor={isProfessional ? blueDefault : orangeDefault}
                        professionalId={professional.provedor.id} />
                    <View style={style.contentContainer} >

                        <ScrollView >
                            <Text style={[style.nameProfessional, { color: isProfessional ? blueDefault : orangeDefault }]}>{professional.nome}</Text>

                            <View style={style.firstSection}>
                                <StarsRating id={professional.id} rate={professional.mediaAvaliacao} numberRate={professional.quantidadeAvaliacoes} navigation={props.navigation} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                                {imagem ?
                                    <Image style={style.image} source={{ uri: imagem }}></Image>
                                    :
                                    <Image style={style.image} source={require('../../../../../assets/images/default-profile-pic.png')}></Image>
                                }
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

                        </ScrollView>
                        {
                            isProfessional ? <>
                            </> :
                                <View style={{
                                    width: "100%",
                                    justifyContent: "flex-end",
                                    backgroundColor: '#00000000',

                                }}>
                                    <WhatsappButton style={style.WhatsappContainer} telefone={professional.provedor.telefone} onPress={() => handleWhatsapp()} ></WhatsappButton>
                                </View>
                        }
                    </View>
                </>
            ) :
                <ActivityIndicator size={70} color={whiteDefault} />
            }
        </SafeAreaView>
    )
}


