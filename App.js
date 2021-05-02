import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
text:'',
isSearchPressed:false,
"word":"",
"definition":"",
"lexicalCategory":""

    }
  }

  getWord=(word)=>{
    var  searchKeyword= word.toLowerCase()
    var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+'.json'

 return fetch(url)
 .then((data)=>{
if(data.status===200){
return data.json()
}
else{
return null
}
 })
 .then((response)=>{
var responseObject=response
if(responseObject){
var wordData=responseObject.definition
var definition=wordData.description
var lexicalCategory=wordData.wordType

this.setState({
    "word": this.state.text,
    "definition":definition,
    "LexicalCategory":lexicalCategory
})

}
else{
 this.setState({
     "word":this.state.text,
     "definition":"not found"
 })
}
 })

 }

  render(){
  return (
    <View style={styles.container}>

<View style={styles.inputBoxContainer}>
      <TextInput
      style={styles.inputBox}
      onChangeText={(text)=>{
        this.setState({text:text, isSearchPressed:false})
        
      }} value={this.state.text}/>

<View >
<TouchableOpacity style={styles.goButton} onPress={()=>{
        this.setState({isSearchPressed:true})
        this.getWord(this.state.text)
      }}> <Text style={{textAlign:'center'}}> search </Text> </TouchableOpacity>
</View>
<View>
<Text>
  Word:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.word}
</Text>
</View>

<View>
<Text>
  Definition:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.definition}
</Text>
</View>

<View>
<Text>
  Lexical Category:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.lexicalCategory}
</Text>
</View>
</View>
     
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none'
  },
  goButton:{
    width: 105,
    height: 35,
    alignSelf: 'center',
    justifyContent:'center',
    padding: 10,
    margin:10,
    backgroundColor:'orange'
  },
  inputBoxContainer:{
 flex:0.3,
 justifyContent:'center',
 alignItems:'center'
  }
});
