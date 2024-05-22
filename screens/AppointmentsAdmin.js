import React, { useState, useEffect } from "react";
import { View, FlatList,TouchableOpacity, Alert } from "react-native";
import DatePicker from "react-native-date-picker"
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const AppointmentsAdmin = () => {
    const APPOINTMENTs = firestore().collection("Appointments")
    const [appointments, setAppointments] = useState([]);
    const [datetime, setDatetime] = useState(new Date())
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const unsubscribe = APPOINTMENTs
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                        email: documentSnapshot.data().email,
                        title:documentSnapshot.data().serviceTitel,
                        datetime: documentSnapshot.data().datetime.toDate(),
                        state:documentSnapshot.data().state,
                    });
                });
                setAppointments(appointmentsData);
            });

        return () => unsubscribe();
    }, []);
    const handleAccpet = (service) => {
        if(service.state == 'wait'){
        Alert.alert(
            "Warning",
            "Are you sure you want to cancel this service?",
            [
                {
                    text: "Back",
                    style: "cancel"
                },
                {
                    text: "Accept",
                    onPress: () => {
                        firestore()
                            .collection('Appointments')
                            .doc(service.id)
                            .update({
                                state: 'accept',
                            })
                            .then(() => {
                                console.log("Dịch vụ đã được chấp nhận thành công!");
                            })
                            .catch(error => {
                                console.error("Lỗi khi chấp nhận dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
        }
    }
    const handleCancel = (service) => {
        if(service.state == 'wait'){
        Alert.alert(
            "Warning",
            "Are you sure you want to accept this service? This operation cannot be returned",
            [
                {
                    text: "Back",
                    style: "cancel"
                },
                {
                    text: "Cancel",
                    onPress: () => {
                        firestore()
                            .collection('Appointments')
                            .doc(service.id)
                            .update({
                                state: 'cancel',
                            })
                            .then(() => {
                                console.log("Dịch vụ đã được hủy thành công!");
                            })
                            .catch(error => {
                                console.error("Lỗi khi hủy dịch vụ:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
        }
    }
    const displayText = (item) => {
        if (item === 'wait') {
            return { text: 'Accept', color: '#8EFCAC' };
        } else if (item === 'accept') {
            return { text: 'Have Accept', color: '#8EFCAC' };
        } else {
            return {text: 'Have Cancel',color: '#D0CAD4'};
        }
    };
    const renderItem = ({ item,index }) => (
        <View style={{ margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#FAE7FD' }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>STT: {index + 1}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Khách Hàng: {item.email}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Đã Chọn Dịch Vụ: {item.serviceTitel}</Text>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Đã Đặt lịch vào: {item.datetime.toDateString()}</Text>
            <TouchableOpacity 
                    style={{borderWidth:1,
                    flex:1, 
                    borderRadius:20,
                    backgroundColor: displayText(item.state).color,}} 
                    onPress={() => handleAccpet(item)}>
                <Text style={{alignSelf:'center',fontSize: 18}}>
                    {displayText(item.state).text}
                </Text>
            </TouchableOpacity>
            {item.state == 'wait' && (
            <TouchableOpacity 
                    style={{borderWidth:1,
                    flex:1, 
                    borderRadius:20,
                    backgroundColor:'#FCA5A5'}} 
                    onPress={() => handleCancel(item)}>
                <Text style={{alignSelf:'center',fontSize: 18}}>
                    Cancel
                </Text>
            </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold" }}>Appointments</Text>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default AppointmentsAdmin;
