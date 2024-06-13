import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import style from './style';
import HeaderProfessional from '../HeaderProfessional';
import { whiteDefault } from '../../shared/styleConsts';
import { useAuth } from '../../contexts/auth';

export default function NotificationsProfessional(props: any) {
  const { signOut } = useAuth();

  const [params, setParams] = useState<any>(props);
  const [notifications, setNotifications] = useState<any>();

  const getNotifications = (id: number) => {
    setNotifications({
      professionalName: 'Marcio DME',
      notifications: [
        {
          client: 'Guilherme Customer',
          message: 'aaaaaaaaaaaaaaaa',
          date: '04/05/2024',
          image: require('../../assets/images/encanador.jpg'),
        },
        {
          client: 'Andrew Customer',
          message: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          date: '09/05/2024',
          image: require('../../assets/images/encanador.jpg'),
        },
        {
          client: 'Andrew Customer',
          message: 'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
          date: '09/05/2024',
          image: require('../../assets/images/encanador.jpg'),
        },
      ]
    }
    )
  }

  const renderItem = (review: any) => {
    return (
      <View style={style.cardReview}>
        <View style={style.imageContainer}>
          <Image style={style.image} source={review.image}></Image>
        </View>
        <View style={style.infoContainer}>
          <View style={style.cardHeader}>
            <Text style={style.nameClient}>{review.client}</Text>
            <Text style={style.date}>{review.date}</Text>
          </View>
          <Text style={style.message}>{review.message}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    getNotifications(params.id);
  }, [params])

  return (
    <SafeAreaView style={style.container}>
      {notifications ? (
        <>
          <HeaderProfessional title={'Notificações'}
            defaultColor={params?.defaultColor}
            isProfessional
            isNotifications 
            signOut={signOut}/>
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