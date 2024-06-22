import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import style from './style'
import { toLinearSpace } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { whiteDefault } from "../../shared/styleConsts";

export default function WhatsappButton(props: any){
    return(
        <TouchableOpacity style={style.WhatsappContainer} onPress={props.onPress}>
            <Icon name={"whatsapp"} size={25} color={whiteDefault} style={{marginRight: 5}}></Icon>
            <Text style={style.WhatsappButton}>{props.telefone}</Text>
        </TouchableOpacity>
    )
}