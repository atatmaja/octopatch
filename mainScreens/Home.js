import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import BleManager from 'react-native-ble-manager';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
        patients: [
            {name: "William Neil", id: 1, location: {latitude: 43.4729, longitude: -80.5400}, isStressed: true},
            {name: "Leslie Johnsonberg", id: 2, location: {latitude: 43.4728, longitude: -80.5400}, isStressed: true},
            {name: "Brock Thorn", id: 3, location: {latitude: 43.4729, longitude: -80.5401}, isStressed: false},
            {name: "Jasmine Kepernick", id: 4, location: {latitude: 43.4727, longitude: -80.54005}, isStressed: false},
            {name: "Casper Seretoni", id: 5, location: {latitude: 43.4729, longitude: -80.5399}, isStressed: false},
        ]
    }
  }

  componentDidMount(){
  }

  renderPatientStatus(){
    return this.state.patients.map((patient) => {
        return (
            <View style={{flexDirection: 'row', marginHorizontal: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: "#d3d3d3"}}>
                <View style={{flex: 0, width: 10, backgroundColor: 'blue', marginRight: 15}}></View>
                <View style={{paddingVertical: 8, flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 18}}>{patient.name}</Text>
                    </View>
                    <View style={{flex: 0, marginHorizontal: 15}}>
                        <View style={[styles.statusDot, {backgroundColor: patient.isStressed ? 'red' : 'green'}]}></View>
                    </View>
                </View>
            </View>
        )
    })
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
        <View>
            <Text style={styles.subtitle}>Patient Location</Text>
            <View style={[styles.containerTop, {width: screenWidth}]}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{...StyleSheet.absoluteFillObject}}
                    region={{
                        latitude: 43.472923,
                        longitude: -80.540087,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                >
                    {this.state.patients.map((patient) => {
                        return(
                            <Marker
                                coordinate={patient.location}
                                title={patient.name}
                                pinColor={patient.isStressed ? 'red' : 'green'}
                            />
                        )
                    })}
                </MapView>
            </View>
            <Text style={styles.subtitle}>Patient Status</Text>
            <View style={styles.containerBottom}>
                {this.renderPatientStatus()}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBottom: {
    flex: 1,
  },
  subtitle: {
      marginLeft: 16,
      fontWeight: 'bold',
      fontSize: 18,
      marginVertical: 8
  },
  statusDot: {
    height: 20,
    width: 20,
    borderRadius: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);