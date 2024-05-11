import React from 'react'
import { FlatList, View } from 'react-native'
import { ButtonFilterEnum } from '../../shared/Enums/enums'
import ButtonTab from '../ButtonTab'
import styles from './styles'
import { greyDefault, orangeDefault1, whiteDefault } from '../../shared/styleConsts'

type FilterProfessionsProps = {
    button: ButtonFilterEnum,
    onPress: any
}

export default function FilterProfessions(props: FilterProfessionsProps) {
    return (
        <View style={styles.container}>
            <ButtonTab backgroundColor={props.button == ButtonFilterEnum.nextToYou ? orangeDefault1 : whiteDefault} color={props.button == ButtonFilterEnum.nextToYou ? whiteDefault : greyDefault} width={'30%'} onPress={() => { props.onPress(ButtonFilterEnum.nextToYou) }} text={'Next to you'} />
            <ButtonTab backgroundColor={props.button == ButtonFilterEnum.bestRated ? orangeDefault1 : whiteDefault} color={props.button == ButtonFilterEnum.bestRated ? whiteDefault : greyDefault} width={'30%'} onPress={() => { props.onPress(ButtonFilterEnum.bestRated) }} text={'Best rated'} />
            <ButtonTab backgroundColor={props.button == ButtonFilterEnum.recognized ? orangeDefault1 : whiteDefault} color={props.button == ButtonFilterEnum.recognized ? whiteDefault : greyDefault} width={'30%'} onPress={() => { props.onPress(ButtonFilterEnum.recognized) }} text={'Recognized'} />
        </View>
    )
}