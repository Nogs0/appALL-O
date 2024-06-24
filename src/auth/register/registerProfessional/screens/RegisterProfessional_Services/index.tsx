import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';

import { showMessage } from 'react-native-flash-message';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { blackDefault, greyDefault, redDefault, whiteDefault } from '../../../../../shared/styleConsts';
import styleRegister from '../../style';
import { ProfissaoOutput, useAPI } from '../../../../../contexts/api';

export default function RegisterProfessional_Services(props: any) {

  const { getProfessions } = useAPI();
  const { profissional, setProfissao } = useRegisterProfessional();

  const [servico, setServico] = useState<string>('');
  const [searchingServico, setSearchingServico] = useState<boolean>(false);
  const [idProfissao, setIdProfissao] = useState<number>(profissional ? profissional.provedor.idProfissao : 0);
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const [servicosBase, setServicosBase] = useState<ProfissaoOutput[]>([]);

  const [tempServicosBase, setTempServicosBase] = useState<any[]>(servicosBase)

  const handleButtonNext = () => {
    setProfissao(idProfissao);
    if (canGoToTheNextPage())
      props.navigation.navigate('RegisterProfessional_Description');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextPage = (): boolean => {
    return (
      idProfissao != null && idProfissao != 0
    )
  }

  const setItem = (name: string) => {
    setSearchingServico(false);
    setTempServicosBase(servicosBase);

    let servicoToSet = servicosBase.find(x => x.nome.toLowerCase() == name.trim().toLowerCase())
    if (servicoToSet) {
      setIdProfissao(servicoToSet.id)
      setServico('');
      setIncorrectInformations(false)
    }
  }

  const searchForServico = (value: string) => {
    setServico(value);
    setSearchingServico(value.length > 0);
    setTempServicosBase((prev) => {
      prev = servicosBase.filter(x => x.nome.toLowerCase().includes(value.toLowerCase()))
      return [...prev]
    })
  }

  useEffect(() => {
    getProfessions()
      .then((result: ProfissaoOutput[]) => {
        setServicosBase(result)
      })
      .catch(() => {
        showMessage({
          message: 'Erro ao carregar profissoes',
          type: 'danger'
        })
      })
  }, [props])

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={props.navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Qual sua profissão?</Text>
        <View style={style.addProfessionContainer}>
          <Input
            placeholder={'Personal trainer...'}
            text={servico}
            onChangeText={(value) => searchForServico(value)} />
          {
            searchingServico ?
              <View
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: 60,
                  backgroundColor: whiteDefault,
                  width: '100%',
                  minHeight: 30,
                  maxHeight: 300,
                  elevation: 10,
                  borderWidth: 0.5,
                  padding: 10
                }}>
                <FlatList
                  data={tempServicosBase}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      onPress={() => {
                        setItem(item.nome);
                      }}
                      style={{ borderBottomWidth: 1, borderBottomColor: greyDefault }}>
                      <Text style={{ color: blackDefault, fontSize: 24 }}>{item.nome}</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
              :
              <></>
          }
        </View>
        {
          idProfissao != 0 ?
            <View style={
              {
                width: '100%',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Text style={{ color: blackDefault, fontFamily: 'Rubik-SemiBold', fontSize: 20 }}>{servicosBase.find(x => x.id == idProfissao)?.nome}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIdProfissao(0)
                }}>
                <Icon name={'trash-can'} size={20} color={blackDefault}></Icon>
              </TouchableOpacity>
            </View> :
            <></>
        }
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, selecione uma profisão!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonCreateProfession} onPress={() => props.navigation.navigate('RegisterProfessional_CreatingProfession')}>
          <Text style={style.textButtonCreateProfession}>Não encontrou sua profissão? Clique aqui!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}