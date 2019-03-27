/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Alerts from './Alerts';
import Biometrics from './Biometrics';
import Information from './Information';


class PatientScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        currentScreen: 'Alerts'
    }
  }

  componentDidMount(){
  }

  getActiveComponent(){
    switch(this.state.currentScreen){
        case "Biometrics":
          return <Biometrics/>
        case "Information":
          return <Information/>
        case "Alerts":
          return <Alerts/>
    }
}

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainHeaderText}>LESIE JOHNSONBERG</Text>
            </View>
            <Text style={styles.mapText}>Patient Location</Text>
            <View style={{flex:1}}>
                {this.getActiveComponent()}
            </View>
            <View style={{flex: 0, flexDirection: 'row', height: 50, borderTopColor: 'black', borderBottomColor: 'black', borderTopWidth: StyleSheet.hairlineWidth}}>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Biometrics'})} style={styles.tabSelectContainer}>
                    <Icon size={30} name="heartbeat" color={this.state.currentScreen === "Biometrics" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
                <View style={styles.hairlineHor}/>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Information'})} style={styles.tabSelectContainer}>
                    <Icon size={30} name="user" color={this.state.currentScreen === "Information" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
                <View style={styles.hairlineHor}/>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Alerts'})} style={styles.tabSelectContainer}>
                    <Icon  size={30} name="bell" color={this.state.currentScreen === "Alerts" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.heartRateText}>
            <Icon  size={23} name="heart" color="black">
            <Text>       0 BPM                     </Text><Icon size={20} name="circle" color="green"></Icon></Icon>
            </View>
            <View style={styles.breathingRateText}>
            <Icon  size={23} name="bell" color="black">
            <Text>        27 breathes/min   </Text><Icon size={40} name="caret-up" color="red"></Icon></Icon>
            </View>
            <View style={styles.sweatText}>
            <Icon  size={24} name="tint" color="black">
            <Text>        12.2 g/min-m2      </Text> <Icon size={20} name="circle" color="green"></Icon></Icon>
            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'white'
    },
    header: {backgroundColor: '#33CEFF', flex: 0, height: 80, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth},
    tabSelectContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomColor: "black", backgroundColor: 'white'},
    hairlineHor: {width: StyleSheet.hairlineWidth, backgroundColor: 'black'},
    mainHeaderText: {
        fontSize: 25,
        textAlign: 'left',
        margin: 5,
        flex: 1,
        color: 'white',
        padding: 30
    },
    mapText: {
        fontSize: 15,
        margin: 10,
        flex: 1,
        color: 'black',
        textAlign: 'left'
        },
    heartRateText: {
        top: 10,
        margin: 20,
        flex: 0,
        padding:20
    },
    breathingRateText: {
        top: 10,
        fontSize: 25,
        margin: 20,
        flex: 0,
        padding:20
    },
    sweatText: {
        top: 10,
        fontSize: 25,
        margin: 20,
        flex: 1,
        padding:20
    }

  });

  function mapStateToProps(state) {
    return {
      data: state
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PatientScreen);