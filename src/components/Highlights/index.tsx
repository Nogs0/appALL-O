import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from './style'
import { useNavigation } from '@react-navigation/native';
import { ProvedorDestaqueOutput, useAPI } from '../../contexts/api';
import { showMessage } from 'react-native-flash-message';


export default function Highlights({ navigation }: any) {

  const { getProvedorHighlits } = useAPI();

  const [profissionais, setProfissionais] = useState<ProvedorDestaqueOutput[]>([]);

  useEffect(() => {
    getProvedorHighlits()
    .then((result) => {
      setProfissionais([...result])
    }).catch((e) => {
      showMessage({
        message: 'Falha ao carregar profissionais',
        type: 'danger'
      });
    });
  }, [])

  const renderItem = (item: ProvedorDestaqueOutput, navigation: any) => {
    return (
      <TouchableOpacity style={style.containerImage} onPress={() => {
        navigation.navigate('ProfessionalProfile', { id: item.id, profissao: item.nomeProfissao })
      }}>
        {/* <Image style={style.imageProfessional}
          source={item.imagem}></Image> */}
        <Text style={style.nameProfessional}>{item.razaoSocial}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Profissionais em destaque</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={profissionais}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item, navigation)}
      />
    </SafeAreaView>
  )
}