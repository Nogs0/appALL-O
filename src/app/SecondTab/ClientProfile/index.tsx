import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import style from './style';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import { ClientDTO, useAPI } from '../../../contexts/api';
import getAddress from '../../../services/cep';
import { blackDefault, orangeDefault, whiteDefault } from '../../../shared/styleConsts';
import HeaderClient from '../../../components/HeaderClient/indext';
import Input from '../../../components/Input';
import InputCEP from '../../../components/InputCEP';
import { useAuth } from '../../../contexts/auth';


export default function ClientProfile(props: any) {

    const { getClientToEdit, updateClient, updateImage } = useAPI();
    const { signOut } = useAuth();
    const [params, setParams] = useState<any>(props);
    const [client, setClient] = useState<ClientDTO | undefined>(undefined);
    const [name, setName] = useState<string>(client ? client.name : '');
    const [email, setEmail] = useState<string>(client ? client.email : '');
    const [perfilImage, setPerfilImage] = useState<any>(client?.perfilImage);

    const [postalCode, setPostalCode] = useState<string>(client ? client.address.postalCode : '');
    const [state, setState] = useState<string>(client ? client.address.state : '');
    const [city, setCity] = useState<string>(client ? client.address.city : '');
    const [neighborhood, setNeighborhood] = useState<string>(client ? client.address.neighborhood : '');
    const [street, setStreet] = useState<string>(client ? client.address.street : '');
    const [number, setNumber] = useState<string>(client ? client.address.number : '');


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
        console.log(postalCode)
        getAddress(postalCode).then((result) => {
            setCity(result.localidade);
            setState(result.uf);
            setNeighborhood(result.bairro);
            setStreet(result.logradouro);
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
                        setPerfilImage(newImage)
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
            name,
            email,
            perfilImage,
            address: {
                postalCode,
                state,
                city,
                neighborhood,
                street,
                number
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
            setName(client.name);
            setEmail(client.email);
            setPerfilImage(client.perfilImage);
            setPostalCode(client.address.postalCode);
            setState(client.address.state);
            setCity(client.address.city);
            setNeighborhood(client.address.neighborhood);
            setStreet(client.address.street);
            setNumber(client.address.number);
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
                    <HeaderClient title={client?.name}
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
                                            if (perfilImage)
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
                                        {perfilImage ?
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                {loadingImage ?
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: perfilImage.uri }}></Image>
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
                                        <Input editable={!loadingUpdate} text={name} onChangeText={setName} placeholder='Nome' />
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
                                    <InputCEP isClient={true} searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Estado' text={state} onChangeText={setState} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Cidade' text={city} onChangeText={setCity} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Rua' text={street} onChangeText={setStreet} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Número' text={number} onChangeText={setNumber} />
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