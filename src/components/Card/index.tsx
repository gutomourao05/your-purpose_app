import { View, Text, ActivityIndicator } from "react-native"
import { styles } from "./styles"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDeletePurpose } from "../../http/hooks/purpose/useDeletePurpose"
import { useChangeStatusPurpose } from "../../http/hooks/purpose/useChangeStatusPurpose"
import { PurposeDto } from "../../http/dtos/Purposes/PurposeDto"
import { formatDateToBR } from "../../utils/formatDate"

type Props = {
    purpose: PurposeDto
}

const Card = (props: Props) => {
    const { deletePurpose, isDeletingPurpose, } = useDeletePurpose();
    const { changeStatusPurpose, isChangeStatusPurpose } = useChangeStatusPurpose();

    const isLoading = isDeletingPurpose || isChangeStatusPurpose


    const [datePart, timePartWithZone] = props.purpose?.endDate.split("T");
    const newDatePart = formatDateToBR(datePart);
    const timePart = timePartWithZone.replace("Z", "").split(":").slice(0, 2).join(":");

    return (
        <View style={props.purpose?.isActive ? styles.containerActive : styles.containerInactive} >
            {isLoading ? <ActivityIndicator color={'#000'} size={'large'} /> : (
                <>
                    <View style={styles.cardHeader}>
                        <Text>Nome: {props.purpose?.name}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => deletePurpose({
                            id: props.purpose?.id,
                            arrayNotification: props.purpose.notifications
                        })}>
                            <Ionicons size={24} name="trash-outline" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardBody}>
                    </View>

                    <View style={styles.cardFooter}>
                        <View>
                            <Text>Data Final: {newDatePart}</Text>
                            {props.purpose?.withAlert ? <Text>Alerta: {timePart}</Text> : null}
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={props.purpose?.isActive ? styles.activeButton : styles.inactiveButton} onPress={() => {
                            changeStatusPurpose({ id: props.purpose?.id, status: !props.purpose?.isActive })
                        }}>
                            <Text>{props.purpose?.isActive ? "Inativar" : "Ativar"}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    )
}

export { Card }