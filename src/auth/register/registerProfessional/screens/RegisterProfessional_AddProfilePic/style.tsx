import { StyleSheet } from "react-native";
import { orangeDefault, whiteDefault, greyDefault, greyLoadingDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    textButtonAddImage: {
        color: whiteDefault,
        fontFamily: 'Rubik-SemiBold'
    },
    listContainer: {
        borderRadius: 10,
        borderColor: greyDefault,
        padding: 5,
        borderWidth: 3,
        height: 120,
        width: '100%'
    },
    profilePicture:{
        width: 80,
        height: 80,
        borderRadius: 50
    },
    imageContainer: {
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    loadingImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: greyLoadingDefault,
        position: 'absolute',
        zIndex: 1
    },
    noImage: {
        width: 150,
        height: 150,
        backgroundColor: greyDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
})