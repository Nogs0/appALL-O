import React, { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderRegisterProfessional from '../../../../components/HeaderRegisterProfessional'
import Input from '../../../../components/Input'
import { useRegister } from '../../../../contexts/register'
import { blackDefault, greyDefault, whiteDefault } from '../../../../shared/styleConsts'
import style from './style'

import styleRegister from '../../style';

export default function Register_Services({ navigation }: any) {

  const { setServices } = useRegister();
  const [servico, setServico] = useState<string>('');
  const [searchingServico, setSearchingServico] = useState<boolean>(false);
  const [listServicos, setListServicos] = useState<number[]>([]);

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
    {
      id: 1,
      name: 'Jardineiro'
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
    {
      id: 1,
      name: 'Jardineiro'
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
    {
      id: 1,
      name: 'Jardineiro'
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
    {
      id: 1,
      name: 'Jardineiro'
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
    {
      id: 1,
      name: 'Jardineiro'
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
      navigation.navigate('Register_Description');
    else Alert.alert("Por favor, preencha com ao menos um serviço!");
  }

  const canGoToTheNextPage = (): boolean => {
    return (
      listServicos.length > 0
    )
  }

  const addItem = () => {
    let servicoToAdd = servicosBase.find(x => x.name.toLowerCase() == servico.trim().toLowerCase())
    if (servicoToAdd) {
      let index = listServicos.findIndex(x => x == servicoToAdd.id)
      if (index == -1) {
        setListServicos((prev) => {
          prev.push(servicoToAdd.id);
          return [...prev];
        })
        setServico('');
      } else Alert.alert("Item já adicionado à lista!")
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
                      onPress={() => { setServico(item.name); setSearchingServico(false); setTempServicosBase(servicosBase); }}
                      style={{ borderBottomWidth: 1, borderBottomColor: greyDefault }}>
                      <Text style={{ color: blackDefault, fontSize: 24 }}>{item.name}</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
              :
              <></>
          }
          <TouchableOpacity style={style.buttonAddContainer} onPress={() => addItem()}>
            <Icon name={'plus'} size={30} color={whiteDefault} style={style.buttonAdd}></Icon>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ width: '100%' }}
          data={listServicos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)} />

        <TouchableOpacity style={styleRegister.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={styleRegister.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}