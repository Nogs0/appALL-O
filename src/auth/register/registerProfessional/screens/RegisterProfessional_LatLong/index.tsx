import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import AnimatedMapRegion from 'react-native-maps/lib/AnimatedRegion'
import HeaderRegisterProfessional from '../../../../../components/HeaderRegisterProfessional'
import { useRegisterProfessional } from '../../../../../contexts/registerProfessional'
import styleRegister from '../../style'
import style from './style'

export default function RegisterProfessional_LatLong({ navigation }: any) {

    const { profissional } = useRegisterProfessional();
    
    const [region, setRegion] = useState<Region | AnimatedMapRegion | undefined>();
    const [coordinate, setCoordinate] = useState<LatLng>({
        latitude: profissional ? Number(profissional.provedor.enderecoInput.latitude) : -21.7883,
        longitude: profissional ? Number(profissional.provedor.enderecoInput.longitude) : -46.5625,
    });

    useEffect(() => {
        console.log(profissional)
        setRegion({
            latitude: profissional ? Number(profissional.provedor.enderecoInput.latitude) : -21.7883,
            longitude: profissional ? Number(profissional.provedor.enderecoInput.longitude) : -46.5625,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }, [])

    const handleButtonNext = () => {
        navigation.navigate('RegisterProfessional_Contact');
    }

    return (
        <SafeAreaView style={styleRegister.defaultContainer}>
            <HeaderRegisterProfessional navigation={navigation} />
            <View style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                height: '60%',
                top: '20%',
            }}>
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
                    onPress={(event) => setCoordinate(event.nativeEvent.coordinate)}
                >
                    <Marker
                        coordinate={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude
                        }}
                    />
                </MapView>
                <TouchableOpacity
                    style={styleRegister.buttonNext} onPress={() => handleButtonNext()}>
                    <Text style={styleRegister.textButtonNext}>Confirmar localização</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}