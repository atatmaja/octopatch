/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PermissionsAndroid, NativeEventEmitter, NativeModules, Alert} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {ActionCreators} from './actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainScreen from './mainScreens';
import PatientScreen from './patientScreens';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PushNotification from 'react-native-push-notification';

const BleEmitter = new NativeEventEmitter(NativeModules.BleManager);

const RootStack = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen
    },
    PatientScreen: {
      screen: PatientScreen
    }
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

class Root extends Component {
  constructor(props){
    super(props);
    this.onStopScan = this.onStopScan.bind(this);
    this.onDiscoverPeripheral = this.onDiscoverPeripheral.bind(this);
    this.onConnectPeripheral = this.onConnectPeripheral.bind(this);
    this.onDisconnectPeripheral = this.onDisconnectPeripheral.bind(this);
    this.onReceivePacket = this.onReceivePacket.bind(this);
    this.state = {};
    this.sendNotif = this.sendNotif.bind(this);
  }

  checkBLEPermissions(){
    if(Platform.OS === 'android'){
      //request both bluetooth and coarse location permissions as necessary
      BleManager.enableBluetooth().then(() => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
          
          if(!result){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result)=> {
              if(result === 'denied'){
                Alert.alert('Must allow all permissions to use this app.');
              }
              else{
                this.configureListeners();
              }
            })
          }
          else{
            this.configureListeners();
          }
          
        });
        
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('You need to give access to bluetooth to use this app.');
      });
    }
    else{
      this.configureListeners();
    }
  }

  configureListeners(){
    //start ble manager
    BleManager.start({showAlert: true});
    //configure ble listeners
    this.handlerStop = BleEmitter.addListener('BleManagerStopScan', this.onStopScan );
    this.handlerDiscover = BleEmitter.addListener('BleManagerDiscoverPeripheral', this.onDiscoverPeripheral );
    this.handleConnect = BleEmitter.addListener('BleManagerConnectPeripheral', this.onConnectPeripheral );
    this.handleDisconnect = BleEmitter.addListener('BleManagerDisconnectPeripheral', this.onDisconnectPeripheral );
    this.handleReceivePacket = BleEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.onReceivePacket )
    //start scanning for device
    this.startScan();
  }

  startScan(){
    BleManager.scan([], 30).then(() => {
      //Promise runs once scan is successfully started
      console.log('scanning');
    });
  }

  onDisconnectPeripheral(){
    Alert.alert(
      'Octopatch Disconnected',
      ''
    );
  }

  onStopScan(){
    console.log('stopped scanning');
  }

  onConnectPeripheral(){
    console.log("connected to device with address", this.props.accountInfo.deviceAddr);

    Alert.alert(
      'Connected to Octopatch',
      `Device address:  ${this.props.accountInfo.deviceAddr}`,
    );

    BleManager.retrieveServices(this.props.accountInfo.deviceAddr).then((peripheralInfo) => {
      // Success code
      console.log('Peripheral info:', peripheralInfo);

      const CHAR_UUID = "713d0002-503e-4c75-ba94-3148f18d941e";
      const SERVICE_UUID = "713d0000-503e-4c75-ba94-3148f18d941e";
      //save characteristic/service UUIDs in the state
      this.setState({CHAR_UUID, SERVICE_UUID});

      //init notifier to listen for sent packets with following args
      //peripheralId
      //serviceUUID
      //characteristicUUID
      
      BleManager.startNotification(this.props.accountInfo.deviceAddr, SERVICE_UUID, CHAR_UUID)
        .then(() => {
          console.log('Notification started');
        })
        .catch((error) => {
          console.log(error);
        });
    });  
  }

  onDiscoverPeripheral(peripheral){
    if(peripheral.name === "Octopatch"){
        console.log('retrieved peripheral');
        this.props.saveBLEAddr(peripheral.id);
        BleManager.stopScan()
          .then(() => {
            BleManager.connect(peripheral.id)
                .then(() => {
                  console.log('Connected');
                })
                .catch((error) => {
                  console.log(error);
                });
          });
    }
  }

  onReceivePacket({value, peripheral, characteristic, service}){
    console.log('received packet', value);
    /*
    //steps represented as 2 bytes
    const currentSteps = (value[1] << 8) | value[2]
    if(currentHR > 0 && currentSteps > 0){
      const currentTime = moment().unix();
      this.props.postCurrentHR(currentHR, currentTime);
      this.props.postCurrentSteps(currentSteps, currentTime);
      console.log(currentHR, currentSteps);
    }
    */
  }

  componentDidMount(){
    this.checkBLEPermissions();
    PushNotification.configure({ 		
        onNotification: function(notification) {
          console.log('NOTIFICATION', notification);
        },
        popInitialNotification: true,
    });
    this.sendNotif();
  }

  sendNotif() { 
    PushNotification.localNotification({
        /* iOS and Android properties */
        title: "My Notification Title", // (optional)
        message: "My Notification Message", // (required)
    });
   }

  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
