import React, { useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional'
import Input from '../../../../components/Input'
import { useRegister } from '../../../../contexts/register'

import InputCEP from '../../../../components/InputCEP'
import getAddress from '../../../../services/cep'
import { blueDefault } from '../../../../shared/styleConsts'
import styleRegister from '../../style'
import style from './style'

export default function Register_ServiceLocation({ navigation }: any) {

  const { professional, setAddress } = useRegister();

  const [postalCode, setPostalCode] = useState<string>(!!professional ? professional.address?.postalCode : '');
  const [city, setCity] = useState<string>(!!professional ? professional.address?.city : '');
  const [state, setState] = useState<string>(!!professional ? professional.address?.state : '');
  const [neighborhood, setNeighborhood] = useState<string>(!!professional ? professional.address?.neighborhood : '');
  const [street, setStreet] = useState<string>(!!professional ? professional.address?.street : '');
  const [number, setNumber] = useState<string>(!!professional ? professional.address?.number : '');

  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
  const handleButtonNext = () => {
    setAddress({
      postalCode,
      state,
      city,
      neighborhood,
      street,
      number,
    });
    if (canGoToTheNextStep())
      navigation.navigate('Register_Contact');
    else Alert.alert("Erro", "Por favor preencha todos os campos!")
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      postalCode.length > 0 &&
      state.length > 0 &&
      city.length > 0 &&
      neighborhood.length > 0 &&
      street.length > 0 &&
      number.length > 0
    )
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

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      {
        loadingCEP ?
          <ActivityIndicator style={style.loadingCEP} size={70} color={blueDefault} />
          : <></>
      }
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Como o cliente pode te encontrar?</Text>
        <View style={styleRegister.inputsContainer}>
          <InputCEP searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
          <Input editable={!loadingCEP} placeholder='Estado' text={state} onChangeText={setState} />
          <Input editable={!loadingCEP} placeholder='Cidade' text={city} onChangeText={setCity} />
          <Input editable={!loadingCEP} placeholder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
          <Input editable={!loadingCEP} placeholder='Rua' text={street} onChangeText={setStreet} />
          <Input editable={!loadingCEP} placeholder='Número' text={number} onChangeText={setNumber} />
        </View>
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}