import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { NotificacaoOutput, useAPI } from '../../../contexts/api';
import { useAuth } from '../../../contexts/auth';
import { blueDefault, whiteDefault } from '../../../shared/styleConsts';
import CardNotification from '../../../components/CardNotification';
import HeaderProfessional from '../../../components/HeaderProfessional';
import style from './style';

export default function ProfessionalNotifications(props: any) {
  const { signOut, user } = useAuth();
  const { getProvedorNotificacoes } = useAPI();

  const [params] = useState<any>(props);
  const [notifications, setNotifications] = useState<NotificacaoOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getNotifications = () => {
    getProvedorNotificacoes()
    .then((result) => {
      setNotifications(result);
    })
    .catch((e) => {
      showMessage({
        message: 'Falha ao carregar notificações',
        type: 'danger'
      })
    })
  }

  const renderItem = (notification: NotificacaoOutput) => {
    return (
      <CardNotification
        message={notification.mensagem}
        client={notification.nomeCliente}
        date={notification.dtRegistro} />
    )
  }

  useEffect(() => {
    getNotifications();
  }, [params])

  return (
    <SafeAreaView style={style.container}>
      {notifications ? (
        <>
          {
            loading ?
              <ActivityIndicator size={70} color={blueDefault} style={style.loadingUpdate} />
              :
              <></>
          }
          <HeaderProfessional title={'Notificações'}
            defaultColor={params?.defaultColor}
            isProfessional
            isNotifications
            signOut={signOut} />
          <View style={style.contentContainer}>
            <Text style={style.nameProfessional}>{user?.name}</Text>
            <FlatList
              style={style.listContainer}
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </>
      ) : (<ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>)}
    </SafeAreaView>
  )
}