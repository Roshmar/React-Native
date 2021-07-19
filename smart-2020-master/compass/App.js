import React, { Component } from 'react';
import {Image, StyleSheet, NativeEventEmitter, Dimensions} from 'react-native';
import {Text, View } from 'native-base';
import RNDeviceRotation from 'react-native-device-rotation';
import Orientation from 'react-native-orientation-locker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

 
export default class App extends Component {

  
  constructor(props) {
    super(props);
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    this.state = {
      isOn:true,
      absolute:false,
      alpha: 0,
      beta:0,
      gamma: 0,
      grad: 0,
      x:0,
      y:0,
      z:0,
    };

  }

  
  
  compassHeading = (alpha,beta,gamma) => {
  var degtorad = Math.PI / 180;


  var _x = beta  ? beta  * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }


  var p = compassHeading * ( 180 / Math.PI )
  p = p.toFixed(0)
  return p
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
    //Orientation.unlockAllOrientations()

    const subscription = accelerometer.subscribe(({x,y,z}) => {
      this.setState({
        x:x,
        y:y,
        z:z
      });
    })
    this.compassID = setInterval(() => this.compassHeading, 1000 * 0,5);
    const orientationEvent = new NativeEventEmitter(RNDeviceRotation)
    this.onOrientationChanged = orientationEvent.addListener('DeviceRotation', event =>{
      this.setState({
        absolute:event.absolute,
        alpha: event.roll,
        beta:  (this.state.z>=0)?-event.pitch+89:event.pitch-89,
        gamma: event.azimuth,
        grad: this.compassHeading(this.state.alpha,this.state.beta,this.state.gamma),
      })
     })
  RNDeviceRotation.start()
  }

  componentDidUpdate(){
    RNDeviceRotation.start()
  }
  
  toggleState() {
    const { isOn } = this.state;
    this.setState({ isOn: !isOn });
}

  render() {
   
    const screenCompass = (
        <View style={ styles.content }>
        <Image 
          source={require("./assets/compass.png")} 
          resizeMode={'contain'}
          style={{padding:20, width: width*0.9, height: width*0.9, transform: [{rotate: this.state.grad  + "deg"}]}}
        />
         <Text style={{color:'#737373', paddingTop:30,fontSize:20}}>{this.state.grad}</Text>
      </View>)

    const screenDegree =(
      <Text style={{color:'#737373', paddingTop:30,fontSize:50}}>{this.state.grad}</Text>
    )
    
    

    return (
              
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Compass</Text>
        </View>
        <View style={ styles.content }>
          {(this.state.isOn)?screenCompass:screenDegree}
        </View> 
        <View style={styles.footer}>
            <View style={styles.footerButtons}>
              <TouchableOpacity full
               
               onPress={this.toggleState.bind(this)}
              >
                <Text style={{color:'#fff'}}>{(this.state.isOn)?'Compass':'Degrees'}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this.compassID);
     this.onOrientationChanged.remove()
  }
 
}

const {width,height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
  },
  header:{
    flex:1,
    
    backgroundColor:'#008577',
    paddingLeft:15,
    alignItems:'flex-start',
    justifyContent:"center",
  },
  headerText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:24,
  },
  content:{
    flex:8,
    alignItems: "center",
    justifyContent: "center"
  },
  footer:{
    flex:1,
    flexDirection:'row',
  },
  footerButtons:{
    flex:1,
    padding:0,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderColor:"#fff",
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:"#008577"
  }
});
