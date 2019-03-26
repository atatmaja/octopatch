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

const BleEmitter = new NativeEventEmitter(NativeModules.BleManager);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
class Root extends Component {
  constructor(props){
    super(props);
    this.onStopScan = this.onStopScan.bind(this);
    this.onDiscoverPeripheral = this.onDiscoverPeripheral.bind(this);
    this.onConnectPeripheral = this.onConnectPeripheral.bind(this);
    this.onDisconnectPeripheral = this.onDisconnectPeripheral.bind(this);
    this.onReceivePacket = this.onReceivePacket.bind(this);
    this.state = {};
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

  onStopScan(){
    //todo
  }

  onDiscoverPeripheral(){
    //todo
  }

  onConnectPeripheral(){
    //todo
  }

  onDisconnectPeripheral(){
    //todo
  }

  onReceivePacket(){
    //todo
  }

  componentDidMount(){
    //call test action
    console.log(this.props);
    this.props.test();

    this.checkBLEPermissions();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
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
