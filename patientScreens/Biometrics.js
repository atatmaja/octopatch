import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Biometrics extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
  }

  render() {
    console.log(this.props);
    //red triangle icon just for future reference
    //<Icon style={{marginHorizontal: 20}} size={55} name="caret-up" color="red"></Icon>
    return (
      <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon style={{marginHorizontal: 20}} size={40} name="heart" color="black"></Icon>
              <Text style={styles.biometricText}>{(this.props.name === "Daniel Javaheri-Zadeh" && this.props.hr) ? `${this.props.hr} BPM` : "70 BPM"} </Text>
              <Icon style={{marginHorizontal: 20}} size={this.props.hr > 100 ? 55 : 40} name={this.props.hr > 110 ? "caret-up" : "circle"} color={this.props.hr > 110 ? "red" : "green"}></Icon>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 style={{marginHorizontal: 20}} size={40} name="wind" color="black"></FontAwesome5>
              <Text style={styles.biometricText}>20 breaths/min </Text>
              <Icon style={{marginHorizontal: 20}} size={40} name="circle" color="green"></Icon>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon style={{marginLeft: 35, marginRight: 20}} size={40} name="tint" color="black"></Icon>
              <Text style={styles.biometricText}>12.2 g/min-m2 </Text> 
              <Icon style={{marginHorizontal: 20}} size={40} name="circle" color="green"></Icon>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 40
  },
  biometricText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20
  }
});

function mapStateToProps(state) {
  return {
    hr: state.patients.hr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Biometrics);