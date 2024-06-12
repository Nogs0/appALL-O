import React from 'react'
import { View } from 'react-native'
import { ButtonFilterEnumReviews } from '../../shared/Enums/enums'
import { greyDefault, whiteDefault } from '../../shared/styleConsts'
import ButtonTab from '../ButtonTab'
import style from './style'

export default function FilterReviews(props: any) {
    return (
        <View style={style.container}>
            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.date ? props.defaultColor : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.date ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.date ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.date) }} text={'Data'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.bestRated ? props.defaultColor : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.bestRated ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.bestRated ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.bestRated) }} text={'Melhores'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.worseRated ? props.defaultColor : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.worseRated ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.worseRated ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.worseRated) }} text={'Piores'} />
        </View>
    )
}