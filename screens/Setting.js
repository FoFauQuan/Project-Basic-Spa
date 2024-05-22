import {View,TouchableOpacity,Text} from "react-native"
import {Button} from "react-native-paper"
import { logout, useMyContextProvider } from "../src/index"
import { useEffect } from "react"

const Setting = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider();
    const {userLogin} = controller
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])

    const handleLogout = () => {
        logout(dispatch);
    };
    
    return(
        <View style={{ padding:5,flex:1,paddingTop:50,backgroundColor:'white'}}>
            <Text
            style={{
                alignSelf:'center',
                padding : 10,
                margin : 10,
                fontSize:30
            }}>
                SETTING
            </Text>
            <TouchableOpacity style={{
                borderBottomWidth : 0.5,
                padding : 10,
                margin : 10,
            }}>
                <Text>
                    Update Profile
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderBottomWidth : 0.5,
                padding : 10,
                margin : 10,
            }}>
                <Text >
                    Change Laguage
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderBottomWidth : 0.5,
                padding : 10,
                margin : 10,
            }}>
                <Text >
                    Change DarkMode
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderBottomWidth : 0.5,
                padding : 10,
                margin : 10,
            }}>
                <Text >
                    Keyboard Shortcut
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                borderBottomWidth : 0.5,
                padding : 10,
                margin : 10,
            }}>
                <Text >
                    Change Laguage
                </Text>
            </TouchableOpacity>
            <Button
                buttonColor="#FAE7FD"
                textColor="black"
                mode="contained"
                onPress={handleLogout}
            >
                Logout
            </Button>
        </View>
    )
}

export default Setting