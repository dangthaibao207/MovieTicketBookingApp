import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firebase } from '../firebase'
import { logo } from '../assets/movie-ticket-logo.jpg'

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const resetPassword = async () => {
        try {
            if (email) {
                await firebase.auth().sendPasswordResetEmail(email)
                    .then(() => {
                        Alert.alert('Thông Báo', 'Đã gửi link lấy lại mật khẩu tới email.', [
                            { text: 'OK', onPress: () => { } },
                        ]);
                    })
                    .catch((error) => {
                        alert(error.message); // Display the error message
                    });
            } else {
                Alert.alert('Thông Báo', 'Vui lòng nhập thông tin email cần lấy lại mật khẩu.', [
                    { text: 'OK', onPress: () => { } },
                ]);
            }
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: '#171722',
                alignItems: "center",
                justifyContent: "center"
            }}
        // style={styles.container}
        // behavior='padding'
        >
            <View style={styles.container}>
                <View style={{
                    width: "100%",
                    height: 250,

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
                        }}>THÔNG TIN ĐĂNG NHẬP</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
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
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => loginUser(email, password)}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                        style={[styles.buttonSignup]}
                    >
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={resetPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
            </View>




        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    inputContainer: {
        width: "70%",
    },
    input: {
        fontSize: 20,
        paddingBottom: 5,
        marginBottom: 30,
        color: '#707070',
        borderBottomWidth: 1,
        borderBottomColor: '#707070'
    },
    buttonContainer: {
        width: "65%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonLogin: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,

    },
    buttonSignup: {
        backgroundColor: '#17a2b8',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,

    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    forgotPasswordText: {
        fontSize: 18,
        color: '#707070',
        borderBottomWidth: 1,
        borderBottomColor: '#707070'
    }
})