import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';


const style = {
    margin: 15,
   };
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
        username:'',
        password:''
        }
       }
       handleClick(event){
        var apiBaseUrl = "http://localhost/";
        var self = this;
        var payload={
        "email":this.state.username,
        "password":this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
      
        if(response.status == 200){
        console.log("Login successfull");      
        }
        else if(response.status == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        }
        render() {
            return (
                  <div>
                   <TextField
                     hintText="Enter your Username"
                     floatingLabelText="Username"
                     onChange = {(event,newValue) => this.setState({username:newValue})}
                     />
                   <br/>
                    <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Log in" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

              </div>
            );
          }
        
}