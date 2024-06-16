import React, { useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styleRegister from '../../style'
import style from './style'
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import getAddress from '../../../../../services/cep';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import InputCEP from '../../../../../components/InputCEP';
import { blueDefault, redDefault } from '../../../../../shared/styleConsts';

export default function Register_ServiceLocation({ navigation }: any) {

  const { professional, setAddress } = useRegisterProfessional();

  const [postalCode, setPostalCode] = useState<string>(!!professional ? professional.address?.postalCode : '');
  const [city, setCity] = useState<string>(!!professional ? professional.address?.city : '');
  const [state, setState] = useState<string>(!!professional ? professional.address?.state : '');
  const [neighborhood, setNeighborhood] = useState<string>(!!professional ? professional.address?.neighborhood : '');
  const [street, setStreet] = useState<string>(!!professional ? professional.address?.street : '');
  const [number, setNumber] = useState<string>(!!professional ? professional.address?.number : '');
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
      navigation.navigate('Register_Contact');
    else setIncorrectInformations(true)
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
      <KeyboardAvoidingView style={style.scrollViewDefaultContentContainer}>
        <ScrollView>
          <Text style={styleRegister.title}>Como o cliente pode te encontrar?</Text>
          <View style={styleRegister.inputsContainer}>
            <InputCEP onFocus={() => setIncorrectInformations(false)} searchCEP={searchCEP} cep={postalCode} onChangeText={setPostalCode} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Estado' text={state} onChangeText={setState} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Cidade' text={city} onChangeText={setCity} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Bairro' text={neighborhood} onChangeText={setNeighborhood} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Rua' text={street} onChangeText={setStreet} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Número' text={number} onChangeText={setNumber} />
          </View>
          {
            incorrectInformations ?
              <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
              : <></>
          }
          <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
            <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}