import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/FontAwesome';

class Information extends Component{
  constructor(props){
    super(props);
    this.state = {
      roomExpanded: false,
      triggersExpanded: false,
      soothingExpanded: false
    }
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({roomExpanded: !this.state.roomExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.categoryText}>Assigned Room </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.roomExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.roomExpanded && (
            <View style={styles.infoContainer}>
              <View style={styles.bullet}></View>
              <Text>{this.props.information.room} </Text> 
            </View>
        )}
        <TouchableOpacity onPress={() => this.setState({triggersExpanded: !this.state.triggersExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.categoryText}>Known Triggers     </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.triggersExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.triggersExpanded && (
            this.props.information.knownTriggers.map((trigger) => {
              return(
                <View style={styles.infoContainer}>
                  <View style={styles.bullet}></View>
                  <Text>{trigger} </Text> 
                </View>
              )
            })
        )}
        <TouchableOpacity onPress={() => this.setState({soothingExpanded: !this.state.soothingExpanded})} style={styles.dropdownContainer}>
            <Text style={styles.categoryText}>Soothing Techniques      </Text>
            <Icon style={styles.collapseIcon} size={24} name={this.state.soothingExpanded ? "chevron-up" : "chevron-down"}></Icon>
        </TouchableOpacity>
        {this.state.soothingExpanded && (
            this.props.information.soothingMethods.map((method) => {
              return(
                <View style={styles.infoContainer}>
                  <View style={styles.bullet}></View>
                  <Text>{method} </Text> 
                </View>
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
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 16,
  },
  collapseIcon: {
      marginRight: 16
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
bullet: {
  height: 10,
  width: 10,
  borderRadius: 10,
  marginHorizontal: 20,
  backgroundColor: '#a9a9a9'
},
infoContainer: {
  width: Dimensions.get('window').width,
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);