import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, LinearGradient, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { firebase } from '../firebase';


const Tickets = () => {
  const navigation = useNavigation();
  const [tickets, setTickets] = useState([
    // {
    //   name: 'avatar',
    //   url: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg',
    //   date: '2022-10-03',
    //   rate: '7.7'
    // },
    // {
    //   name: 'pacific rim',
    //   url: 'https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_.jpg',
    //   date: '2016-10-04',
    //   rate: '9.0'
    // },
    // {
    //   name: 'marvel',
    //   url: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    //   date: '2022-10-05',
    //   rate: '8.0'
    // },
    // {
    //   name: 'marvel1',
    //   url: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    //   date: '2022-10-05',
    //   rate: '8.0'
    // },
    // {
    //   name: 'marvel2',
    //   url: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    //   date: '2022-10-05',
    //   rate: '8.0'
    // },
    // {
    //   name: 'marvel3',
    //   url: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    //   date: '2022-10-05',
    //   rate: '8.0'
    // }
  ])

  const user = firebase.auth().currentUser.email;
  const [account, setAccount] = useState();
  // const account = [];
  const [xuatChieus, setxuatChieus] = useState([]);
  const [films, setFilms] = useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log('useEffect of Tickets has been called!');
    // setIsLoading(true);
    if (isFocused) {
      getAllBills();
    }
  }, [isFocused]);

  // const getMovieId = async (movieId) => {
  //   let data = '';

  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: 'http://localhost:8000/movie/' + movieId,
  //     headers: {},
  //     data: data
  //   };

  //   axios.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }

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

  const getAllBills = async () => {
    setIsLoading(true);
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://10.0.2.2:8000/bill/' + global.myvar._id,
      // url: 'http://192.168.1.7:8000/bill/' + global.myvar._id,
      headers: {},
      data: data
    };

    await axios.request(config)
      .then((response) => {
        // for (let i = 0; i < response.data.length; i++) {
        //   // console.log(response.data[i])
        //   setxuatChieus(xuatChieus => [...xuatChieus, response.data[i]]);
        // }
        // console.log(JSON.stringify(response.data));
        setxuatChieus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }



  const renderItem = ({ item, index }) => {
    return <TouchableOpacity style={{
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: 150,
      marginBottom: 35,
      backgroundColor: "#1F1A30",
      borderRadius: 30,
    }}>
      <View style={{
        width: "100%",
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <View style={{
          // backgroundColor: "white",
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <View
            style={{
              // flex:1,
              width: "30%",
            }}
          >
            <Image style={{
              width: 120,
              height: 120,
              resizeMode: "stretch",
              borderRadius: 10,
            }}
              source={{
                uri: item.movie.image == null ? "" : item.movie.image
              }}
            />
          </View>
          <View style={{
            // flex: 1,
            // backgroundColor: "white",
            width: "65%",
            alignItems: "center",
            justifyContent: "center",
          }}
          >
            <Text style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold"
            }}>{item.movie.name}</Text>
            <View style={{
              // flexDirection: "row",
              // marginTop: 20,
              width: "90%",
              // backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Text style={styles.text}>Ngày chiếu: {item.xuatchieu.date}</Text>
              <Text style={styles.text}>Giờ chiếu: {item.xuatchieu.time}</Text>
              <Text style={styles.text}>Ngày đặt: 16/10/2023</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  }



  // if(xuatChieus.length == 0){
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.navBar}>

  //         <Text style={styles.navBarText}>
  //           Lịch sử mua
  //         </Text>
  //       </View>

  //       <View style={{
  //         width: "100%",
  //         height: "90%",
  //         // backgroundColor: "red"
  //         alignItems: "center"
  //       }}>

  //         <Text style={{
  //           color: "white",
  //           fontSize: 26,
  //         }}>
  //           Bạn chưa mua vé nào.
  //         </Text>


  //       </View>



  //     </SafeAreaView >
  //   )
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>

        <Text style={styles.navBarText}>
          Lịch sử mua
        </Text>
      </View>

      <View style={{
        width: "100%",
        height: "90%",
        // backgroundColor: "red"
        alignItems: "center"
      }}>
        {isLoading == true ? (
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
        ) : (
          (xuatChieus.length) == 0 ? (
            <Text style={{
              color: "white",
              fontSize: 26,
            }}>
              Bạn chưa mua vé nào.
            </Text>
          ) : (
            < FlatList
              // horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={xuatChieus}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
            >
            </FlatList>
          )
        )

        }

      </View>



    </SafeAreaView >
  )



}

export default Tickets

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
    fontSize: 16,
    marginTop: 5
  },
  ticket: {
    flex: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "grey",
    borderWidth: 2
  },
  ticketLeft: {
    backgroundColor: "#272737"
  },
  ticketRight: {
    backgroundColor: "#171722"
  },
  moneyCoupon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  }
})