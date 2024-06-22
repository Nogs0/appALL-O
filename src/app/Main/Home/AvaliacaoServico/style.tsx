import { StyleSheet } from "react-native";
import { blackDefault, greenDefault, greyDefault, orangeDefault, whiteDefault } from "../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: orangeDefault,
    },
    headerContainer: {
        backgroundColor: orangeDefault,
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    title: {
        textAlign: 'center',
        flex: 1,
        color: whiteDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 32,
    },
    goBack: {
        position: 'absolute',
        zIndex: 1,
        left: 10,
        bottom: '35%',
    },
    contentContainer: {
        height: '90%',
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imageContainer: {
        width: '100%',
        marginTop: '5%',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    starsContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descContainer: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textArea: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: greyDefault,
        width: '80%',
        height: '80%',
        color: blackDefault,
        fontFamily: 'Rubik-Light',
    },
    buttonAddImage: {
        backgroundColor: orangeDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 50,
        width: 50
    },
    button: {
        backgroundColor: greenDefault,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '5%'
    },
    imagesContainer: {
        flexDirection: 'row',
        marginTop: '5%',
        paddingHorizontal: '5%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: greyDefault,
        justifyContent: 'space-between',
        height: 120,
        width: '100%'
    }
})