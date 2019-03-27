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
        monthExpanded: false,
        todayNotifs: [
            {text: "William Neil and Leslie are in close proximity, risk of conflict", time: "39 mins ago", isRead: false},
            {text: "Leslie Neil and Daniel are in close proximity, risk of conflict", time: "1 hour ago", isRead: false},
            {text: "Hoss and Hoss are in close proximity, risk of conflict", time: "2 hours ago", isRead: true}
        ],
        weekNotifs: [
            {text: "William Neil and Leslie are in close proximity, risk of conflict", time: "Yesterday", isRead: true},
            {text: "Leslie Neil and Daniel are in close proximity, risk of conflict", time: "3 days ago", isRead: true},
        ],
        monthNotifs: [
            {text: "William Neil and Leslie are in close proximity, risk of conflict", time: "March 3rd", isRead: true},
        ],
    }
  }

  componentDidMount(){
  }

  renderNotif(notifText, time, isRead){
      return(
        <View style={styles.notifContainer}>
            <View style={[styles.notifDot, {backgroundColor: isRead ? 'white' : 'blue'}]}></View>
            <View style={{flexDirection: 'column'}}>
                <Text style={{marginRight: 50}}>{notifText} </Text> 
                <Text style={styles.timeText}>{time} </Text>
            </View>
        </View>
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({todayExpanded: !this.state.todayExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.timePeriodText}>Today </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.todayExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.todayExpanded && (
            this.state.todayNotifs.map((notif) => {
                return(
                    this.renderNotif(notif.text, notif.time, notif.isRead)
                )
            })
        )}
        <TouchableOpacity onPress={() => this.setState({weekExpanded: !this.state.weekExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.timePeriodText}>This Week </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.weekExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.weekExpanded && (
            this.state.weekNotifs.map((notif) => {
                return(
                    this.renderNotif(notif.text, notif.time, notif.isRead)
                )
            })
        )}
        <TouchableOpacity onPress={() => this.setState({monthExpanded: !this.state.monthExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.timePeriodText}>This Month </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.monthExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.monthExpanded && (
            this.state.monthNotifs.map((notif) => {
                return(
                    this.renderNotif(notif.text, notif.time, notif.isRead)
                )
            })
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
  notifContainer: {
    width: Dimensions.get('window').width,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: "#a9a9a9", 
    borderBottomWidth: StyleSheet.hairlineWidth,
},
notifDot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: 20
},
timeText: {
    color: "#a9a9a9",
    fontSize: 12 
},
  timePeriodText: {
      fontWeight: 'bold',
      fontSize: 18,
      marginLeft: 16,
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