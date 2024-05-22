import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const ServicesCustomer = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                const services = [];
                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setServices(services);
                setInitialServices(services);
            });

        return () => unsubscribe();
    }, []);

    const [name, setName] = useState('')
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleAppointment(item)}>
        <View style={{ 
                flexDirection: "row",
                alignContent:'center',
                justifyContent: "space-between", 
                paddingHorizontal: 15,
                borderWidth:0.3,
                borderRadius:5,
                margin:5,
                backgroundColor:"#FAE7FD",
                height:50
                }}>

            <Text style={{fontSize: 20, fontWeight: "bold",alignSelf:'center'}}>{item.title}</Text>
            <Text style={{fontSize: 20, fontWeight: "bold",alignSelf:'center'}}>{parseInt(item.price).toLocaleString('vi-VN')} ₫</Text>
        </View>
        </TouchableOpacity>

    );
    

    const handleAppointment = (service) => {
        navigation.navigate("Appointment", { service });
    }

    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
            <Image source={require("../assets/logolab3.png")}
                style={{
                    alignSelf: "center",
                    marginVertical: 50
                }}
            />
            <TextInput
                label={"Search by name"}
                value={name}
                mode="null"
                cursorColor='pink'
                theme={{
                  colors: {
                    primary: '#a81e6a', // Màu viền khi được chọn
                    underlineColor: 'transparent', // Màu gạch chân khi không được chọn
                  },
                }}
                style={{
                    margin:10,
                    backgroundColor:'#FDF2FC'
                }}
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
            />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    padding: 15,
                    fontSize: 25,
                    fontWeight: "bold",
                }}>
                    Danh sách dịch vụ</Text>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ServicesCustomer;
