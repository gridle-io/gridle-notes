import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Header from './Components/Header/Header';
import Dashboard from './Dashboard';
import {White,cyan500,grey300,grey200,grey500}
from 'material-ui/styles/colors';
import DrawerLeft from './Components/Drawer/DrawerLeft.jsx';
import LoginPopup from './Components/Login/LoginPopup';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    textColor: White,
    primary1Color:grey500,
    primary2Color:grey300,
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
          <Header processing={this.state.processing} />
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