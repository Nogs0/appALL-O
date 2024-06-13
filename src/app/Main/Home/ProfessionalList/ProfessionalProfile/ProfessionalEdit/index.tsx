import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import HeaderProfessional from '../../../../../../components/HeaderProfessional';
import { ProfessionalToEditDTO, useAPI } from '../../../../../../contexts/api';
import { blackDefault, blueDefault, whiteDefault } from '../../../../../../shared/styleConsts';
import style from './style';
import Input from '../../../../../../components/Input';
import InputCEP from '../../../../../../components/InputCEP';
import getAddress from '../../../../../../services/cep';

export default function ProfessinalEdit(props: any) {

    const { getProfessionalToEdit } = useAPI();
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

    const [loadingCEP, setLoadingCEP] = useState<boolean>(false);

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

    useEffect(() => {
        getProfessional(params?.id);
    }, [params])

    return (
        <SafeAreaView style={style.container}>
            {!professional ?
                <ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>
                :
                <>
                    <HeaderProfessional title={professional?.name}
                        navigation={props.navigation}
                        id={professional?.id}
                        defaultColor={blueDefault} />
                    <View style={style.contentContainer}>
                        <View style={style.imageContainer}>
                            <Image style={style.image} source={require('../../../../../../assets/images/eletricista.jpg')}></Image>
                        </View>
                        <View style={style.tabsContainer}>
                            <TouchableOpacity style={[style.tab, { backgroundColor: tab == 0 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(0)}>
                                <Text style={{ color: tab == 0 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Pessoal
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.tab, { backgroundColor: tab == 1 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(1)}>
                                <Text style={{ color: tab == 1 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Endereço
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.tab, { backgroundColor: tab == 2 ? blueDefault : whiteDefault }]}
                                onPress={() => setTab(2)}>
                                <Text style={{ color: tab == 2 ? whiteDefault : blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold' }}>Imagens
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {tab == 0 ?
                            <View style={style.inputsContainer}>
                                <Input text={name} onChangeText={setName} placeholder='Nome' />
                                <Input text={email} onChangeText={setEmail} placeholder='Email' />
                                <Input text={document} onChangeText={setDocument} placeholder='Documento' />
                            </View> : <></>
                        }
                        {tab == 1 ?
                            <KeyboardAvoidingView style={style.inputsContainerAddress}>
                                <InputCEP onFocus={() => console.log('a')} searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
                                <Input editable={!loadingCEP} placeholder='Estado' text={state} onChangeText={setState} />
                                <Input editable={!loadingCEP} placeholder='Cidade' text={city} onChangeText={setCity} />
                                <Input editable={!loadingCEP} placeholder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
                                <Input editable={!loadingCEP} placeholder='Rua' text={street} onChangeText={setStreet} />
                                <Input editable={!loadingCEP} placeholder='Número' text={number} onChangeText={setNumber} />
                            </KeyboardAvoidingView> : <></>
                        }
                        {tab == 2 ?
                            <></> : <></>
                        }
                        <TouchableOpacity style={style.buttonUpdate}>
                            <Text style={{ color: whiteDefault, fontSize: 24, fontFamily: 'Rubik-SemiBold' }}>Atualizar Informações</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </SafeAreaView>
    )
}