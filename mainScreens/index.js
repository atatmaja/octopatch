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
import Notifications from './Notifications';
import Settings from './Settings';
import Home from './Home';

class MainScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
        currentScreen: 'Home'
    }
  }

  componentDidMount(){
  }

  getActiveComponent(){
      switch(this.state.currentScreen){
          case "Home":
            return <Home/>
          case "Notifications":
            return <Notifications/>
          case "Settings":
            return <Settings/>
      }
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainHeaderText}>OCTOPATCH CONNECT</Text>
            </View>
            {this.getActiveComponent()}
            <View style={{flexDirection: 'row', height: 60, borderTopColor: 'black', borderTopWidth: StyleSheet.hairlineWidth}}>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Home'})} style={styles.tabSelectContainer}>
                    <Icon size={30} name="home" color={this.state.currentScreen === "Home" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
                <View style={styles.hairlineHor}/>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Notifications'})} style={styles.tabSelectContainer}>
                    <Icon size={30} name="bell" color={this.state.currentScreen === "Notifications" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
                <View style={styles.hairlineHor}/>
                <TouchableOpacity onPress={() => this.setState({currentScreen: 'Settings'})} style={styles.tabSelectContainer}>
                    <Icon  size={30} name="cog" color={this.state.currentScreen === "Settings" ? "black" : "#d3d3d3"}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    header: {flex: 0, height: 80, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10, flexDirection: 'row', borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth},
    tabSelectContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'},
    hairlineHor: {width: StyleSheet.hairlineWidth, backgroundColor: 'black'},
    mainHeaderText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        flex: 1
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);