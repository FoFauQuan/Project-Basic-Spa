import React, { useState, useEffect,Alert } from 'react';
import { Image, View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../src/index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address, hasErrorFullName, hasErrorEmail, hasErrorPassword, hasErrorPasswordConfirm]);

  const handleRegister = async () => {
    const role = "customer";

    try {
      const createdUser = await createAccount(email, password, fullName, phone, address, role);

      navigation.navigate("Login"); // Redirect to Login screen
    } catch (error) {
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20,justifyContent:'center' }}>
      <Text style={{
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#a81e9e",
        marginVertical:5
      }}> Register  </Text>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#a81e6a', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Full Name"}
        value={fullName}
        onChangeText={setFullname}
      />
      <HelperText type='error' visible={ hasErrorFullName()}>
        Full name không được phép để trống
      </HelperText>
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
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={ email.length > 0 &&hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
        <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#a81e6a', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon 
            icon ={showPassword? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      <HelperText type='error' visible={ password.length > 0 &&hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
        <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#a81e6a', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
          label={"Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon 
            icon ={showConfirmPassword? "eye-off" : "eye"}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
      <HelperText type='error' visible={ confirmPassword.length > 0 &&hasErrorPasswordConfirm()}>
        Confirm Password phải giống với Password
      </HelperText>
      <TextInput
        mode='outlined'
        cursorColor='pink'
        theme={{
          colors: {
            primary: '#a81e6a', // Màu viền khi được chọn
            underlineColor: 'transparent', // Màu gạch chân khi không được chọn
          },
        }}
        label={"Address"}
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20 }}
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
        label={"Phone"}
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 20 }}
      />
      <Button textColor='black' buttonColor='pink' mode='contained' onPress={handleRegister} disabled={disableCreate}>
        Create New Account
      </Button>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:15}}>Do you have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color:'#a81e9e',marginVertical:10,fontSize:15}}>
          Login Account
          </Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

export default Register;
