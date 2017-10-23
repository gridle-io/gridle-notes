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
      password:'',
      error:[]
    }
    
    }
    handleClick(event) {
      var apiBaseUrl = "http://localhost/";
      var self = this;
      var payload = {
        "email": this.state.username,
        "password": this.state.password
      }
      axios.post(apiBaseUrl + 'login', payload)
      .then(response => {
        
        if (response.status == 200) {
          localStorage.setItem('auth_token', 'Bearer '+response.data.jwt);
          localStorage.setItem('user_id',response.data.user_id);
          console.log("Login successfull");
          this.props.appContext.handleClose();
          
             }

           })
           .catch(error => {
             if (error.response.status == 401) {
               this.setState({
                 error: error.response.data
               })
             }
            
           });
       }
        render() {
            return (
                  <div>
                    <p className="error">{this.state.error.error}</p>
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