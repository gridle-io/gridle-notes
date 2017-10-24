import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      registationStatus:'',
      error:''
    }
  }



  handleClick(event){
    var apiBaseUrl = "http://localhost";
    // console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "first_name": this.state.first_name,
    "last_name":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'/register', payload)
   .then((response) =>{
       
    if(response.status==201){
      this.setState({'error':response.data.error});
      console.log(this.state.error);
    }
         if (response.status == 200) {
          this.setState({'error':''});
          this.setState({registationStatus:true});
            localStorage.setItem('auth_token', 'Bearer '+response.data.jwt);
            localStorage.setItem('user_id',response.data.user_id);
            console.log("Login successfull");
            // console.log(this.props);
            this.props.appContext.handleClose();
            
               
  
       console.log("registration successfull");
       
      //  var loginscreen=[];
      //  loginscreen.push(<Login key={1} parentContext={this} appContext={this.props.appContext}/>);
      //  var loginmessage = "Not Registered yet.Go to registration";
      //  self.props.parentContext.setState({loginscreen:loginscreen,
      //  loginmessage:loginmessage,
      //  buttonLabel:"Register",
      //  isLogin:true
      //   });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  handleEmail(newValue){
  
    this.setState({email:newValue});
    this.validateField('email', newValue);

    
  }
  handlePassword(newValue){
    
      this.setState({password:newValue});
      console.log(this.state);
      this.validateField('password', newValue);
      console.log(this.state);
      
      
    }

  
        
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        var p = value,
        errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters"); 
        }
        if (p.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter.");
        }
        if (p.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit."); 
        }
        if (errors.length > 0) {
            passwordValid=false;
            
        }
        else{
            passwordValid=true;
        }
        fieldValidationErrors.password = passwordValid ? '': errors;
        

        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
                  
  }
  
 
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  
  render() {
    return (
 
          <div>
            <p>{this.state.error}</p>
            <h3 hidden={!this.state.registationStatus}>Registration Done successfully</h3>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
          
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.handleEmail(newValue)}
             />
             <p hidden={this.state.emailValid}>Please enter proper email</p>
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.handlePassword(newValue)}
             />
             <p hidden={this.state.passwordValid}>
               {this.state.formErrors.password}</p>
           <br/>
           <RaisedButton 
           disabled={!this.state.formValid}
           label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        
    
    );
  }
}
const style = {
  margin: 15,
};
export default Register;