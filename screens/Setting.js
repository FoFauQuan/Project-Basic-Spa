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
        <View style={{ padding:10,flex:1,paddingTop:50,backgroundColor:'#FAE7FD'}}>
            <Text
            style={{
                alignSelf:'center',
                padding : 10,
                margin : 20,
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
            <Button
                buttonColor="#FCA5A5"
                textColor="black"
                mode="contained"
                onPress={handleLogout}
                style={{
                    margin : 10,
                }}
            >
                Logout
            </Button>
        </View>
    )
}

export default Setting