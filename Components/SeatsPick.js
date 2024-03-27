import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionic from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Loader from './LoadingScreen'


// const Seats = [
//     { Name: 'A1', Status: 'white', },
//     { Name: 'A2', Status: 'white', },
//     { Name: 'A3', Status: 'white', },
//     { Name: 'A4', Status: 'white', },
//     { Name: 'A5', Status: 'white', },
//     { Name: 'A6', Status: 'white', },
//     { Name: 'A7', Status: 'white', },
//     { Name: 'A8', Status: 'white', },
//     { Name: 'A9', Status: 'white', },
//     { Name: 'A10', Status: 'white', },
//     { Name: 'B1', Status: 'white', },
//     { Name: 'B2', Status: 'white', },
//     { Name: 'B3', Status: 'white', },
//     { Name: 'B4', Status: 'white', },
//     { Name: 'B5', Status: 'white', },
//     { Name: 'B6', Status: 'white', },
//     { Name: 'B7', Status: 'white', },
//     { Name: 'B8', Status: 'white', },
//     { Name: 'B9', Status: 'white', },
//     { Name: 'B10', Status: 'white', },
//     { Name: 'C1', Status: 'white', },
//     { Name: 'C2', Status: 'white', },
//     { Name: 'C3', Status: 'red', },
//     { Name: 'C4', Status: 'white', },
//     { Name: 'C5', Status: 'white', },
//     { Name: 'C6', Status: 'white', },
//     { Name: 'C7', Status: 'white', },
//     { Name: 'C8', Status: 'white', },
//     { Name: 'C9', Status: 'white', },
//     { Name: 'C10', Status: 'white', },
//     { Name: 'D1', Status: 'white', },
//     { Name: 'D2', Status: 'white', },
//     { Name: 'D3', Status: 'white', },
//     { Name: 'D4', Status: 'white', },
//     { Name: 'D5', Status: 'white', },
//     { Name: 'D6', Status: 'white', },
//     { Name: 'D7', Status: 'white', },
//     { Name: 'D8', Status: 'white', },
//     { Name: 'D9', Status: 'white', },
//     { Name: 'D10', Status: 'white', },
//     { Name: 'E1', Status: 'white', },
//     { Name: 'E2', Status: 'white', },
//     { Name: 'E3', Status: 'white', },
//     { Name: 'E4', Status: 'white', },
//     { Name: 'E5', Status: 'white', },
//     { Name: 'E6', Status: 'white', },
//     { Name: 'E7', Status: 'white', },
//     { Name: 'E8', Status: 'white', },
//     { Name: 'E9', Status: 'white', },
//     { Name: 'E10', Status: 'white', },
//     { Name: 'F1', Status: 'white', },
//     { Name: 'F2', Status: 'white', },
//     { Name: 'F3', Status: 'red', },
//     { Name: 'F4', Status: 'white', },
//     { Name: 'F5', Status: 'white', },
//     { Name: 'F6', Status: 'white', },
//     { Name: 'F7', Status: 'white', },
//     { Name: 'F8', Status: 'blue', },
//     { Name: 'F9', Status: 'white', },
//     { Name: 'F10', Status: 'white', },
//     { Name: 'G1', Status: 'yellow', },
//     { Name: 'G2', Status: 'yellow', },
//     { Name: 'G3', Status: 'yellow', },
//     { Name: 'G4', Status: 'yellow', },
//     { Name: 'G5', Status: 'yellow', },
// ]

