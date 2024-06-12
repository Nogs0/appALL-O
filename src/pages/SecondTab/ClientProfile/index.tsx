import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Client, useAPI } from '../../../contexts/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style';
import { blackDefault, whiteDefault } from '../../../shared/styleConsts';
import { useAuth } from '../../../contexts/auth';

export default function ClientProfile(props: any) {

    const { signOut } = useAuth();
    const { getClient } = useAPI();
    const [client, setClient] = useState<Client>();

    useEffect(() => {
        getClient(props.id)
            .then((resolve) => {
                setClient(resolve as Client)
            })
    }, [props])

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={{ width: '80%', height: '10%', backgroundColor: whiteDefault, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => signOut()}>
                <Text style={{ color: blackDefault, fontSize: 50 }}>SAIR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}