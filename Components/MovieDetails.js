import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, LinearGradient } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Ionic from 'react-native-vector-icons/Ionicons'

const MovieDetails = ({route}) => {
    const navigation = useNavigation();
    const ticketBoughtCheck = false;
    const {movieId, name, image, imdbPoint, year, timeLength, category} = route.params;

    useEffect(() => {
        console.log('useEffect movie details has been called!');
    });

    const getYear = (date) => {
        console.log(date)
        // const [month, day, year] = date.split('/');
    
        // return year;
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionic name="chevron-back" style={{ color: "#fff", fontSize: 18, zIndex: 10 }} />
                </TouchableOpacity>

                <Text style={styles.navBarText}>
                    Chi Tiết Phim
                </Text>
            </View>

            <View style={styles.Content}>
                <View style={styles.imageContent}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: image
                        }}
                    />
                </View>
                <Text style={styles.textContent}>
                    {name}
                </Text>
                <View style={styles.movieDetailsContent}>
                    <Text style={styles.movieDetailsText}>{year}</Text>
                    <Text style={styles.movieDetailsText}>{category.name}</Text>
                    <Text style={styles.movieDetailsText}>{timeLength}</Text>
                </View>
                <View>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 30 }}>
                        IMDB {imdbPoint}
                    </Text>
                </View>
                <View style={styles.buyButton}>
                    <TouchableOpacity 
                        // activeOpacity={0.2}
                        onPress={() => {navigation.navigate("DateTime", {
                            movieId: movieId,
                            movieName: name,
                            movieImage: image
                        })}}
                        style={{
                            width: "100%",
                            backgroundColor: "red",
                            paddingVertical: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 4,
                            position: "relative"
                        }}
                    >
                        <View
                            style={{
                                width: 20,
                                aspectRatio: 1/1,
                                borderRadius: 100,
                                backgroundColor: "#171722",
                                position: "absolute",
                                top: "50%",
                                left: -12
                            }}
                        ></View>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Mua Vé</Text>
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 100,
                                backgroundColor: "#171722",
                                position: "absolute",
                                top: "50%",
                                right: -12
                            }}
                        ></View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.backgroundCover}>
                    <Image 
                        style={styles.backgroundCoverImage}
                        source={{
                            uri: image
                        }}
                    />
            </View>
        </SafeAreaView>

    )
}

export default MovieDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171722',
        width: '100%',
        height: '100%',
    },
    navBar: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    navBarText: {
        color: "white",
        marginLeft: "16%",
        fontSize: 32,
        fontWeight: "bold"
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: "#262532",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonItem: {
        fontSize: 18,
        color: "#fff"
    },
    Content: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    imageContent: {
        width: "75%",
        height: 450,
        borderRadius: 50,
        backgroundColor: "#ffffff20"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        resizeMode: "cover",
    },
    textContent: {
        maxWidth: "65%",
        marginVertical: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    movieDetailsContent: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "60%",
        marginBottom: 20,
    },
    movieDetailsText: {
        fontSize: 16,
        color: "#ffffff",
        opacity: 0.4,
    },
    buyButton: {
        width: "50%",
        // height: 40,
        // backgroundColor: "red",
        alignItems: "center",
        // justifyContent: "center",
    },
    backgroundCover:{ 
        width: "100%",
        height: "50%",
        position: "absolute",
        zIndex: -1,
        opacity: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    backgroundCoverImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        opacity: 0.2
    },
})