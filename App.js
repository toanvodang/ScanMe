import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Modal } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import data from './assets/data.json';
import { BarCodeScanner } from 'expo-barcode-scanner';

function ScanQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState({ isShow: false, info: null });
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`${data}`);
    // console.log(data)

    setShowModal({ isShow: true, info: data });
  };

  const renderInfo = (data) => {
    if (data) {
      const splitData = data.split('|');
      if (splitData.length > 1) {
        return splitData.map((text, i) => {
          return <Text style={{ paddingLeft: 20, fontSize: 20, color: '#fff', padding: 5 }} key={i}>{text}</Text>
        })
      }
      else {
        return data;
      }
    }
    else {
      alert('Không có dữ liệu')
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {showModal.isShow ? (
        <View style={{
          borderRadius: 15,
          backgroundColor: '#ffab66',
          paddingVertical: 20,
          width: '80%',
          alignSelf: 'center',
          flex: 1,
          margin: 10
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 20, color: '#2b2a2a', padding: 10, textAlign: 'center', fontWeight: 'bold',
            }}>Thông tin quét được</Text>
            {showModal.isShow && renderInfo(showModal.info)}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setShowModal({ isShow: false, info: null })} style={{
              backgroundColor: 'gray',
              padding: 20,
              // width: 300,
              flex: 1,
              margin: 5,
              alignSelf: 'center',
              borderRadius: 5
            }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScanned(true)} style={{
              backgroundColor: '#0971dc',
              padding: 20,
              // width: 300,
              flex: 2,
              margin: 5,
              alignSelf: 'center',
              borderRadius: 5
            }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>) : (<View style={{ flex: 1 }}>{!scanned && (<View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, StyleSheet.absoluteFill, {
                flex: 1,
                flexDirection: 'column'
              }]}
            />
          </View>
          <TouchableOpacity onPress={() => setScanned(true)} style={{
            backgroundColor: '#cd0000',
            padding: 20,
            width: 300,
            margin: 5,
            alignSelf: 'center',
            borderRadius: 5
          }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Hủy</Text>
          </TouchableOpacity>
        </View>)}

          {scanned && <TouchableOpacity onPress={() => setScanned(false)} style={{
            alignItems: 'center',

            flex: 1, flexDirection: 'row', alignContent: 'center', alignSelf: 'center'
          }}>
            <Text style={{
              fontSize: 20, color: '#fff', paddingHorizontal: 60, borderRadius: 15, backgroundColor: '#ffab66',
              paddingVertical: 140, fontWeight: 'bold',
            }}>Bấm vào để quét</Text>
          </TouchableOpacity>}</View>)
      }
    </View>
  )
}

function ListData() {
  console.log(data)
  return <Text>Danh sách</Text>
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: true,
          tabBarStyle: {
            height: 50,
            padding: 3,
            backgroundColor: '#ffab66'
          }
        })}
      >
        <Tab.Screen name='Quét mã' component={ScanQR} options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={[{ fontSize: 15, fontWeight: '300', color: '#2b2a2a' }, focused && { fontWeight: 'bold' }]}>Quét mã</Text>
          },
          tabBarIcon: () => (
            <Ionicons name="ios-qr-code-outline" size={24} color="#2b2a2a" />
          )
        }}></Tab.Screen>
        <Tab.Screen name='Danh sách' component={ListData} options={{
          tabBarLabel: ({ focused }) => {
            return <Text style={[{ fontSize: 15, fontWeight: '300', color: '#2b2a2a' }, focused && { fontWeight: 'bold' }]}>Danh sách</Text>
          },
          tabBarIcon: () => (
            <Ionicons name="list-outline" size={26} color="#2b2a2a" />
          )
        }}></Tab.Screen>
      </Tab.Navigator >
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2b2a2a',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});