const SeatsPick = ({ route }) => {
    const navigation = useNavigation();
    const { movieId, movieName, movieImage, xuatChieuId, xuatChieuDate, xuatChieuTime, seat } = route.params; // ID xuat chieu
    const json = JSON.stringify(seat);
    const [isLoading, setIsLoading] = useState(false);

    const [seats, setSeats] = useState(JSON.parse(json));
    const temp = [];

    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('useEffect seat pick has been called!');

    });

    const renderItem = ({ item, index }) => {
        return <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'column',
            margin: 3,
            // backgroundColor: "white",
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: item.Status,
            alignItems: "center",
            justifyContent: "center",

        }}
            onPress={() => {
                if (item.Status == 'white') {
                    pickSeat(item, 'blue');
                } else if (item.Status == 'blue') {
                    if (item.Name.includes("G")) {
                        pickSeat(item, 'yellow');
                    } else {
                        unPick(item);
                    }
                } else if (item.Status == 'red') {
                    Alert.alert('Thông báo!!!', 'Ghế đã đặt vui lòng không chọn', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                } else {
                    if (item.Status == 'blue') {
                        pickSeat(item, 'yellow')
                    } else if (item.Status == 'red') {
                        Alert.alert('Thông báo!!!', 'Ghế đã đặt vui lòng không chọn', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    } else if (item.Status == 'yellow') {
                        pickSeat(item, 'blue');
                    }
                }
            }}
        >
            <View style={{
            }}>
                <Text>
                    {item.Name}
                </Text>
            </View>
        </TouchableOpacity>
    }

    // const pickSeat = (item, color) => {
    //     seats.map(i => {
    //         if (item.Name == i.Name) {
    //             i.Status = color
    //             temp.push(i);
    //             setCart(cart => [...cart, i]);
    //         } else {
    //             temp.push(i);
    //         }
    //     })
    //     // console.log(cart)
    //     setSeats(temp)
    // }

    const pickSeat = (item, color) => {
        
        const index = seats.findIndex((i) => item.Name === i.Name);

        if (index !== -1) {
            const currentSeat = seats[index];

            if (!cart.length) {
                // If the cart is empty, add the first seat without any condition
                currentSeat.Status = color;
                setCart([...cart, currentSeat]);
                setSeats([...seats]);
            } else {
                const isAdjacentToAny = cart.some((selectedSeat) => Math.abs(index - seats.findIndex((i) => selectedSeat.Name === i.Name)) === 1);

                if (isAdjacentToAny) {
                    currentSeat.Status = color;
                    setCart([...cart, currentSeat]);

                    setSeats([...seats]);
                } else {
                    // Display an error message if the condition is not met
                    Alert.alert(
                        'Thông báo!!!',
                        'Vui lòng chọn ghế kế bên ghế đã chọn trước đó.',
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                    );
                }
            }
        }
    }


    const unPick = (item) => {
        // console.log(cart);
        seats.map((i, index) => {
            if (item.Name == i.Name) {
                i.Status = 'white'
                temp.push(i);
                setCart(cart.filter(c => c.Name !== i.Name));
            } else {
                temp.push(i);
            }
        })
        setSeats(temp)
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* <Loader visible={isLoading} /> */}
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionic name="chevron-back" style={{ color: "#fff", fontSize: 18, zIndex: 10 }} />
                </TouchableOpacity>

                <View style={styles.Screen}>
                    <View style={styles.ScreenText}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: "bold",
                        }}>
                            Màn Hình
                        </Text>
                    </View>
                </View>

                <View style={{
                    marginBottom: 50
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            flex: 1,
                            height: 3,
                            backgroundColor: 'white',

                        }} />
                        <Ionic name="arrow-down-outline"
                            style={{
                                color: "#fff",
                                fontSize: 48,
                                zIndex: 10,
                                position: "absolute",
                                top: 4,
                                left: -22,

                            }} />
                        <View>
                            <Text style={{
                                width: 80,
                                textAlign: 'center',
                                color: "white",
                                fontSize: 24
                            }}>
                                Lối đi
                            </Text>

                        </View>
                        <View style={{
                            flex: 1,
                            height: 3,
                            backgroundColor: 'white'
                        }} />
                        <Ionic name="arrow-down-outline"
                            style={{
                                color: "#fff",
                                fontSize: 48,
                                zIndex: 10,
                                position: "absolute",
                                top: 4,
                                right: -22,

                            }} />
                    </View>
                </View>


            </View>

            <View style={{
                width: "100%",
                paddingHorizontal: 5
            }}>
                <FlatList
                    // horizontal={true}
                    data={seats}
                    numColumns={10}
                    keyExtractor={(item) => item.Name}
                    renderItem={renderItem}
                >
                </FlatList>
            </View>

            <View style={{
                marginTop: 30,
                height: 100,
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    width: "70%",
                    flexDirection: "row"
                }}>
                    <View style={
                        {
                            // backgroundColor: "red",
                            flex: 1,
                            height: 100
                        }
                    }>
                        <View style={{
                            // height: 100,
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                height: 32,
                                width: 32,
                                borderRadius: 8,
                                backgroundColor: "red"
                            }} />
                            <Text style={{
                                color: "white",
                                marginLeft: 10,
                                fontSize: 18
                            }}>Đã đặt</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                height: 32,
                                width: 32,
                                borderRadius: 8,
                                backgroundColor: "blue"
                            }} />
                            <Text style={{
                                color: "white",
                                marginLeft: 10,
                                fontSize: 18
                            }}>Đang chọn</Text>
                        </View>
                    </View>
                    <View style={{
                        // backgroundColor: "white",
                        flex: 1,
                        height: 100
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                height: 32,
                                width: 32,
                                borderRadius: 8,
                                backgroundColor: "white"
                            }} />
                            <Text style={{
                                color: "white",
                                marginLeft: 10,
                                fontSize: 18
                            }}>Ghế trống</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{
                                height: 32,
                                width: 32,
                                borderRadius: 8,
                                backgroundColor: "yellow"
                            }} />
                            <Text style={{
                                color: "white",
                                marginLeft: 10,
                                fontSize: 18
                            }}>Ghế đôi</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{
                width: "100%",
                marginTop: 20,
                height: 40,
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}>
                <TouchableOpacity style={{
                    width: "40%",
                    backgroundColor: "#53F25D",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                }}
                    onPress={() => {
                        if (cart.length != 0) {
                            navigation.navigate("Payment", {
                                movieId: movieId,
                                movieName: movieName,
                                movieImage: movieImage,
                                xuatChieuId: xuatChieuId,
                                xuatChieuDate: xuatChieuDate,
                                xuatChieuTime: xuatChieuTime,
                                cart: cart,
                            })
                        } else {
                            Alert.alert('Thông báo', 'Vui lòng chọn ghế muốn đặt.', [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                        }

                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thanh Toán</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: "40%",
                    backgroundColor: "#FE2A2A",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                }}
                    onPress={() => {
                        setCart(temp);
                        setSeats(JSON.parse(json));
                        // console.log(seat);
                    }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Bỏ chọn
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SeatsPick

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
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: "#262532",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    Screen: {
        marginVertical: 40,
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    ScreenText: {
        width: "75%",
        height: 55,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }
})