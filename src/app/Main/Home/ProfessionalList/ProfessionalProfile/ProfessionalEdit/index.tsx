import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderProfessional from '../../../../../../components/HeaderProfessional';
import { ProvedorInput, useAPI } from '../../../../../../contexts/api';
import { blackDefault, blueDefault, greyDefault, greyLoadingDefault, whiteDefault } from '../../../../../../shared/styleConsts';
import style from './style';
import InputCEP from '../../../../../../components/InputCEP';
import getAddress from '../../../../../../services/cep';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../../../../components/Input';
import { showMessage } from 'react-native-flash-message';

export default function ProfessionalEdit(props: any) {

    const { getProfessionalToEdit, updateProfessional, updateImage } = useAPI();

    const [params] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<ProvedorInput | undefined>(undefined);

    const [razaoSocial, setRazaoSocial] = useState<string>(professional ? professional.razaoSocial : '');
    const [email, setEmail] = useState<string>(professional ? professional.email : '');
    const [cpfCnpj, setCpfCnpj] = useState<string>(professional ? professional.cpfCnpj : '');
    const [imagemDoPerfil, setImagemDoPerfil] = useState<any>(professional ? professional.imagemDoPerfil : undefined );

    const [cep, setCep] = useState<string>(professional ? professional.endereco.cep : '');
    const [estado, setEstado] = useState<string>(professional ? professional.endereco.estado : '');
    const [cidade, setCidade] = useState<string>(professional ? professional.endereco.cidade : '');
    const [bairro, setBairro] = useState<string>(professional ? professional.endereco.bairro : '');
    const [logradouro, setLogradouro] = useState<string>(professional ? professional.endereco.logradouro : '');
    const [numero, setNumero] = useState<string>(professional ? professional.endereco.numero : '');

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
        getAddress(cep).then((result) => {
            setCidade(result.localidade);
            setEstado(result.uf);
            setBairro(result.bairro);
            setLogradouro(result.logradouro);
        }).catch(() => Alert.alert("Erro", "CEP Inválido!"))
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
        updateProfessional({
            id: params.id,
            razaoSocial,
            email,
            cpfCnpj,
            imagemDoPerfil,
            images,
            endereco: {
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero
            }
        } as ProvedorInput)
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
            setRazaoSocial(professional.razaoSocial);
            setEmail(professional.email);
            setCpfCnpj(professional.cpfCnpj);
            setImagemDoPerfil(professional.imagemDoPerfil);
            setCep(professional.endereco.cep);
            setEstado(professional.endereco.estado);
            setCidade(professional.endereco.cidade);
            setBairro(professional.endereco.bairro);
            setLogradouro(professional.endereco.logradouro);
            setNumero(professional.endereco.numero);
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
                    <HeaderProfessional title={professional?.razaoSocial}
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
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: imagemDoPerfil.uri }}></Image>
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
                                        <Input editable={!loadingUpdate} text={razaoSocial} onChangeText={setRazaoSocial} placeholder='Nome' />
                                        <Input editable={!loadingUpdate} text={email} onChangeText={setEmail} placeholder='Email' />
                                        <Input editable={!loadingUpdate} text={cpfCnpj} onChangeText={setCpfCnpj} placeholder='Documento' />
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                            : <></>
                        }
                        {tab == 1 ?
                            <KeyboardAvoidingView style={style.inputsContainerAddress}>
                                {
                                    loadingCEP ?
                                        <ActivityIndicator style={style.loadingCEP} size={70} color={blueDefault} />
                                        : <></>
                                }
                                <ScrollView>
                                    <InputCEP searchCEP={searchCEP} cep={cep} onChangeText={setCep} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Estado' text={estado} onChangeText={setEstado} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Cidade' text={cidade} onChangeText={setCidade} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Bairro' text={bairro} onChangeText={setBairro} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Rua' text={logradouro} onChangeText={setLogradouro} />
                                    <Input editable={!loadingCEP && !loadingUpdate} placeholder='Número' text={numero} onChangeText={setNumero} />
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