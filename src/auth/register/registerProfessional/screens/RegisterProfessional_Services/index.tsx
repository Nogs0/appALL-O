import React, { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import style from './style'

import styleRegister from '../../style';
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional';
import Input from '../../../../../components/Input';
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional';
import { greyDefault, blackDefault, whiteDefault, redDefault } from '../../../../../shared/styleConsts';
import { showMessage } from 'react-native-flash-message';
import Ok from '../../../../../components/Ok';

export default function RegisterProfessional_Services({ navigation }: any) {

  const { setServices } = useRegisterProfessional();
  const [servico, setServico] = useState<string>('');
  const [searchingServico, setSearchingServico] = useState<boolean>(false);
  const [listServicos, setListServicos] = useState<number[]>([]);
  const [incorrectInformations, setIncorrectInformations] = useState<boolean>(false);

  const servicosBase = [
    {
      id: 1,
      name: 'Jardineiro'
    },
    {
      id: 7,
      name: 'Jovem'
    },
    {
      id: 2,
      name: 'Eletricista'
    },
    {
      id: 3,
      name: 'Encanador'
    },
    {
      id: 4,
      name: 'Mecânico'
    },
  ]

  const [tempServicosBase, setTempServicosBase] = useState<any[]>(servicosBase)

  const handleButtonNext = () => {
    setServices(listServicos);
    if (canGoToTheNextPage())
      navigation.navigate('RegisterProfessional_Description');
    else setIncorrectInformations(true)
  }

  const canGoToTheNextPage = (): boolean => {
    return (
      listServicos.length > 0
    )
  }

  const addItem = (name: string) => {
    setServico(name);
    setSearchingServico(false);
    setTempServicosBase(servicosBase);

    let servicoToAdd = servicosBase.find(x => x.name.toLowerCase() == name.trim().toLowerCase())
    if (servicoToAdd) {
      let index = listServicos.findIndex(x => x == servicoToAdd.id)
      if (index == -1) {
        setIncorrectInformations(false)
        setListServicos((prev) => {
          prev.push(servicoToAdd.id);
          return [...prev];
        })
        setServico('');
      } else showMessage({
        message: 'Serviço já adicionado à lista!',
        type: 'danger'
      })
    }
  }

  const searchForServico = (value: string) => {
    setServico(value);
    setSearchingServico(value.length > 0);
    setTempServicosBase((prev) => {
      prev = servicosBase.filter(x => x.name.toLowerCase().includes(value.toLowerCase()))
      return [...prev]
    })
  }

  const renderItem = (id: number) => {

    let serv = servicosBase.find(x => x.id == id);
    return (
      <View style={
        {
          padding: 10,
          borderColor: greyDefault,
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text style={{ color: blackDefault }}>{serv?.name}</Text>
        <TouchableOpacity
          onPress={() => {
            let index = listServicos.findIndex(x => x == id);
            if (index != -1)
              setListServicos((prev) => {
                prev.splice(index, 1);
                return [...prev];
              });
          }}>
          <Icon name={'trash-can'} size={20} color={blackDefault}></Icon>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styleRegister.defaultContainer}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={styleRegister.defaultContentContainer}>
        <Text style={styleRegister.title}>Quais serviços você faz?</Text>
        <View style={style.addProfessionContainer}>
          <Input
            placeholder={'Serviço'}
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
                        addItem(item.name);
                      }}
                      style={{ borderBottomWidth: 1, borderBottomColor: greyDefault }}>
                      <Text style={{ color: blackDefault, fontSize: 24 }}>{item.name}</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
              :
              <></>
          }
        </View>

        <FlatList
          style={{ width: '100%' }}
          data={listServicos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)} />
        {
          incorrectInformations ?
            <Text style={{ color: redDefault, width: '100%', textAlign: 'left' }}>*Por favor, selecione ao menos um serviço!</Text>
            : <></>
        }
        <TouchableOpacity style={styleRegister.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonCreateProfession} onPress={() => navigation.navigate('RegisterProfessional_CreatingProfession')}>
          <Text style={style.textButtonCreateProfession}>Não encontrou sua profissão? Clique aqui!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}