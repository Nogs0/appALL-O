import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderClient from '../../../components/HeaderClient/indext';
import Input from '../../../components/Input';
import InputCEP from '../../../components/InputCEP';
import { ClientDTO, ClienteInput, PefilClienteOutput, useAPI } from '../../../contexts/api';
import { useAuth } from '../../../contexts/auth';
import getAddress from '../../../services/cep';
import { blackDefault, orangeDefault, whiteDefault } from '../../../shared/styleConsts';
import style from './style';

export default function ClientProfile(props: any) {

    const { getPerfilCliente, updateClient, updateImageClient, getImageClient } = useAPI();
    const { signOut, user } = useAuth();
    const [params, setParams] = useState<any>(props);
    const [cliente, setCliente] = useState<PefilClienteOutput>();
    const [nome, setNome] = useState<string>(cliente ? cliente.nome : '');
    const [email, setEmail] = useState<string>(cliente ? cliente.email : '');
    const [telefone, setTelefone] = useState<string>(cliente ? cliente.telefone : '');
    const [cpfCnpj, setCpfCnpj] = useState<string>(cliente ? cliente.cliente.cpf : '');
    const [imagemId, setImagemId] = useState<string>(cliente ? cliente.imagemPerfil : '');
    const [imagem, setImagem] = useState<any>();

    const [cep, setCep] = useState<string>(cliente ? cliente.cliente.endereco.cep : '');
    const [estado, setEstado] = useState<string>(cliente ? cliente.cliente.endereco.estado : '');
    const [cidade, setCidade] = useState<string>(cliente ? cliente.cliente.endereco.cidade : '');
    const [bairro, setBairro] = useState<string>(cliente ? cliente.cliente.endereco.bairro : '');
    const [logradouro, setLogradouro] = useState<string>(cliente ? cliente.cliente.endereco.logradouro : '');
    const [numero, setNumero] = useState<string>(cliente ? cliente.cliente.endereco.numero : '');


    const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    const [tab, setTab] = useState<number>(0);

    const getClient = (id: number) => {
        getPerfilCliente(id)
            .then((resolve) => {
                setCliente(resolve);
                console.log(resolve);
                if (resolve.imagemPerfil.length > 0)
                    getImage(resolve.imagemPerfil);
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar cliente',
                    type: 'danger'
                })
            })
    }

    const getImage = (idImage: string) => {
        getImageClient(idImage)
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
            if (response.assets && response.assets.length > 0 && response.assets[0].uri && response.assets[0].fileName) {
                setLoadingImage(true);
                updateImageClient(response.assets[0].uri, response.assets[0].fileName)
                    .then((newImage) => {
                        console.log(newImage);
                        setImagemId(newImage);
                        handleupdate();
                        getImage(newImage);
                        showMessage({
                            message: 'Imagem de perfil alterada',
                            type: 'success'
                        })
                    }).catch((e) => {
                        console.log(e)
                        showMessage({
                            message: 'Falha ao atualizar imagem de perfil',
                            type: 'danger'
                        })
                    })
                    .finally(() => setLoadingImage(false))
            }
        })
    }

    const handleupdate = () => {
        if (cliente) {
            setLoadingUpdate(true)
            updateClient({
                id: cliente.cliente.id,
                nome,
                email,
                telefone,
                imagem: imagemId,
                cpfCnpj,
                enderecoInput: {
                    id: cliente.cliente.endereco.id,
                    cep,
                    estado,
                    cidade,
                    bairro,
                    logradouro,
                    numero
                }
            } as ClienteInput)
                .then(() => {
                    if (cliente)
                        getClient(cliente.cliente.id)
                    showMessage({
                        message: 'Informações atualizadas!',
                        type: 'success'
                    })
                }).catch((e) => {
                    showMessage({
                        message: 'Falha ao atualizar informações',
                        type: 'danger'
                    })
                })
                .finally(() => setLoadingUpdate(false))
        }
    }

    useEffect(() => {
        if (user)
            getClient(user.id);
    }, [])

    useEffect(() => {
        if (cliente && cliente.cliente.endereco) {
            setNome(cliente.nome);
            setEmail(cliente.email);
            setTelefone(cliente.cliente.telefone);
            setCpfCnpj(cliente.cliente.cpf);
            setCep(cliente.cliente.endereco.cep);
            setEstado(cliente.cliente.endereco.estado);
            setCidade(cliente.cliente.endereco.cidade);
            setBairro(cliente.cliente.endereco.bairro);
            setLogradouro(cliente.cliente.endereco.logradouro);
            setNumero(cliente.cliente.endereco.numero);
        }
    }, [cliente])

    return (
        <SafeAreaView style={style.container}>

            {!cliente ?
                <ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>
                :
                <>
                    {loadingUpdate ?
                        <ActivityIndicator style={style.loadingUpdate} size={70} color={orangeDefault} />
                        :
                        <></>
                    }
                    <HeaderClient title={cliente?.nome}
                        navigation={props.navigation}
                        id={cliente?.id}
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
                                            if (imagem)
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
                                        {imagem ?
                                            <View style={style.hasImage}>
                                                {loadingImage ?
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={orangeDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: imagem }}></Image>
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
                                        <Input editable={!loadingUpdate} text={telefone} onChangeText={setTelefone} placeholder='Email' />
                                        <Input editable={!loadingUpdate} text={cpfCnpj} onChangeText={setCpfCnpj} placeholder='CPF' />
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