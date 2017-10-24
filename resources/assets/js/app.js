import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Header from './Components/Header/Header';
import Dashboard from './Dashboard';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import DrawerLeft from './Components/Drawer/DrawerLeft.jsx';
import LoginPopup from './Components/Login/LoginPopup';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: grey100,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 60,
  },
});


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      processing:false,
      isLoggedin:'',
      activeComponent:[],
      user_id:'',
    }

    this.login=this.login.bind(this);

  }

  reset(){
    if (localStorage.getItem("auth_token")) {
      this.setState({isLoggedin:true});
      this.setState({activeComponent:<Dashboard parentContext={this} user_id={this.state.user_id}/>})
    }
    else {
      this.setState({isLoggedin:false});
      console.log(this.state);
      this.setState({activeComponent:<LoginPopup login={this.login.bind(this)}/>})
      
      this.forceUpdate();
    }
    console.log(this.state);

  }
  componentDidMount() {
    
    console.log(this.state);
    
    this.reset();
      }
      login(){
        console.log("Loading Notes");
        this.setState({isLoggedin:true});
        this.setState({activeComponent:<Dashboard user_id={this.state.user_id}/>}) 
        
      }
  render(){
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header appContext={this} processing={this.state.processing} />
          <div className="main-container">
              <DrawerLeft  />
              {this.state.activeComponent}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;