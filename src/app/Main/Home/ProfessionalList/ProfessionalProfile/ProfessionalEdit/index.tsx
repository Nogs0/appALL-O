import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderProfessional from '../../../../../../components/HeaderProfessional';
import ImagemServico from '../../../../../../components/ImagemServico';
import Input from '../../../../../../components/Input';
import InputCEP from '../../../../../../components/InputCEP';
import { PerfilProvedorOutput, ProvedorInput, useAPI } from '../../../../../../contexts/api';
import getAddress from '../../../../../../services/cep';
import { blackDefault, blueDefault, greyDefault, whiteDefault } from '../../../../../../shared/styleConsts';
import style from './style';

export default function ProfessionalEdit(props: any) {
    const { updateProfessional, updateImageProfessional, getPerfilProfissional, getImageProfessional, updateImageProfessionalServico } = useAPI();

    const [params] = useState<any>(props.route.params);
    const [professional, setProfessional] = useState<PerfilProvedorOutput>();

    const [razaoSocial, setRazaoSocial] = useState<string>(professional ? professional.provedor.razaoSocial : '');
    const [email, setEmail] = useState<string>(professional ? professional.provedor.email : '');
    const [telefone, setTelefone] = useState<string>(professional ? professional.provedor.telefone : '');
    const [imagem, setImagem] = useState<any>();
    const [descricao, setDescricao] = useState<string>(professional ? professional.descricao : '');

    const [cep, setCep] = useState<string>(professional ? professional.provedor.endereco.cep : '');
    const [estado, setEstado] = useState<string>(professional ? professional.provedor.endereco.estado : '');
    const [cidade, setCidade] = useState<string>(professional ? professional.provedor.endereco.cidade : '');
    const [bairro, setBairro] = useState<string>(professional ? professional.provedor.endereco.bairro : '');
    const [logradouro, setLogradouro] = useState<string>(professional ? professional.provedor.endereco.logradouro : '');
    const [numero, setNumero] = useState<string>(professional ? professional.provedor.endereco.numero : '');
    const [imagemId, setImagemId] = useState<string>(professional ? professional.imagemPerfil : '')

    const [servicoImagensIds, setServicoImagensIds] = useState<string[]>(professional ? professional.imagensServicos : []);

    const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    const [tab, setTab] = useState<number>(0);

    const searchCEP = (value: string) => {
        setCep(value)

        if (value.length == 10) {

            setLoadingCEP(true);
            getAddress(value).then((result) => {
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
    }

    const changeImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0 && response.assets[0].uri && response.assets[0].fileName) {
                setLoadingImage(true);
                updateImageProfessional(response.assets[0].uri, response.assets[0].fileName)
                    .then((newImage) => {
                        setImagemId(newImage);
                        handleupdate(newImage);
                        getImage(newImage);
                        showMessage({
                            message: 'Imagem de perfil alterada',
                            type: 'success'
                        })
                    }).catch((e) => {
                        showMessage({
                            message: 'Falha ao atualizar imagem de perfil',
                            type: 'danger'
                        })
                    })
                    .finally(() => setLoadingImage(false))
            }
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

    const handleupdate = (newImage?: string) => {
        setLoadingUpdate(true)
        updateProfessional({
            id: professional?.id,
            email,
            telefone,
            cpfCnpj: professional?.provedor.cpfCnpj,
            perfilProvedorInput: {
                idProvedor: professional?.id,
                descricao,
                perfilImage: newImage ? newImage : imagemId,
            },
            razaoSocial,
            tipoPessoa: professional?.provedor.tipoPessoa,
            enderecoInput: {
                id: professional?.provedor.endereco.id,
                cep,
                estado,
                cidade,
                bairro,
                logradouro,
                numero
            },
            idProfissao: professional?.provedor.profissao.id,
            servicoImagens: servicoImagensIds,
        } as ProvedorInput)
            .then(() => {
                if (professional)
                    getProfessional(professional.provedor.id);
                showMessage({
                    message: 'Informações atualizadas!',
                    type: 'success'
                })
            }).catch((e) => {
                showMessage({
                    message: 'Falha ao atualizar informações!',
                    type: 'danger'
                })
            })
            .finally(() => setLoadingUpdate(false))
    }

    const renderItem = (item: any) => {
        console.log(item)
        return (
            <ImagemServico loadingUpdate={loadingUpdate} removeImage={removeImage} item={item}/>
        )
    }

    const addImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0 && response.assets[0].uri && response.assets[0].fileName) {
                updateImageProfessionalServico(response.assets[0].uri, response.assets[0].fileName)
                    .then((newImage) => {
                        setServicoImagensIds((prev) => [...prev, ...[newImage]])
                    })
                    .catch((e) => {
                        showMessage({
                            message: 'Falha no upload da imagem',
                            type: 'danger'
                        })
                    })
            }
        })
    }

    const removeImage = (item: string) => {
        let indexToDelete = servicoImagensIds.findIndex((x: any) => x == item);
        if (indexToDelete != -1) {
            setServicoImagensIds((prev: string[]) => {
                prev.splice(indexToDelete, 1)
                return [...prev]
            })
        }
    }

    const getProfessional = (id: number) => {
        getPerfilProfissional(id)
            .then((result) => {
                console.log(result);
                setProfessional(result);
                if (result.imagemPerfil)
                    getImage(result.imagemPerfil);
            })
            .catch((e) => {
                showMessage({   
                    message: 'Falha ao carregar profissional!',
                    type: 'danger'
                })
            })
    }

    useEffect(() => {
        getProfessional(params.professionalId)
    }, [params])

    useEffect(() => {
        if (professional) {
            setRazaoSocial(professional.provedor.razaoSocial);
            setEmail(professional.provedor.email);
            setTelefone(professional.provedor.telefone);
            setDescricao(professional.descricao);
            setCep(professional.provedor.endereco.cep);
            setEstado(professional.provedor.endereco.estado);
            setCidade(professional.provedor.endereco.cidade);
            setBairro(professional.provedor.endereco.bairro);
            setLogradouro(professional.provedor.endereco.logradouro);
            setNumero(professional.provedor.endereco.numero);
            setImagemId(professional.imagemPerfil);
            setServicoImagensIds(professional.imagensServicos);
            console.log(professional.imagensServicos);
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
                    <HeaderProfessional title={professional?.provedor.razaoSocial}
                        navigation={props.navigation}
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
                                                    <ActivityIndicator style={style.loadingImage} size={35} color={blueDefault} />
                                                    :
                                                    <></>
                                                }
                                                <Image style={style.image} source={{ uri: imagem }}></Image>
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
                                        <Input editable={!loadingUpdate} text={telefone} onChangeText={setTelefone} placeholder='Telefone' />
                                        <TextInput placeholder={'Sou um profissional pontual e que gosta de que tudo esteja bem feito!'}
                                            style={style.textArea}
                                            value={descricao}
                                            onChangeText={setDescricao}
                                            multiline={true}
                                            numberOfLines={6}
                                            placeholderTextColor={greyDefault}
                                            textAlignVertical='top' />
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
                                    <InputCEP cep={cep} onChangeText={searchCEP} />
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
                                    data={servicoImagensIds}
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