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
import { backgroundDialogDefault, blackDefault, blueDefault, greyLoadingDefault2, orangeDefault, whiteDefault } from '../../../../../shared/styleConsts';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import ImagemServico from '../../../../../components/ImagemServico';

export default function ProfessionalProfile(props: any) {

    const { getPerfilProfissional, getImageProfessional, getServicosNaoVistosProfissional, feedbackServico, registrarServico } = useAPI();
    const { isProfessional, signOut, user } = useAuth();
    const [params, setParams] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<PerfilProvedorOutput>();
    const [imagem, setImagem] = useState<any>();
    const [showDialogWhatsApp, setShowDialogWhatsApp] = useState<boolean>(false);

    const navigation = useNavigation();

    const openWhatsapp = () => {
        let wppNumber = professional?.provedor.telefone.replace(fixPhone, "55$1$2$3");
        Linking.openURL('http://wa.me/' + wppNumber + `?text=ALL-O! ${professional?.provedor.razaoSocial}, tudo bem? Sou o(a) ${user?.name}, gostaria de solicitar um serviço!`)
    }

    const handlePressOk = () => {
        if (professional) {
            registrarServico(professional?.provedor.id)
                .then(() => {
                    openWhatsapp();
                    setShowDialogWhatsApp(false);
                })
                .catch((e) => {
                    showMessage({
                        message: 'Falha ao registrar serviço',
                        type: 'danger'
                    })
                })
        }
    }

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
            let index = servicosNaoVistos.findIndex(x => x.id == id)
            if (index != -1)
                prev.splice(index, 1)
            return [...prev]
        })
    }

    const handlePress = (id: number, confirmado: boolean) => {
        feedbackServico({ id, confirmado } as FeedbackServicoInput)
            .then(() => {
                removeServico(id)
                showMessage({
                    message: 'Obrigado pelo feedback!',
                    type: 'success'
                })
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao registrar serviço',
                    type: 'danger'
                })
            })
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getProfessional(isProfessional ? user?.id : params?.id);
        })
    }, [])

    const renderItem = (item: ServicoOutput) => {
        return (
            <CustomDialog
                visible={true}
                isProfessional
                cancel={() => handlePress(item.id, false)}
                ok={() => handlePress(item.id, true)}
                title='NOTIFICAÇÃO DE SERVIÇO'
                text={`ALL-O! ${professional?.provedor.razaoSocial}, você prestou algum serviço para o(a) cliente ${item.cliente.nome}?`}
            />
        )
    }

    const renderItemImage = (item: string) => {
        return (
            <ImagemServico item={item} />
        )
    }

    return (
        <SafeAreaView style={[style.container, { backgroundColor: isProfessional ? blueDefault : orangeDefault }]}>
            {professional ? (
                <>

                    <CustomDialog
                        visible={showDialogWhatsApp}
                        cancel={() => setShowDialogWhatsApp(false)}
                        ok={() => handlePressOk()}
                        title='REQUISIÇÃO DE SERVIÇO'
                        text='ALL-O! Ao iniciar a conversa no WhatsApp registraremos a intenção de serviço, tudo bem?' />

                    {servicosNaoVistos.length > 0 ?
                        <FlatList
                            horizontal
                            style={{
                                height: '100%',
                                position: 'absolute'
                            }}
                            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                            data={[servicosNaoVistos[0]]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                        />
                        :
                        <></>
                    }

                    <HeaderProfessional title={isProfessional ? 'SEU PERFIL' : params.profissao.replace(/^\w/, (c: string) => c.toUpperCase())}
                        navigation={navigation}
                        signOut={handleSignOut}
                        isProfessional={isProfessional}
                        defaultColor={isProfessional ? blueDefault : orangeDefault}
                        professionalId={professional.provedor.id} />
                    <View style={style.contentContainer} >
                        <Text style={[style.nameProfessional, { color: isProfessional ? blueDefault : orangeDefault }]}>{professional.provedor.razaoSocial}</Text>

                        <View style={style.firstSection}>
                            <StarsRating id={professional.provedor.id} rate={professional.mediaAvaliacao} numberRate={professional.totalAvaliacoes} navigation={navigation} defaultColor={isProfessional ? blueDefault : orangeDefault} nomeProfissional={professional.provedor.razaoSocial} avaliacaoFavorita={professional.avaliacao?.id} />
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
                            <InfoCards servicosConcluidos={professional.servicosConcluidos} mediaAvaliacao={professional.mediaAvaliacao.toFixed(1)} tempoCadastro={professional.tempoCadastro} defaultColor={isProfessional ? blueDefault : orangeDefault} />
                        </View>

                        <FlatList
                            style={style.fifthSection}
                            data={professional.imagensServicos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItemImage(item)}
                            numColumns={3}
                        />
                        {
                            isProfessional ? <>
                            </> :
                                <View style={{
                                    width: "100%",
                                    justifyContent: "flex-end",

                                }}>
                                    <WhatsappButton style={style.WhatsappContainer} telefone={professional.provedor.telefone} onPress={() => setShowDialogWhatsApp(true)} ></WhatsappButton>
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


