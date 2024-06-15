import { StyleSheet } from "react-native";
import { whiteDefault, orangeDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
        top: '20%',
        width: '100%'
    },
    defaultContainer: {
        flex: 1,
        alignItems: 'center',
    },
    defaultContentContainer: {
        position: 'absolute',
        width: '80%',
        top: '25%',
        padding: '5%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 24,
        fontFamily: 'Rubik-SemiBold',
        textAlign: 'center'
    },
    text: {
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 20,
        fontFamily: 'Rubik-Light',
        textAlign: 'center'
    },
    buttonNext: {
        width: '100%',
        marginTop: '10%',
        padding: '3%',
        backgroundColor: orangeDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonNext: {
        fontFamily: 'Rubik-SemiBold',
        color: whiteDefault,
        fontSize: 14
    },
    inputsContainer: {
        width: '100%',
    },
    subTitle:{
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 14,
        fontFamily: 'Rubik-Light',
        textAlign: 'center'
    }
})