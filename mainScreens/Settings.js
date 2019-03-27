import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/FontAwesome';

class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {
        notificationsExpanded: false,
        languageExpanded: false,
        locationExpanded: false,
        patientExpanded: false
    }
  }

  componentDidMount(){
  }

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.setState({notificationsExpanded: !this.state.notificationsExpanded})} style={[styles.dropdownContainer, {borderTopColor: "black", borderTopWidth: (StyleSheet.hairlineWidth)*2}]}>
                <Text style={styles.settingsGroupText}>Notifications     </Text>
                <Icon style={styles.collapseIcon} size={24} name={this.state.notificationsExpanded ? "chevron-up" : "chevron-down"}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({languageExpanded: !this.state.languageExpanded})} style={styles.dropdownContainer}>
                <Text style={styles.settingsGroupText}>Language     </Text>
                <Icon style={styles.collapseIcon} size={24} name={this.state.languageExpanded ? "chevron-up" : "chevron-down"}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({locationExpanded: !this.state.locationExpanded})} style={styles.dropdownContainer}>
                <Text style={styles.settingsGroupText}>Location Management </Text>
                <Icon style={styles.collapseIcon} size={24} name={this.state.locationExpanded ? "chevron-up" : "chevron-down"}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({patientExpanded: !this.state.patientExpanded})} style={styles.dropdownContainer}>
                <Text style={styles.settingsGroupText}>Patient Management </Text>
                <Icon style={styles.collapseIcon} size={24} name={this.state.patientExpanded ? "chevron-up" : "chevron-down"}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dropdownContainer, {marginTop: 60, borderTopColor: "black", borderTopWidth: (StyleSheet.hairlineWidth)*2}]}>
                <Text style={[styles.settingsGroupText, {color: 'red'}]}>Logout </Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dropdownContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderBottomColor: "black", 
    borderBottomWidth: (StyleSheet.hairlineWidth)*2
},
settingsGroupText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 16,
},
});

function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);