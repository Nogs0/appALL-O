import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Client, useAPI } from '../../../contexts/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import style from './style';

export default function ClientProfile(props: any) {

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

        </SafeAreaView>
    )
}