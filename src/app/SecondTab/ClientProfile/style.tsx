import { StyleSheet } from "react-native";
import { orangeDefault, greyDefault, greyLoadingDefault, whiteDefault, blackDefault } from "../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: orangeDefault,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
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
    imageFlatList: {
        width: 130,
        height: 130,
    },
    noImage: {
        width: 150,
        height: 150,
        backgroundColor: greyDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
       
    },
    noImageText: {
        color: blackDefault, 
        fontFamily: 'Rubik-Light', 
        fontSize: 15,
        textAlign: 'center',
        display: 'flex'
        
    },
    inputsContainer: {
        marginTop: '20%'
    },
    inputsContainerAddress: {
        position: 'absolute',
        top: '15%',
        width: '90%',
        height: '70%',
        paddingHorizontal: '5%',
    },
    inputsContainerInformations: {
        top: '15%',
        width: '90%',
        height: '70%',
        paddingHorizontal: '5%',
        position: 'absolute'
    },
    buttonUpdate: {
        backgroundColor: orangeDefault,
        width: '60%',
        height: 30,
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center',
        marginRight: '4%'
    },
    buttonSignOut: {
        backgroundColor: blackDefault,
        width: '20%',
        height: 30,
        alignItems: 'center',
        borderRadius: 10,
        textAlign: 'center'
    },
    bottomContainer:{
        flexDirection: 'row',
        marginBottom: '5%',
        justifyContent: 'space-between',
        backgroundColor: whiteDefault,
        
    },
    buttonAddImage: {
        backgroundColor: orangeDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: '5%',
        height: 70,
        width: 70
    },
    imageGridContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsContainer: {
        width: '100%',
        height: 70,
        backgroundColor: whiteDefault,
        borderBottomColor: orangeDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center'
    },
    tab: {
        borderRadius: 50,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    loadingUpdate: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: greyLoadingDefault 
    },
    loadingCEP: {
        position: 'absolute',
        zIndex: 10,
        top: '30%',
        left: '40%'
    },
})