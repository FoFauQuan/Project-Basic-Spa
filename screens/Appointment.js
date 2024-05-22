import React, { useState } from "react"
import { View, Image,StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button, Text } from "react-native-paper"
import DatePicker from "react-native-date-picker"
import firestore from "@react-native-firebase/firestore"
import { useMyContextProvider } from "../src/index"

const Appointment = ({navigation, route }) => {
    const { service } = route.params || {};
    const [datetime, setDatetime] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller
    const APPOINTMENTs = firestore().collection("Appointments")

    const handleSubmit = () =>{
        APPOINTMENTs.add({
            email: userLogin.email,
            serviceId: service.id,
            serviceTitel:service.title,
            datetime,
            state: 'wait',
        })
        .then(r => 
            {
                APPOINTMENTs.doc(r.id).update({id: r.id})
                navigation.navigate("Appointments")
            })
    }
    return (
        <View style={{flex:1,padding:20,backgroundColor:'white'}}>
        <View style={{flex:1,backgroundColor:'#FAE7FD',padding:10}}>
            {service && service.image !== "" && (
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{ uri: service && service.image }}
                            style={{ height: 300, width: '100%' }}
                            resizeMode="contain"
                        />
                    </View>
                )}
            <View style={styles.row}>
                <Text style={styles.label}>Service name: </Text>
                <Text style={styles.text}>{service && service.title}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>CreateBy: </Text>
                <Text style={styles.text}>{service && service.create}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price: </Text>
                <Text style={styles.text}>{service && service.price} ₫</Text>
            </View>
            <DatePicker
                modal
                open={open}
                date={datetime}
                onConfirm={(date) => {
                    setOpen(false)
                    setDatetime(date)
                }}
                onCancel={()=>{
                    setOpen(false)
                }}
            />
            <TouchableOpacity
                onPress={()=> setOpen(true)}            
                style={styles.rowTouch}>
                <Text style={styles.labelTouch}>Choose date: </Text>
                <Text style={styles.text}>{datetime.toDateString()}</Text>
            </TouchableOpacity>
            <Button style={{margin: 10}} textColor="black" buttonColor="pink" mode="contained" onPress={handleSubmit}>  
                Đặt lịch
            </Button>
            </View>
        </View>
    )
}

export default Appointment;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignContent:'center',
        justifyContent:'center'
    },
    headerText: {
        padding: 15,
        fontSize: 35,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderWidth:0.5
    },
    rowTouch: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical:20

    },
    labelTouch:{
        fontSize: 20, 
        fontWeight: 'bold',
        color:'#EB6AB8'
    },
    text:{
         fontSize: 20
    },
    label:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})