import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
        <View>
            <View style={[styles.container, {width: screenWidth}]}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{...StyleSheet.absoluteFillObject}}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
            </View>
            <View style={styles.container}>
                    <Text>Home</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);