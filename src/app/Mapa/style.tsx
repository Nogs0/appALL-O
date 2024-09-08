import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('screen')

export default StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center'
    },
    mapa: {
        width: '100%', 
        height: '100%'
    }
})