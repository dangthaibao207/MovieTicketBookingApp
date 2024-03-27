import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../firebase';
import axios from 'axios'


const Signup = ({ route }) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phonenum, setPhonenum] = useState('')

    const handleSignUp = async () => {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
                signUp();
            })
            .catch(error => console.log(error.message))
    }

    const signUp = async () => {
        let data = JSON.stringify({
            "name": name,
            "email": email,
            "phoneNumber": phonenum
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:8000/user/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1,
                backgroundColor: '#171722',
                alignItems: "center",
                justifyContent:"center"
            }}>
            <SafeAreaView style={styles.container}>
                <View style={{
                    position: "absolute",
                    top: -90,
                    left: -5
                }}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Ionic name="chevron-back" style={styles.backButtonItem} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    width: "100%",
                    height: 250,
                    // marginTop: 50,
                    marginBottom: 100,
                }}>
                    <View style={{
                        alignItems: "center"
                    }}>
                        <Image style={{
                            width: "70%",
                            height: "100%",
                            borderRadius: 30,
                        }}
                            source={require('../assets/15945.jpg')}
                        />
                    </View>
                    <View style={{
                        alignItems: "center",
                        marginTop: 30,
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 32,
                            fontWeight: "bold"
                        }}>THÔNG TIN ĐĂNG KÝ</Text>
                    </View>
                </View>



                <View style={styles.inputContainer}>
                    {/* <TextInput
                    placeholder='Tài Khoản'
                    placeholderTextColor="#707070"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.input} /> */}
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor="#707070"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />
                    <TextInput
                        placeholder='Mật khẩu'
                        placeholderTextColor="#707070"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input} secureTextEntry />
                    <TextInput
                        placeholder='Tên'
                        placeholderTextColor="#707070"
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input} />
                    <TextInput
                        placeholder='Số điện thoại'
                        placeholderTextColor="#707070"
                        value={phonenum}
                        onChangeText={text => setPhonenum(text)}
                        style={styles.input} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button]}
                    >
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
        </KeyboardAvoidingView>

    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    backButton: {
        width: 40,
        height: 40,
        margin: 20,
        backgroundColor: "#262532",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonItem: {
        fontSize: 18,
        color: "#fff"
    },
    inputContainer: {
        alignItems: 'center',
    },
    input: {
        width: "70%",
        fontSize: 20,
        paddingBottom: 5,
        marginBottom: 30,
        color: '#707070',
        borderBottomWidth: 1,
        borderBottomColor: '#707070'
    },
    buttonContainer: {

        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#17a2b8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,

    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})