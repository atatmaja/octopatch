import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';

class Notifications extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Biometrics</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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