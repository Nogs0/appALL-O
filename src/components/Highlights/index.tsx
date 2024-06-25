import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ProvedorDestaqueOutput, useAPI } from '../../contexts/api';
import style from './style';
import CardHighlight from '../CardHighlight';
import { blackDefault } from '../../shared/styleConsts';


export default function Highlights({ navigation }: any) {

  const { getProvedorHighlights } = useAPI();

  const [profissionais, setProfissionais] = useState<ProvedorDestaqueOutput[]>([]);

  useEffect(() => {
    getProvedorHighlights()
      .then((result) => {
        if (result.length > 0)
          setProfissionais([...result])

      }).catch((e) => {
        showMessage({
          message: 'Falha ao carregar profissionais',
          type: 'danger'
        });
      });
  }, [])

  const renderItem = (item: ProvedorDestaqueOutput) => {
    console.log(item)
    return (
      <CardHighlight
        razaoSocial={item.razaoSocial}
        navigation={navigation}
        id={item.id}
        imageId={item.imagem}
        nomeProfissao={item.nomeProfissao} />
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>Profissionais em destaque</Text>
      {profissionais.length > 0 ?
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={profissionais}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        /> :
        <Text style={{color: blackDefault}}>Profissionais não cadastrados!</Text>
      }
    </SafeAreaView>
  )
}