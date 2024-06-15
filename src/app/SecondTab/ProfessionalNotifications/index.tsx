import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useAPI } from '../../../contexts/api';
import { useAuth } from '../../../contexts/auth';
import { blueDefault, whiteDefault } from '../../../shared/styleConsts';
import CardNotification from '../../../components/CardNotification';
import HeaderProfessional from '../../../components/HeaderProfessional';
import style from './style';

export default function ProfessionalNotifications(props: any) {
  const { signOut } = useAuth();
  const { updateSeenNotification } = useAPI();

  const [params, setParams] = useState<any>(props);
  const [notifications, setNotifications] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getNotifications = (id: number) => {
    setNotifications({
      professionalName: 'Marcio DME',
      notifications: [
        {
          client: 'Guilherme Customer',
          message: 'aaaaaaaaaaaaaaaa',
          date: '04/05/2024',
          image: require('../../../assets/images/encanador.jpg'),
          seen: false
        },
        {
          client: 'Andrew Customer',
          message: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          date: '09/05/2024',
          image: require('../../../assets/images/encanador.jpg'),
          seen: false
        },
        {
          client: 'Andrew Customer',
          message: 'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
          date: '09/05/2024',
          image: require('../../../assets/images/encanador.jpg'),
          seen: false
        },
      ]
    }
    )
  }

  const renderItem = (notification: any) => {
    return (
      <CardNotification
        message={notification.message}
        client={notification.client}
        date={notification.date}
        image={notification.image}
        seen={notification.seen}
        setSeenCallback={() => handleSeenNotification(notification.id)} />
    )
  }

  const handleSeenNotification = (id: number) => {
    setLoading(true)
    updateSeenNotification(id)
      .then((response) => {
        getNotifications(id);
      })
      .catch((e) => {
        showMessage({
          message: 'Erro ao visualizar notificação!',
          type: 'danger'
        })
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getNotifications(params.id);
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
            <Text style={style.nameProfessional}>{notifications.professionalName}</Text>
            <FlatList
              style={style.listContainer}
              data={notifications.notifications}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </>
      ) : (<ActivityIndicator size={70} color={whiteDefault}></ActivityIndicator>)}
    </SafeAreaView>
  )
}