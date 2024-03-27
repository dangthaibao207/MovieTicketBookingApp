import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'


const DateTime = ({ route }) => {
    const navigation = useNavigation()
    const { movieId, movieName, movieImage } = route.params;
    const [films, setFilms] = useState([
        // {
        //     Date: '15/04/2023',
        //     Time: '07:00',
        //     AvailableSeats: '03',
        // },
        // {
        //     Date: '15/04/2023',
        //     Time: '07:30',
        //     AvailableSeats: '23',
        // },
        // {
        //     Date: '15/04/2023',
        //     Time: '08:00',
        //     AvailableSeats: '30',
        // },
        // {
        //     Date: '15/04/2023',
        //     Time: '08:30',
        //     AvailableSeats: '30',
        // }
    ])

    useEffect(() => {
        console.log('useEffect has been called!');
        getXuatChieuById();
      },[]);

    const getXuatChieuById = async () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:8000/xuatchieu/' + movieId,
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setFilms(response.data);
                for(let i = 0; i<films.length; i++){
                    console.log(films[i]);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    };

    

    function checkAvailable (elements) {
        let AvailableSeats = 0;
        for(let i = 0; i < elements.length; i++) {
          if (elements[i].Status == "white" || elements[i].Status == "yellow") {
            AvailableSeats++;
          }
        }
        return AvailableSeats;
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
                    Xuất Chiếu
                </Text>

                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text style={styles.text}>
                            Ngày chiếu
                        </Text>
                        <Text style={styles.text}>
                            Giờ chiếu
                        </Text>
                        <Text style={styles.text}>
                            Ghế còn
                        </Text>

                    </View>
                    {/* <TouchableOpacity
                        style={styles.pickButton}
                        // onPress={() => navigation.goBack()}
                >
                    <View>
                        <Text style={styles.text}>
                            Chọn ghế
                        </Text>
                    </View>
                </TouchableOpacity> */}
                    <View style={styles.hr} />


                    <FlatList
                        // horizontal={true}
                        data={films}
                        keyExtractor={item => item.time}
                        renderItem={({ item }) => {
                            return <View style={styles.xuatChieu}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                    marginRight: 50,
                                }}>
                                    {item.date}
                                </Text>

                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                    marginRight: 70,
                                }}>
                                    {item.time}
                                </Text>

                                <Text style={{
                                    color: "white",
                                    fontSize: 16,
                                    marginRight: 24,
                                }}>
                                    {checkAvailable(item.seat)}
                                </Text>

                                <TouchableOpacity
                                    style={styles.pickButton}
                                    onPress={() => {navigation.navigate("SeatsPick", {
                                        movieId: movieId,
                                        movieName: movieName,
                                        movieImage: movieImage,
                                        xuatChieuId: item._id,
                                        xuatChieuDate: item.date,
                                        xuatChieuTime: item.time,
                                        seat: item.seat,
                                    })}}
                                >
                                    <View>
                                        <Text style={styles.text}>
                                            Chọn ghế
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        }}
                    >
                    </FlatList>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default DateTime

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171722',
        width: '100%',
        height: '100%',
    },
    navBar: {
        padding: 20,
    },
    navBarText: {
        color: "white",
        marginTop: 54,
        marginBottom: 10,
        fontSize: 36,
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
    content: {
        width: "100%",
        height: 100,
        // backgroundColor: "red"
    },
    text: {
        fontSize: 18,
        color: "white"
    },
    title: {
        width: "78%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    content: {
        // flexDirection: "row",
        // justifyContent: "space-between"
    },
    pickButton: {
        width: 82,
        height: 32,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    hr: {
        marginTop: 10,
        borderBottomColor: '#707070',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 2,
    },
    xuatChieu: {
        height: 60,
        width: "100%",
        // justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: '#707070',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 2,
    },
})