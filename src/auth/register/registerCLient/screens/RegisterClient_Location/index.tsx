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
import { showMessage } from 'react-native-flash-message';

export default function RegisterProfessional_ServiceLocation({ navigation }: any) {

  const { client, setAddress } = useRegisterClient();

  const [cep, setCep] = useState<string>(!!client ? client.endereco?.cep : '');
  const [cidade, setCidade] = useState<string>(!!client ? client.endereco?.cidade : '');
  const [estado, setEstado] = useState<string>(!!client ? client.endereco?.estado : '');
  const [bairro, setBairro] = useState<string>(!!client ? client.endereco?.bairro : '');
  const [logradouro, setLogradouro] = useState<string>(!!client ? client.endereco?.logradouro : '');
  const [numero, setNumero] = useState<string>(!!client ? client.endereco?.numero : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
  const handleButtonNext = () => {
    setAddress({
      cep,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
    });
    if (canGoToTheNextStep())
      navigation.navigate('RegisterClient_AddProfilePic');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      cep.length > 0 &&
      estado.length > 0 &&
      cidade.length > 0
    )
  }

  const searchCEP = () => {
    setLoadingCEP(true);
    setCidade('');
    setEstado('');
    setBairro('');
    setLogradouro('');
    setNumero('')
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
          <InputCEP onFocus={() => setIncorrectInformations(false)} isClient searchCEP={searchCEP} cep={cep} onChangeText={setCep} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Estado' text={estado} onChangeText={setEstado} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Cidade' text={cidade} onChangeText={setCidade} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Bairro' text={bairro} onChangeText={setBairro} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Logradouro' text={logradouro} onChangeText={setLogradouro} />
          <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Número' text={numero} onChangeText={setNumero} />
        </View>
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, preencha todos os campos corretamente!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleRegister.buttonNext} onPress={() => {setAddress({cep,estado,cidade,bairro, logradouro,numero,});console.log(client)}}>
          <Text style={styleRegister.textButtonNext}>print</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}