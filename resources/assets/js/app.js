import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Components/Header/Header';
import Dashboard from './Dashboard';
import {White,cyan500,grey300,grey200,grey500}
from 'material-ui/styles/colors';
import DrawerLeft from './Components/Drawer/DrawerLeft.jsx';
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


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Header />
      <div className="main-container">
          <DrawerLeft  />
          <Dashboard />
      </div>
    </div>
  </MuiThemeProvider>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;