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
import { showMessage } from 'react-native-flash-message';
import { Endereco } from '../../../../../contexts/api';

export default function RegisterProfessional_ServiceLocation({ navigation }: any) {

  const { profissional, setEndereco } = useRegisterProfessional();

  const [cep, setCep] = useState<string>(!!profissional ? profissional.enderecoInput?.cep : '');
  const [cidade, setCidade] = useState<string>(!!profissional ? profissional.enderecoInput?.cidade : '');
  const [estado, setEstado] = useState<string>(!!profissional ? profissional.enderecoInput?.estado : '');
  const [bairro, setBairro] = useState<string>(!!profissional ? profissional.enderecoInput?.bairro : '');
  const [logradouro, setLogradouro] = useState<string>(!!profissional ? profissional.enderecoInput?.logradouro : '');
  const [numero, setNumero] = useState<string>(!!profissional ? profissional.enderecoInput?.numero : '');
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
  const handleButtonNext = () => {
    setEndereco({
      cep,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
    } as Endereco);
    if (canGoToTheNextStep())
      navigation.navigate('RegisterProfessional_Contact');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextStep = (): boolean => {
    return (
      cep.length > 0 &&
            estado.length > 0 &&
            cidade.length > 0 &&
            bairro.length > 0 &&
            logradouro.length > 0 &&
            numero.length > 0
    )
  }

  const searchCEP = () => {
    setLoadingCEP(true);
    setCidade('');
    setEstado('');
    setBairro('');
    setLogradouro('');
    setNumero('')
    getAddress(cep)
      .then((result) => {
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
      <HeaderRegisterProfessional navigation={navigation} />
      <KeyboardAvoidingView style={style.scrollViewDefaultContentContainer}>
        <ScrollView>
          <Text style={styleRegister.title}>Como o cliente pode te encontrar?</Text>
          <View style={styleRegister.inputsContainer}>
            <InputCEP onFocus={() => setIncorrectInformations(false)} searchCEP={searchCEP} cep={cep} onChangeText={setCep} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Estado' text={estado} onChangeText={setEstado} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Cidade' text={cidade} onChangeText={setCidade} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Bairro' text={bairro} onChangeText={setBairro} />
            <Input onFocus={() => setIncorrectInformations(false)} editable={!loadingCEP} placeholder='Rua' text={logradouro} onChangeText={setLogradouro} />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}