import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderClient from '../../../components/HeaderClient/indext';
import Input from '../../../components/Input';
import InputCEP from '../../../components/InputCEP';
import { ClientDTO, useAPI } from '../../../contexts/api';
import { useAuth } from '../../../contexts/auth';
import getAddress from '../../../services/cep';
import { blackDefault, orangeDefault, whiteDefault } from '../../../shared/styleConsts';
import style from './style';


export default function ClientProfile(props: any) {

    const { getClientToEdit, updateClient, updateImage } = useAPI();
    const { signOut } = useAuth();
    const [params, setParams] = useState<any>(props);
    const [client, setClient] = useState<ClientDTO | undefined>(undefined);
    const [nome, setNome] = useState<string>(client ? client.nome : '');
    const [email, setEmail] = useState<string>(client ? client.email : '');
    const [imagemDoPerfil, setImagemDoPerfil] = useState<any>(client?.imagemDoPerfil);

    const [cep, setCep] = useState<string>(client ? client.endereco.cep : '');
    const [estado, setEstado] = useState<string>(client ? client.endereco.estado : '');
    const [cidade, setCidade] = useState<string>(client ? client.endereco.cidade : '');
    const [bairro, setBairro] = useState<string>(client ? client.endereco.bairro : '');
    const [logradouro, setLogradouro] = useState<string>(client ? client.endereco.logradouro : '');
    const [numero, setNumero] = useState<string>(client ? client.endereco.numero : '');


    const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    const [tab, setTab] = useState<number>(0);

    const getClient = (id: number) => {
        getClientToEdit(id)
            .then((resolve) => {
                setClient(resolve)
            })
            .catch((error) => {
                throw new Error(error)
            })
    }

    const searchCEP = () => {
        setLoadingCEP(true);
        getAddress(cep).then((result) => {
            setCidade(result.localidade);
            setEstado(result.uf);
            setBairro(result.bairro);
            setLogradouro(result.logradouro);
        }).catch(() => showMessage({
            message: 'CEP inválido!',
            type: 'danger'
        }))
            .finally(() => setLoadingCEP(false));
    }

    const changeImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setLoadingImage(true);
                updateImage(response.assets[0])
                    .then((newImage) => {
                        setImagemDoPerfil(newImage)
                        showMessage({
                            message: 'Imagem de perfil alterada!',
                            type: 'success'
                        })
                    }).catch((e) => {
                        showMessage({
                            message: e,
                            type: 'danger'
                        })
                    })
                    .finally(() => setLoadingImage(false))
            }
        })
    }

    const handleupdate = () => {
        setLoadingUpdate(true)
        updateClient({
            id: params.id,
            nome,
            email,
            imagemDoPerfil,
            endereco: {
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero
            }
        } as ClientDTO)
            .then(() => {
                showMessage({
                    message: 'Informações atualizadas!',
                    type: 'success'
                })
            }).catch((e) => {
                showMessage({
                    message: e,
                    type: 'danger'
                })
            })
            .finally(() => setLoadingUpdate(false))
    }

    useEffect(() => {
        getClient(params?.id);
    }, [params])

    useEffect(() => {
        if (client) {
            setNome(client.nome);
            setEmail(client.email);
            setImagemDoPerfil(client.imagemDoPerfil);
            setCep(client.endereco.cep);
            setEstado(client.endereco.estado);
            setCidade(client.endereco.cidade);
            setBairro(client.endereco.bairro);
            setLogradouro(client.endereco.logradouro);
            setNumero(client.endereco.numero);
        }
    }, [client])

    return (
        <SafeAreaView style={style.container}>

            {!client ?
                <ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>
                :
                <>
                    {loadingUpdate ?
                        <ActivityIndicator style={style.loadingUpdate} size={70} color={orangeDefault} />
                        :
                        <></>
                    }
                    <HeaderClient title={client?.nome}
                        navigation={props.navigation}
                        id={client?.id}
                        hasButton={false} />
                    <View style={style.contentContainer}>
                        <View style={style.tabsContainer}>
                            <TouchableOpacity disabled={loadingUpdate} style={[style.tab, { backgroundColor: tab == 0 ? orangeDefault : whiteDefault }]}
                                onPress={() => setTab(0)}>
                                <Text style={{ color: tab == 0 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Pessoal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loadingUpdate || loadingCEP} style={[style.tab, { backgroundColor: tab == 1 ? orangeDefault : whiteDefault }]}
                                onPress={() => setTab(1)}>
                                <Text style={{ color: tab == 1 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Endereço
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {tab == 0 ?
                            <KeyboardAvoidingView style={style.inputsContainerInformations}>
                                <ScrollView>
                                    <TouchableOpacity disabled={loadingUpdate || loadingImage} style={style.imageContainer}
                                        onPress={() => {
                                            if (imagemDoPerfil)
                                                Alert.alert("Atenção!", "Você realmente deseja alterar sua foto de perfil?", [
                                                    {
                                                        text: 'Cancelar',
                                                        onPress: () => console.log('Cancelou')
                                                    },
                                                    {
                                                        text: 'Sim',
                                                        onPress: () => changeImage()
                                                    }
                                                ])
                                            else changeImage();
                                        }}>
                                        {imagemDoPerfil ?
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                {loadingImage ?
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: imagemDoPerfil.uri }}></Image>
                                            </View>
                                            :
                                            <View style={style.noImage}>
                                                <Icon name={'camera'} size={50} color={blackDefault}></Icon>
                                                <Text style={style.noImageText}>Adicionar foto de perfil</Text>
                                                {loadingImage ?
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                                                    :
                                                    <></>
                                                }
                                            </View>
                                        }
                                    </TouchableOpacity>
                                    <View style={style.inputsContainer}>
                                        <Input editable={!loadingUpdate} text={nome} onChangeText={setNome} placeholder='Nome' />
                                        <Input editable={!loadingUpdate} text={email} onChangeText={setEmail} placeholder='Email' />
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                            : <></>
                        }
                        {tab == 1 ?
                            <KeyboardAvoidingView style={style.inputsContainerAddress}>
                                {
                                    loadingCEP ?
                                        <ActivityIndicator style={style.loadingCEP} size={70} color={orangeDefault} />
                                        : <></>
                                }
                                <ScrollView>
                                    <InputCEP isClient={true} searchCEP={searchCEP} cep={cep} onChangeText={setCep} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Estado' text={estado} onChangeText={setEstado} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Cidade' text={cidade} onChangeText={setCidade} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Bairro' text={bairro} onChangeText={setBairro} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Rua' text={logradouro} onChangeText={setLogradouro} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Número' text={numero} onChangeText={setNumero} />
                                </ScrollView>
                            </KeyboardAvoidingView> : <></>
                        }
                        <View style={style.bottomContainer}>
                            <TouchableOpacity disabled={loadingUpdate} style={style.buttonUpdate}
                                onPress={() => handleupdate()}>
                                <Text style={{ color: whiteDefault, fontSize: 18, fontFamily: 'Rubik-SemiBold' }}>Atualizar Informações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loadingUpdate} style={style.buttonSignOut}
                                onPress={() => signOut()}>
                                <Text style={{ color: whiteDefault, fontSize: 18, fontFamily: 'Rubik-SemiBold' }}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            }
        </SafeAreaView>
    )
}