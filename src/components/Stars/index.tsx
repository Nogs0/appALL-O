import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';

export default function Stars({ rate }: any) {
    const [estrelas, setEstrelas] = useState<number>(rate);
    const [loading, setLoading] = useState<boolean>(true);
    const [icons, setIcons] = useState<string[]>([]);

    const getStars = () => {
        let i = 0;
        let a = estrelas % 1;
        for (i = 1; i <= 5; i++) {
            if (i <= estrelas) {
                let list = icons;
                list.push('star');
                setIcons(list);
            } else if (a > 0) {
                let list = icons;
                list.push('star-half-full');
                setIcons(list);
                a = 0;
            } else {
                let list = icons;
                list.push('star-outline');
                setIcons(list);
            }
        }
    };

    useEffect(() => {
        getStars();
        setLoading(false);
    }, [estrelas])

    return (
        <>
            {
                !loading ? (
                    <View style={style.container}>
                        <Icon name={icons[0]} size={20} color={'yellow'}></Icon>
                        <Icon name={icons[1]} size={20} color={'yellow'}></Icon>
                        <Icon name={icons[2]} size={20} color={'yellow'}></Icon>
                        <Icon name={icons[3]} size={20} color={'yellow'}></Icon>
                        <Icon name={icons[4]} size={20} color={'yellow'}></Icon>
                    </View>
                ) : (<></>)
            }
        </>
    )
}