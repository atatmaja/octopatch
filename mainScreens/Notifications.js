import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import BleManager from 'react-native-ble-manager';

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {
        todayExpanded: false,
        weekExpanded: false,
        monthExpanded: false
    }
  }

  componentDidMount(){
  }

  render() {
      console.log(this.state.todayExpanded)
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({todayExpanded: !this.state.todayExpanded})} style={styles.timePeriodContainer}>
            <Text style={styles.timePeriodText}>Today </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.todayExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({weekExpanded: !this.state.weekExpanded})} style={styles.timePeriodContainer}>
            <Text style={styles.timePeriodText}>This Week </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.weekExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({monthExpanded: !this.state.monthExpanded})} style={styles.timePeriodContainer}>
            <Text style={styles.timePeriodText}>This Month </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.monthExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  timePeriodContainer: {
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      borderBottomColor: "black", 
      borderBottomWidth: (StyleSheet.hairlineWidth)*2
  },
  timePeriodText: {
      fontWeight: 'bold',
      fontSize: 18,
      marginLeft: 16
  },
  collapseIcon: {
      marginRight: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);