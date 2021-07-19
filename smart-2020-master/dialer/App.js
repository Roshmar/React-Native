import { StatusBar } from 'expo-status-bar';
import React, {Component}from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { ceil, color } from 'react-native-reanimated';
import  SvgPhone from './src/iconComponent/Phone';
import SvgBackspaceOutline from './src/iconComponent/BackspaceOutline';
import SvgDeclineCall from './src/iconComponent/declineCall';
import Communications from 'react-native-communications';




export default class App extends Component {

    
    constructor(){
      super();
      this.state = {
        screenNumber:"",
        screenText:"",
        buttons: "",
        flag: true,
      }
      
    }
    
    

    createButtonDel(value){
        const buttonDel = (
          <TouchableOpacity 
            style = {styles.deleteBtn} 
            onPress={() =>this.Delete()}
            onLongPress={()=> this.DeleteAll()}
            > 
              <SvgBackspaceOutline
                  style={styles.iconStyleDelBtn}
              /> 
          </TouchableOpacity>
        )
        if(value){
          this.setState({
            buttons: buttonDel
          })
        }else{
          this.setState({
            buttons:null
          })
        }
         
    }

    getValue(value){ 
      if(this.state.screenText.length < 20 ){
        this.setState({
          screenText: this.state.screenText+value,
          screenNumber: (((this.state.screenText.length>1)?this.state.screenText.length-1:this.state.screenText.length)% 3 == 0)?this.state.screenNumber+' '+value:this.state.screenNumber+value,
      },
        this.createButtonDel(true)
        
      )}  
    }

    Delete(){
      let text = this.state.screenText.split('')
      
      text.pop()
      this.setState({
        screenText:  text.join(''),
        screenNumber: ""
      })
      let screenTextLenght =  this.state.screenText.length
      let numb = "" 
      
        for(let i=0; i < screenTextLenght-1;++i){
          numb = (((i>1)?i-1:i)% 3 == 0)?numb+' '+this.state.screenText[i]:numb+this.state.screenText[i]
        }
      
      this.setState({ 
        screenNumber: numb
      })
    }
    DeleteAll(){
      this.setState({
        screenText:"",
        screenNumber:"",
      }) 
    }

    render(){
      
    return (
  
    <View style={styles.root_style}>
       <View style={styles.header}> 
        <Text style={styles.textHeader}>Phone</Text>
       </View>
       <View style={styles.mainScren}> 
           <View style={styles.mainScreenNumber}>
              <Text style={styles.textMainScreen}>
                {this.state.screenNumber}
              </Text>
           </View>
            
          
          {(this.state.screenText.length >0)?this.state.buttons:null}
       </View>

       <View style={styles.keyBoard}>
        <View style={styles.keyboardRow} >
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('1')}>
                <Text style={styles.mainTextStyle}>1</Text>
                <Text style={styles.secondTextStyle}>o_o</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.midButton} onPress={() => this.getValue('2')}>
                <Text style={styles.mainTextStyle} >2</Text>
                <Text style={styles.secondTextStyle}>ABC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyboardButton}  onPress={() => this.getValue('3')}>
                <Text style={styles.mainTextStyle}>3</Text>
                <Text style={styles.secondTextStyle}>DEF</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboardRow}>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('4')}>
                <Text style={styles.mainTextStyle } >4</Text>
                <Text style={styles.secondTextStyle}>GHI</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.midButton} onPress={() => this.getValue('5')}>
                <Text style={styles.mainTextStyle} >5</Text>
                <Text style={styles.secondTextStyle}>JKL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('6')}>
                <Text style={styles.mainTextStyle} >6</Text>
                <Text style={styles.secondTextStyle}>MNO</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboardRow}>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('7')}>
                <Text style={styles.mainTextStyle} >7</Text>
                <Text style={styles.secondTextStyle}>PQRS</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.midButton} onPress={() => this.getValue('8')}>
                <Text style={styles.mainTextStyle} >8</Text>
                <Text style={styles.secondTextStyle}>TUV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('9')}>
                <Text style={styles.mainTextStyle} >9</Text>
                <Text style={styles.secondTextStyle}>WXYZ</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lastRow}>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('*')}>
                <Text style={styles.twoTextStyle} >*</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.midButton} 
                onPress={() => this.getValue('0')}
                onLongPress={()=> ((this.state.screenText.length == 0)?this.getValue('+'):this.getValue('0'))}
                >
                  <Text style={styles.mainTextStyle}>0</Text>
                  <Text style={styles.secondTextStyle}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyboardButton} onPress={() => this.getValue('#')}>
                <Text style={styles.twoTextStyle}>#</Text>
              </TouchableOpacity>
            </View>
        </View>  

       <View style={styles.footer}> 
          <TouchableOpacity 
            style = {(this.state.flag)?styles.footerButtonCall:styles.footerButtonDeclime}
            onPress={() => ((this.state.flag&&this.state.screenText.length>0)?(Communications.phonecall((this.state.screenText.length != 0)?this.state.screenText: null,true),this.setState({flag:false})):(this.setState({flag:true}),this.DeleteAll()))}
          >
            {(this.state.flag)?<SvgPhone style={styles.iconStyle}/>:<SvgDeclineCall style={styles.iconStyle}/>}
          </TouchableOpacity>
       </View>
    </View>
  );
}

}
const styles = StyleSheet.create({
  iconStyleDelBtn:{
    color:'#000000',
  },
  iconStyle:{
    color: '#ffffff',
  },
  textHeader:{
    color: '#ffffff',
    fontSize: 20,
    marginTop: 8,
    marginLeft: 16,
  },
  lastRow:{
    flex:1,
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderBottomWidth:1,
    borderTopWidth:1,
  },
  midButton:{
    flex:1,
    borderColor: '#CDCDCD',
    borderLeftWidth:1,
    borderRightWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  header:{
    flex:1,
    backgroundColor: 'green'
  },
  mainScren:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'center',
    flex:2,
    backgroundColor:'#ffffff'
  },
  mainScreenNumber:{
    flex:5,
    alignItems:"center",
  },
  textMainScreen:{
    color:'#000000',
    fontSize:35,
    fontWeight: "bold",
  },
  deleteBtn:{
    flex:1, 
    right:0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  
  keyBoard:{
    flex:3,
  },
  keyboardRow:{
    flex:1,
    flexDirection: 'row',
    borderColor: '#CDCDCD',
    borderTopWidth:1,
  },
  keyboardButton:{
    flexDirection:'column',
    flex:1,
    borderColor: '#CDCDCD',
    backgroundColor:'#ffffff',
    
    alignItems:'center',
    justifyContent:'center'

  },
  mainTextStyle:{
    color:'#000000',
    fontSize:35,
    marginBottom:-5,
    padding:0,
  },
  secondTextStyle:{
    alignContent:'flex-start',
    marginBottom:10,
    color:'#000000',
    opacity:0.40,
    fontSize: 12,
    fontWeight: 'bold',
  },
  twoTextStyle:{
    color:'#000000',
    fontSize:35,
  },



  footer:{
    flexDirection: 'row',
    justifyContent: "space-around",
    flex:1,
    backgroundColor:'#ffffff',
    alignItems: "center",
  },
  
  footerButtonCall:{
    width: 100,
    height:40,
    borderRadius:32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'green',
    
  },
  footerButtonDeclime:{
    width: 100,
    height:40,
    borderRadius:32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'red',
    
  },
  callButton:{
    marginTop:-5,
    alignItems: "center",
    justifyContent: "center",
    color:'#ffffff',
    fontSize:30,
  },
 
  root_style:{
    flex:1,
  }
  
});
