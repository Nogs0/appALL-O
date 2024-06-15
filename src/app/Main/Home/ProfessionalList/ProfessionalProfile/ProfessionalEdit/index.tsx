import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderProfessional from '../../../../../../components/HeaderProfessional';
import { ProfessionalToEditDTO, useAPI } from '../../../../../../contexts/api';
import { blackDefault, blueDefault, greyDefault, greyLoadingDefault, whiteDefault } from '../../../../../../shared/styleConsts';
import style from './style';
import InputCEP from '../../../../../../components/InputCEP';
import getAddress from '../../../../../../services/cep';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../../../../components/Input';
import { showMessage } from 'react-native-flash-message';

export default function ProfessinalEdit(props: any) {

    const { getProfessionalToEdit, updateProfessional, updateImage } = useAPI();

    const [params] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<ProfessionalToEditDTO | undefined>(undefined);
    const [name, setName] = useState<string>(professional ? professional.name : '');
    const [email, setEmail] = useState<string>(professional ? professional.email : '');
    const [document, setDocument] = useState<string>(professional ? professional.document : '');
    const [perfilImage, setPerfilImage] = useState<any>(professional?.perfilImage);

    const [postalCode, setPostalCode] = useState<string>(professional ? professional.address.postalCode : '');
    const [state, setState] = useState<string>(professional ? professional.address.state : '');
    const [city, setCity] = useState<string>(professional ? professional.address.city : '');
    const [neighborhood, setNeighborhood] = useState<string>(professional ? professional.address.neighborhood : '');
    const [street, setStreet] = useState<string>(professional ? professional.address.street : '');
    const [number, setNumber] = useState<string>(professional ? professional.address.number : '');

    const [images, setImages] = useState<any[]>(professional ? professional.images : []);

    const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    const [tab, setTab] = useState<number>(0);

    const getProfessional = (id: number) => {
        getProfessionalToEdit(id)
            .then((resolve) => {
                setProfessional(resolve)
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
        }).catch(() => Alert.alert("Erro", "CEP Inválido!"))
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
        updateProfessional({
            id: params.id,
            name,
            email,
            document,
            perfilImage,
            images,
            address: {
                postalCode,
                state,
                city,
                neighborhood,
                street,
                number
            }
        } as ProfessionalToEditDTO)
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

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity disabled={loadingUpdate} style={style.imageContainerFlatList} onLongPress={() => removeImage(item.fileName)}>
                <Image style={style.imageFlatList} source={{ uri: item.uri }}></Image>
            </TouchableOpacity>
        )
    }

    const addImage = () => {
        console.log(images)
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0)
                setImages((prev) => {
                    if (response.assets)
                        prev.push(response.assets[0]);
                    return [...prev];
                })
        })
    }

    const removeImage = (fileName: string) => {
        let indexToDelete = images.findIndex(x => x.fileName == fileName);
        if (indexToDelete != -1) {
            setImages((prev) => {
                prev.splice(indexToDelete, 1)
                return [...prev]
            })
        }
    }

    useEffect(() => {
        getProfessional(params?.id);
    }, [params])

    useEffect(() => {
        if (professional) {
            setName(professional.name);
            setEmail(professional.email);
            setDocument(professional.document);
            setPerfilImage(professional.perfilImage);
            setPostalCode(professional.address.postalCode);
            setState(professional.address.state);
            setCity(professional.address.city);
            setNeighborhood(professional.address.neighborhood);
            setStreet(professional.address.street);
            setNumber(professional.address.number);
        }
    }, [professional])

    return (
        <SafeAreaView style={style.container}>

            {!professional ?
                <ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>
                :
                <>
                    {loadingUpdate ?
                        <ActivityIndicator style={style.loadingUpdate} size={70} color={blueDefault} />
                        :
                        <></>
                    }
                    <HeaderProfessional title={professional?.name}
                        navigation={props.navigation}
                        id={professional?.id}
                        defaultColor={blueDefault} />
                    <View style={style.contentContainer}>
                        <View style={style.tabsContainer}>
                            <TouchableOpacity disabled={loadingUpdate} style={[style.tab, { backgroundColor: tab == 0 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(0)}>
                                <Text style={{ color: tab == 0 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Pessoal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loadingUpdate || loadingCEP} style={[style.tab, { backgroundColor: tab == 1 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(1)}>
                                <Text style={{ color: tab == 1 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Endereço
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={loadingUpdate} style={[style.tab, { backgroundColor: tab == 2 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(2)}>
                                <Text style={{ color: tab == 2 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Imagens
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
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: perfilImage.uri }}></Image>
                                            </View>
                                            :
                                            <View style={style.noImage}>
                                                <Icon name={'camera'} size={50} color={blackDefault}></Icon>
                                                <Text style={{ color: blackDefault, fontFamily: 'Rubik-SemiBold' }}>Adicionar foto de perfil</Text>
                                                {loadingImage ?
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                                                    :
                                                    <></>
                                                }
                                            </View>
                                        }
                                    </TouchableOpacity>
                                    <View style={style.inputsContainer}>
                                        <Input editable={!loadingUpdate} text={name} onChangeText={setName} placeholder='Nome' />
                                        <Input editable={!loadingUpdate} text={email} onChangeText={setEmail} placeholder='Email' />
                                        <Input editable={!loadingUpdate} text={document} onChangeText={setDocument} placeholder='Documento' />
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                            : <></>
                        }
                        {tab == 1 ?
                            <KeyboardAvoidingView style={style.inputsContainerAddress}>
                                <ScrollView>
                                    <InputCEP onFocus={() => console.log('a')} searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Estado' text={state} onChangeText={setState} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Cidade' text={city} onChangeText={setCity} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Rua' text={street} onChangeText={setStreet} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Número' text={number} onChangeText={setNumber} />
                                </ScrollView>
                            </KeyboardAvoidingView> : <></>
                        }
                        {tab == 2 ?
                            <View style={style.imageGridContainer}>
                                <FlatList
                                    style={{ borderWidth: 1, width: '100%', marginBottom: 10, borderColor: greyDefault }}
                                    data={images}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={3}
                                    renderItem={({ item }) => renderItem(item)} />
                                <TouchableOpacity disabled={loadingUpdate}
                                    style={style.buttonAddImage}
                                    onPress={() => addImage()}>
                                    <Icon name={'image-plus'} size={40} color={whiteDefault}></Icon>
                                </TouchableOpacity>
                                <Text style={{ color: greyDefault, fontSize: 14, fontFamily: 'Rubik-Light' }}>Para remover uma imagem pressione-a por 2 segundos</Text>
                            </View> : <></>
                        }
                        <TouchableOpacity disabled={loadingUpdate} style={style.buttonUpdate}
                            onPress={() => handleupdate()}>
                            <Text style={{ color: whiteDefault, fontSize: 24, fontFamily: 'Rubik-SemiBold' }}>Atualizar Informações</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </SafeAreaView>
    )
}