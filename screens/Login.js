import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useMyContextProvider, login } from '../src/index';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password, hasErrorEmail, hasErrorPassword]);

  const handleLogin = () => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate("Admin")
      else if (userLogin.role === "customer")
        navigation.navigate("Customer")
    }
  }, [userLogin])

  return (
    <View style={{ flex: 1,justifyContent:'center',padding:25}}>
      <Image source={require("../assets/logolab3.png")}
          style={{
              alignSelf: "center",
              marginBottom:50
          }}
      />
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#a81e6a', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Email"}
        placeholder='Nhập Email'
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={email.length > 0 && hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
        <TextInput
          mode='outlined'
          theme={{
            colors: {
              primary: '#a81e6a', // Màu viền khi được chọn
              underlineColor: 'transparent', // Màu gạch chân khi không được chọn
            },
          }}
          cursorColor='pink'
          label={"Password"}
          placeholder='Nhập Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}

          right={
            <TextInput.Icon 
            icon ={showPassword? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
            />}
        />
      <HelperText type='error' visible={password.length > 0 && hasErrorPassword()}>
        Password có ít nhất 6 ký tự
      </HelperText>
      <Button mode='contained' textColor='black' buttonColor='pink' onPress={handleLogin} disabled={disableLogin}>
        Login
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:15}}>Dont have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{color:'#a81e9e',marginVertical:10,fontSize:15}}>
           Create new account
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{color:'#a81e9e',fontSize:15}}>
          Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
