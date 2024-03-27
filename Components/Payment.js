import { SafeAreaView } from 'react-native-safe-area-context'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    LinearGradient,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator,
    NativeModules,
    NativeEventEmitter,
    TouchableWithoutFeedback,
    ScrollView,
    Button,
    Modal,
    Keyboard
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { WebView } from 'react-native-webview';
import { Base64 } from 'js-base64';
import queryString from 'query-string';



const Payment = ({ route }) => {
    const navigation = useNavigation();
    const ticketBoughtCheck = false;
    const { movieId, movieName, movieImage, xuatChieuId, xuatChieuDate, xuatChieuTime, cart } = route.params; // ID xuat chieu
    const [couponCode, setCouponCode] = useState("");
    const [couponValue, setCouponValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const normalSeat = 50000;
    const coupleSeat = 75000;

    // const [money, setMoney] = React.useState('10000')
    // const [token, setToken] = React.useState('')
    // const [returncode, setReturnCode] = React.useState('')

    // const [showGateway, setShowGateway] = useState(false);
    // const [prog, setProg] = useState(false);
    // const [progClr, setProgClr] = useState('#000');

    // const paypal = () => {
    //     console.log("abc")
    //     return (<Modal
    //         visible={true}
    //     >
    //         <View
    //             style={{ flex: 1 }}
    //         >
    //             abc
    //         </View>
    //     </Modal>)
    // }

    //Ngày 15-12 bắt đầu
    let baseUrl = 'https://api-m.sandbox.paypal.com';
    let clientId = 'Ad1BhJWLMvzsxkflj_zrUKfWsfnHs6cVZS1ac-mPdcNfuzU-Uv4EqfmP3niFZT1A0N-7Ezyfv6OlBLve';
    let secretKey = 'EIvlZhhZNbNrMLLwEw1uZFQIj4bt3fibXX5wJXflWBkp6iqrWTMKWw8fd8RMr7KoPnnI7CtHGVRRfGAl';

    const [paypalUrl, setPaypalUrl] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    let orderDetail = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": "T-Shirt",
                        "description": "Green XL",
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": "1.00"
                        }
                    }
                ],
                "amount": {
                    "currency_code": "USD",
                    "value": "1.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": "1.00"
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }

    const generateToken = () => {
        var headers = new Headers()
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Basic " + Base64.encode(`${clientId}:${secretKey}`));

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: 'grant_type=client_credentials',
        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
                console.log("result print", result)
                const { access_token } = JSON.parse(result)
                resolve(access_token)
            }).catch(error => {
                console.log("error raised", error)
                reject(error)
            })
        })
    }

    const createOrder = (token = '') => {
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(orderDetail)
        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
                console.log("result print", result)
                const res = JSON.parse(result)
                resolve(res)
            }).catch(error => {
                console.log("error raised", error)
                reject(error)
            })
        })
    }

    const capturePayment = (id, token = '') => {
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
        };

        return new Promise((resolve, reject) => {
            fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
                console.log("result print", result)
                const res = JSON.parse(result)
                resolve(res)
            }).catch(error => {
                console.log("error raised", error)
                reject(error)
            })
        })
    }

    const onPressPaypal = async () => {
        setIsLoading(true)
        try {
            const token = await generateToken()
            const res = await createOrder(token)
            setAccessToken(token)
            console.log("res++++++", res)
            setIsLoading(false)
            if (!!res?.links) {
                const findUrl = res.links.find(data => data?.rel == "approve")
                setPaypalUrl(findUrl.href)
            }


        } catch (error) {
            console.log("error", error)
            setIsLoading(false)

        }
    }


    const onUrlChange = (webviewState) => {
        console.log("webviewStatewebviewState", webviewState)
        if (webviewState.url.includes('https://example.com/cancel')) {
            clearPaypalState()
            return;
        }
        if (webviewState.url.includes('https://example.com/return')) {

            const urlValues = queryString.parseUrl(webviewState.url)
            console.log("my urls value", urlValues)
            const { token } = urlValues.query
            if (!!token) {
                paymentSucess(token)
            }

        }
    }

    const paymentSucess = async (id) => {
        try {
            const res = capturePayment(id, accessToken)
            console.log("capturePayment res++++", res)
            buyTickets()
            clearPaypalState()
            // alert("Payment sucessfull...!!!")
        } catch (error) {
            console.log("error raised in payment capture", error)
        }
    }


    const clearPaypalState = () => {
        setPaypalUrl(null)
        setAccessToken(null)
    }


    //Ngày 15-12 kết thúc


    useEffect(() => {
        console.log('useEffect pay ment has been called!');
        // setLoading();
        // pickSeats();
        // console.log(isLoading);
    }, []);



    const renderTickets = () => {
        return cart.map((item, index) => <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }} key={index}>{item.Name} </Text>);
    }

    const ticketsPrice = () => {
        let rs = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].Name.includes("G")) {
                rs += coupleSeat;
            } else {
                rs += normalSeat;
            }
        }
        return rs;
    }

    const discountCoupon = () => {
        let rs = 0;
        rs = ticketsPrice() * couponValue;
        return rs;
    }

    const totalPay = () => {
        return ticketsPrice() - discountCoupon();
    }

    const pickSeats = async () => {
        await cart.map(i => {
            i.Status = 'red';
        })
    }

    const getCoupon = async () => {
        try {
            let data = '';

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://10.0.2.2:8000/coupon/' + couponCode.toUpperCase(),
                headers: {},
                data: data
            };

            await axios.request(config)
                .then((response) => {
                    setCouponValue(JSON.stringify(response.data.value));
                    alert("Áp mã giảm giá thành công!!!")
                    setCouponCode("");
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }

    }

    const moneyCurrency = (money) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    }

    const buyTickets = async () => {
        try {
            pickSeats();
            setIsLoading(true);
            let data = JSON.stringify({
                "userId": global.myvar._id,
                "xuatchieu": xuatChieuId,
                "movie": movieId,
                "seat": cart,
                "totalPay": moneyCurrency(totalPay())
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://10.0.2.2:8000/bill/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios.request(config)
                .then((response) => {
                    // console.log(response.data);
                    updateSeats();
                })
                .catch((error) => {
                    console.log(error);

                });
        } catch (error) {

        }
    }

    const updateSeats = async () => {
        try {
            let data = JSON.stringify(cart);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://10.0.2.2:8000/xuatchieu/pickSeats/' + xuatChieuId,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios.request(config)
                .then((response) => {
                    unSetLoading();
                    Alert.alert('Thông báo!!!', 'Đã đặt vé thành công.', [
                        { text: 'OK', onPress: () => navigation.navigate("Tickets") },
                    ]);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) { }
    }

    const handleButton = () => {
        // setIsLoading(true);
        // console.log("loading....");
        // setIsLoading(false);
        getCoupon();
    }
    const unSetLoading = () => {
        setIsLoading(false);
    }

    const loading = () => {
        return (
            <View
                style={{
                    // position: 're',
                    // right: "45%",
                    // top: "45%",
                    marginTop: 25,
                    height: "100%",
                    zIndex: 1,
                }}>
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }

    // const renderButton = () => {
    //     if (isLoading == true) {
    //         return (<TouchableOpacity
    //             // onPress={handleSignUp}
    //             disabled={true}
    //             style={{
    //                 width: "32%",
    //                 height: 50,
    //                 backgroundColor: 'grey',
    //                 borderRadius: 5,
    //                 justifyContent: "center",
    //                 alignItems: "center"
    //             }}>
    //             <Text style={{
    //                 color: "white",
    //                 fontSize: 24,
    //                 fontWeight: "bold"
    //             }}>Áp Dụng</Text>
    //         </TouchableOpacity>)
    //     } else {
    //         return (
    //             <TouchableOpacity
    //                 onPress={setLoading()}
    //                 style={{
    //                     width: "32%",
    //                     height: 50,
    //                     backgroundColor: '#00b7b7',
    //                     borderRadius: 5,
    //                     justifyContent: "center",
    //                     alignItems: "center"
    //                 }}>
    //                 <Text style={{
    //                     color: "white",
    //                     fontSize: 24,
    //                     fontWeight: "bold"
    //                 }}>Áp Dụng</Text>
    //             </TouchableOpacity>
    //         )
    //     }
    // }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
            }}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ flexGrow: 1 }}>

                    <View style={styles.navBar}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}>
                            <Ionic name="chevron-back" style={{ color: "#fff", fontSize: 18, zIndex: 10 }} />
                        </TouchableOpacity>

                        <Text style={styles.navBarText}>
                            Thanh Toán
                        </Text>
                    </View>

                    <View style={{
                        width: "100%",
                        // height: "100%",
                        // backgroundColor: "red",
                        marginTop: 30,
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "90%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                            <View
                                style={{
                                    width: "30%"
                                }}
                            >
                                <Image style={{
                                    width: 120,
                                    height: 120,
                                    resizeMode: "stretch",
                                    borderRadius: 10,
                                }}
                                    source={{
                                        uri: cart.length === 0 ? '#' : movieImage
                                    }}
                                />
                            </View>
                            <View style={{
                                width: "65%",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 24,
                                    fontWeight: "bold"
                                }}>{cart.length === 0 ? '' : movieName}</Text>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 20,
                                    width: "75%",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={styles.text}>{cart.length === 0 ? '' : xuatChieuDate}</Text>
                                    <Text style={styles.text}>|</Text>
                                    <Text style={styles.text}>{cart.length === 0 ? '' : xuatChieuTime}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            width: "100%",
                            marginTop: 50,
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: "90%",
                                flexDirection: "row",
                            }}>
                                <View style={[styles.ticket, styles.ticketLeft]}>
                                    <Text style={{
                                        color: "grey",
                                        fontSize: 20
                                    }}>{cart.length} Vé</Text>
                                </View>

                                <View style={[styles.ticket, styles.ticketRight]}>
                                    {renderTickets()}
                                    {/* <Text style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>A1, A2, A3, A4</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={{
                            width: "100%",
                            marginTop: 50,
                            borderStyle: "dashed",
                            borderColor: "grey",
                            borderWidth: 2,
                            borderRightWidth: 0,
                            borderLeftWidth: 0,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <View style={{
                                width: "90%",
                                height: 100,
                                marginTop: 20,
                            }}>
                                <View style={styles.moneyCoupon}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                    }}>Tiền vé</Text>
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}>{moneyCurrency(ticketsPrice())}</Text>
                                </View>

                                <View style={styles.moneyCoupon}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                    }}>Giảm giá</Text>
                                    <Text style={{
                                        color: "lightgreen",
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}>-{moneyCurrency(discountCoupon())}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={{
                            width: "100%",
                            marginTop: 40,
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: "90%",

                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                    }}>Tổng tiền thanh toán</Text>
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}> {moneyCurrency(totalPay())}</Text>
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 40,
                                    marginBottom: 40,
                                }}>
                                    <View style={{
                                        width: "60%",
                                        borderWidth: 1,
                                        borderColor: "grey",
                                        justifyContent: "center",
                                        backgroundColor: "#2C2C3A"
                                    }}>
                                        <TextInput
                                            placeholder='Nhập Coupon'
                                            placeholderTextColor="#707070"
                                            style={{
                                                color: "white",
                                                fontSize: 18,
                                                marginLeft: 20
                                            }}
                                            value={couponCode}
                                            onChangeText={text => setCouponCode(text)}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => handleButton()}
                                        disabled={couponCode == "" ? true : false}
                                        style={{
                                            width: "32%",
                                            height: 50,
                                            // backgroundColor: '#00b7b7',
                                            backgroundColor: couponCode == "" ? 'grey' : '#00b7b7',
                                            borderRadius: 5,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 24,
                                            fontWeight: "bold"
                                        }}>
                                            Áp Dụng
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        // buyTickets();
                                        // createOrder(money);
                                        // paypal();
                                        // setShowGateway(true);
                                        // createPayment();
                                        onPressPaypal()
                                    }}
                                    disabled={isLoading == true ? true : false}

                                >
                                    <View style={{
                                        width: "100%",
                                        height: 60,
                                        backgroundColor: isLoading == false ? '#644ab0' : 'grey',
                                        borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {isLoading == false ? <Text style={{
                                            color: "white",
                                            fontSize: 24,
                                            fontWeight: "bold"
                                        }}>Xác Nhận Thanh Toán</Text> : loading()}
                                    </View>
                                </TouchableOpacity>
                                {/* <Button
                            title="Pay order"
                            type="outline"
                            onPress={() => { payOrder(token) }}
                        /> */}
                                {paypalUrl ? (
                                    <Modal
                                        // visible={paypalUrl}
                                        onDismiss={() => setShowGateway(false)}
                                        onRequestClose={() => setShowGateway(false)}
                                        animationType={"fade"}
                                        transparent>
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: '#f9f9f9',
                                                zIndex: 25,
                                                elevation: 2,
                                            }}>
                                                <TouchableOpacity
                                                    style={{ padding: 13 }}
                                                    // onPress={() => setShowGateway(false)}
                                                    onPress={clearPaypalState}>
                                                    <Feather name={'x'} size={24} />
                                                </TouchableOpacity>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: 'center',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        color: '#00457C',
                                                    }}>
                                                    PayPal GateWay
                                                </Text>
                                                <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                                                    <ActivityIndicator />
                                                </View>
                                            </View>
                                            <WebView
                                                source={{ uri: paypalUrl }}
                                                style={{ flex: 1 }}
                                                onNavigationStateChange={onUrlChange}
                                            />
                                        </View>
                                    </Modal>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </KeyboardAvoidingView>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#171722',
        width: '100%',
        height: '100%',
    },
    navBar: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        alignItems: "center"
    },
    input: {
        fontSize: 16,
        width: '80%',
        height: 40,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    text: {
        color: "white",
        fontSize: 18
    },
    ticket: {
        // flex: 1,
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        borderColor: "grey",
        borderWidth: 2,

    },
    ticketLeft: {
        width: "30%",
        backgroundColor: "#272737"
    },
    ticketRight: {
        width: "70%",
        backgroundColor: "#171722"
    },
    moneyCoupon: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    }
})

