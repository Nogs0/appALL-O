import { View, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import style from './style';
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion';
import { orangeDefault } from '../../shared/styleConsts';

export default function Mapa() {

  const [region, setRegion] = useState<Region | AnimatedMapRegion | undefined>();

  const [markers, setMarkers] = useState<[]>([]);

  useEffect(() => {
    getUserLocation()
  }, [])

  function getUserLocation() {
    Geolocation.getCurrentPosition((info) => {
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    }, () => console.log("erro"), {
      enableHighAccuracy: true
    })
  }

  return (
    <View style={style.container}>
      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(() => {
              console.log('Aceitou')
            })
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingEnabled={true}
        style={style.mapa}
        region={region}
      >
        {markers.map((marker) => {
          return (
            
          )
        })}
      </MapView>
    </View>
  )
}