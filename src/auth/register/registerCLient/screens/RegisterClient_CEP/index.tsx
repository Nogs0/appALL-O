import React, { useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import styleRegister from '../../style'
import style from './style'
import HeaderRegisterClient from '../../../../../components/HeaderRegisterClient';
import Input from '../../../../../components/Input';
import InputCEP from '../../../../../components/InputCEP';
import { useRegisterClient } from '../../../../../contexts/registerClient';
import getAddress from '../../../../../services/cep';
import { blueDefault, redDefault } from '../../../../../shared/styleConsts';

export default function RegisterProfessional_ServiceLocation({ navigation }: any) {

  const { client, setAddress } = useRegisterClient();

  const [postalCode, setPostalCode] = useState<string>(!!client ? client.address?.postalCode : '');
  const [city, setCity] = useState<string>(!!client ? client.address?.city : '');
  const [state, setState] = useState<string>(!!client ? client.address?.state : '');
  const [neighborhood, setNeighborhood] = useState<string>(!!client ? client.address?.neighborhood : '');
  const [street, setStreet] = useState<string>(!!client ? client.address?.street : '');
  const [number, setNumber] = useState<string>(!!client ? client.address?.number : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);
  
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
      navigation.navigate('RegisterClient_AddProfilePic');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      postalCode.length > 0 &&
      state.length > 0 &&
      city.length > 0 
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
      <HeaderRegisterClient navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Informe sua cidade</Text>
        <View style={styleRegister.inputsContainer}>
          <InputCEP onFocus={() => setIncorrectInformations(false)} isClient searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Estado' text={state} onChangeText={setState} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Cidade' text={city} onChangeText={setCity} />
        </View>
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}