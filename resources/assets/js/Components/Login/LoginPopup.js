import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Loginscreen from './Loginscreen'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */

const customContentStyle = {
    width: '50%',
    padding:0,
    
    height:'100%',
    maxWidth: 'none',
  };
export default class LoginPopup extends React.Component {
    constructor(props){
    super(props)
        this.state = {
            open: true,
            loginPage:[],
           
        };
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
    }

    componentWillMount(){
      var loginPage =[];
      loginPage.push(<Loginscreen key={1} parentContext={this}  />);
      this.setState({
                    loginPage:loginPage
                      })
    }
  handleOpen(){
    this.setState({open: true});
    
  };

  handleClose() {
    this.setState({open: false});
    this.props.login();
  };

  render() {
  

    return (
      <div>
        <Dialog
          title="Login / Sign up"
          contentStyle={customContentStyle}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        {this.state.loginPage}
       
        {/* <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      /> */}
        </Dialog>
      </div>
    );
  }
}