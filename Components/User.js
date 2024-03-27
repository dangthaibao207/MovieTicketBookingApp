import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, LinearGradient, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons'
// import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { firebase } from '../firebase';

const User = () => {

    const handleSignOut = async () => {
        try {
            await firebase.auth()
                .signOut()
                .then(() => console.log('User signed out!'));
        } catch (error) {
            alert(error.message)
        }
    }

    const resetPassword = async () => {
        try {
            if (email) {
                await firebase.auth().sendPasswordResetEmail(email)
                    .then(() => {
                        alert("Password reset email sent");
                    })
                    .catch((error) => {
                        alert(error.message); // Display the error message
                    });
            } else {
                alert("No user is currently signed in");
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>

                <Text style={styles.navBarText}>
                    Thông Tin Tài Khoản
                </Text>
            </View>

            <View style={{
                width: "100%",
                height: "85%",
                alignItems: "center"
            }}>
                <View style={styles.textWrap}>
                    <Text style={styles.text}>Tên người dùng</Text>
                    {/* <Text style={styles.text}>{account?.name}</Text> */}
                    <Text style={styles.text}>{global.myvar.name}</Text>
                </View>

                <View style={styles.textWrap}>
                    <Text style={styles.text}>Số điện thoại</Text>
                    <Text style={styles.text}>{global.myvar.phoneNumber}</Text>
                    {/* <Text style={styles.text}>{account?.phoneNumber}</Text> */}
                </View>

                <View style={styles.textWrap}>
                    <Text style={styles.text}>Email</Text>
                    <Text style={styles.text}>{global.myvar.email}</Text>
                    {/* <Text style={styles.text}>{account?.email}</Text> */}
                </View>

                <View style={{
                    width: "80%",
                    height: 60,
                    backgroundColor: "#F92121",
                    borderRadius: 100,
                    position: "absolute",
                    bottom: 60
                }}>
                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Ionic name="log-out-outline" style={{ color: "#fff", fontSize: 42, zIndex: 10 }} />

                            <Text style={{
                                color: "white",
                                fontSize: 28,
                                fontWeight: "bold",
                                marginLeft: 10
                            }}>Đăng Xuất</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171722',
        width: '100%',
        height: '100%',
    },
    navBar: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    navBarText: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 50,
    },
    textWrap: {
        width: "95%",
        backgroundColor: "#1F1A30",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        borderRadius: 10,
        marginBottom: 30,
    },
    text: {
        color: "white",
        fontSize: 20,
        marginHorizontal: 10
    }
})