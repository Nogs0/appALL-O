import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import CardProfession from '../../../components/CardProfession';
import CustomDialogAvaliacao from '../../../components/CustomDialogAvaliacao';
import Highlights from '../../../components/Highlights';
import MostAccessed from '../../../components/MostAccessed';
import OtherProfessions from '../../../components/OtherProfessions';
import SearchForAProfession from '../../../components/SearchForAProfessional';
import { ProfissaoOutput, ServicoOutput, useAPI } from '../../../contexts/api';
import { useAuth } from '../../../contexts/auth';
import { whiteDefault } from '../../../shared/styleConsts';

export default function Home({ navigation }: any) {

  const { getProfessionsBySearch, getServicosParaAvaliarCliente, createAvaliacao } = useAPI();

  const { user, isProfessional } = useAuth();

  const [search, setSearch] = useState<string>('');
  const [profissoes, setProfissoes] = useState<ProfissaoOutput[]>([]);

  const [servicosParaAvaliar, setServicosParaAvaliar] = useState<ServicoOutput[]>([])

  const [nota, setNota] = useState<number>(5);
  const [descricao, setDescricao] = useState<string>('')

  useEffect(() => {
    if (user && !isProfessional)
      getServicosParaAvaliarCliente(user?.id)
        .then((result) => {
          setServicosParaAvaliar(result)
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao carregar serviços para avaliar',
            type: 'danger'
          })
        })
  }, [])

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      getProfessionsBySearch(value)
        .then((result) => {
          setProfissoes((prev) => {
            return [...result]
          });
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao buscar profissões',
            type: 'danger'
          })
        })
    }
  }

  const renderItem = (item: ProfissaoOutput) => {
    return (
      <CardProfession
        profession={item.nome.replace(/^\w/, (c) => c.toUpperCase())}
        professionId={item.id}
        onPress={() =>
          navigation.navigate('ProfessionalList', { profissao: item.nome, id: item.id })
        }
        professionIcon={item.nomeIcone} />
    )
  }

  const renderItemServico = (item: ServicoOutput) => {
    return (
      <CustomDialogAvaliacao
        ok={() => handlePress(item.id)}
        title='NOTIFICAÇÃO DE SERVIÇO'
        text={`ALL-O! ${user?.name}, você poderia avaliar o serviço realizado pelo(a) profissional ${item.provedor.razaoSocial}?`}
        estrelas={nota}
        setEstrelas={setNota}
        descricao={descricao}
        setDescricao={setDescricao}
      />
    )
  }

  const removeServico = (id: number) => {
    setServicosParaAvaliar((prev) => {
      let index = servicosParaAvaliar.findIndex(x => x.id == id)
      if (index != -1)
        prev.splice(index, 1)
      return [...prev]
    })
  }

  const handlePress = (idServico: number) => {
    createAvaliacao({ idServico, descricao, nota })
      .then(() => {
        removeServico(idServico);
        setNota(5);
        setDescricao('');
      })
      .catch((e) => {
        showMessage({
          message: 'Falha ao registrar avaliação',
          type: 'danger'
        })
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: whiteDefault }}>

      {servicosParaAvaliar.length > 0 ?
          <FlatList
            horizontal
            data={[servicosParaAvaliar[0]]}
            style={{
              height: '100%',
              position: 'absolute'
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItemServico(item)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        :
        <></>
      }

      <SearchForAProfession search={search} onChangeSearch={handleSearch} />
      {search.length > 0 ?
        <View style={{ alignItems: 'center', width: '100%' }}>
          <FlatList
            style={{ width: '90%', height: '80%' }}
            numColumns={3}
            data={profissoes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
        :
        <>
          <ScrollView style={{ flex: 0.8 }}>
            <MostAccessed />
            <Highlights navigation={navigation} />
            <OtherProfessions navigation={navigation} />
          </ScrollView>
        </>
      }
    </SafeAreaView>
  )
}