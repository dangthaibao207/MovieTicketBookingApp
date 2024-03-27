import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../firebase';
import axios from 'axios'
import Loader from './LoadingScreen'


const Home = ({ route }) => {

    const navigation = useNavigation()
    const [films, setFilms] = useState([])
    // const json = JSON.stringify(films);
    const [account, setAccount] = useState();
    const user = firebase.auth().currentUser.email;
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState();
    // let isSearching = false;
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    global.myvar = account;

    useEffect(() => {
        console.log('useEffect of Home has been called!');
        getMoviesDataFromDB();
        // getUserData();
        // console.log(user)
    }, []);

    const getMoviesDataFromDB = async () => {
        setIsLoading(true);
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: 'http://192.168.1.7:8000/movie/',
            url: 'http://10.0.2.2:8000/movie/',
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setFilms(response.data);
                setFullData(response.data);
                // for (let i = 0; i < films.length; i++)
                //     console.log(films[i]._id);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsLoading(false);
    };

    const getUserData = async () => {
        // firebase.auth().onAuthStateChanged(async (user) => {
        //     if (user) {
        // console.log('User email: ', user.email);
        // setIsLoading(true);
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: 'http://192.168.1.7:8000/user/' + user,
            url: 'http://10.0.2.2:8000/user/' + user,
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setAccount(response.data);
            })
            .catch((error) => {
                // console.log(error);
            });

        // }
        // });
        // setIsLoading(false);
    }

    const findMovie = (movieName) => {
        // if(!movieName){
        // setResult(films.find(({ name }) => name.toLowerCase().includes(movieName.toLowerCase())));
        // console.log(result);
        // } else {
        // isSearching = true;
        // }
        const formattedQuery = movieName.toLowerCase();
        const filteredData = fullData.filter(({ name }) => {
            return contains(name, formattedQuery);
        });


        setFilms(filteredData);
        setQuery(movieName);

        // console.log(films)
    }

    const contains = (name, query) => {
        // const { first, last } = name;
        // console.log(name);
        // console.log(query);
        if (name.toLowerCase().includes(query)) {
            return true;
        }

        return false;
    };

    if (!account) {
        getUserData();
    }
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <Loader visible={isLoading}/>
            <StatusBar barStyle="light-content" backgroundColor='#171722' />
            <View style={styles.Container}>
                <View style={styles.UserStatusBar}>
                    <View>
                        <Text style={styles.UserName}>Xin chào {account?.name}!!!</Text>
                        <Text style={styles.Text}>Chọn bộ phim yêu thích của bạn</Text>
                    </View>
                </View>

                <View style={styles.Searcher}>
                    <TextInput
                        placeholder='Tìm kiếm'
                        placeholderTextColor="#707070"
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={query}
                        onChangeText={queryText => findMovie(queryText)}
                        style={styles.searchInput} />
                    <Text style={styles.searchText}>|</Text>
                    <Ionic name="search-outline" style={styles.searchIcon} />
                </View>


            </View>
            <View style={styles.filmList}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 34,
                        fontWeight: "bold",
                        paddingLeft: 20,
                        marginBottom: 15,
                    }}>Phim đang chiếu</Text>

                <View style={styles.filmListView}>
                    {/* {isLoading && !account ? (
                        <View
                            style={{
                                position: 'absolute',
                                right: "45%",
                                top: "45%",
                                height: 100,
                                zIndex: 1,
                            }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : ( */}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={films}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => {
                            return <View style={styles.filmItem}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("MovieDetails", {
                                            movieId: item._id,
                                            name: item.name,
                                            image: item.image,
                                            imdbPoint: item.imdbPoint,
                                            year: item.year,
                                            timeLength: item.timeLength,
                                            category: item.category
                                            // date: item.date
                                        })
                                    }}
                                >
                                    <View>
                                        <Image style={styles.filmImage}
                                            source={{
                                                uri: item.image
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <Ionic name="star" style={styles.filmIcon} />
                                    <Text
                                        style={{
                                            fontSize: 36,
                                            fontWeight: "bold",
                                            color: "#FEC40D"
                                        }}
                                    >{item.imdbPoint}</Text>
                                </View>
                            </View>
                        }}
                    >
                    </FlatList>
                     {/* )} */}
                </View>
            </View>
        </SafeAreaView>
    )



}

export default Home

const styles = StyleSheet.create({
    SafeAreaView: {
        width: "100%",
        height: "100%",
        backgroundColor: "#171722",
        padding: 0,
        position: "relative",
    },
    Container: {
        width: "100%",
        padding: 20,
        marginBottom: 20,
    },
    // UserStatusBar: {
    //     width: "100%",
    //     backgroundColor: "#2B2B3A",
    //     borderRadius: 10,
    //     paddingHorizontal: 30,
    //     paddingVertical: 10,
    // },
    UserName: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 5,
    },
    Text: {
        fontSize: 16,
        color: "#707070",
    },
    Searcher: {
        width: "100%",
        height: 55,
        marginTop: 70,
        backgroundColor: "#242432",
        borderRadius: 25,
    },
    searchIcon: {
        position: "absolute",
        color: "#fff",
        fontSize: 32,
        top: 11,
        left: 30,
    },
    searchInput: {
        width: "100%",
        height: "100%",
        position: "absolute",
        color: "#707070",
        top: 0,
        left: 110,
        fontSize: 24,
    },
    searchText: {
        position: "absolute",
        color: "#707070",
        top: 0,
        left: 80,
        fontSize: 36,
        fontWeight: "bold"
    },
    filmList: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: 500,
    },
    filmListView: {
        flex: 1,
    },
    filmItem: {
        width: 300,
        height: "100%",
        marginLeft: 115,
        paddingRight: 100,
        alignItems: "center"
    },
    filmImage: {
        width: 265,
        height: 380,
        resizeMode: "cover",
        borderRadius: 30,
        marginBottom: 10,
    },
    filmIcon: {
        fontSize: 50,
        color: "#FEC40D",
        marginRight: 10,
    },
})