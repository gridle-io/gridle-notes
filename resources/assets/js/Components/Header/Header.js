import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';


import MenuItem from 'material-ui/MenuItem';
import HeaderMenu from './HeaderMenu';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

 class Header extends Component{    
  constructor() {
      super();
    this.state = {
        open: true    }
}  
//Toggle function (open/close Drawer)
toggleDrawer() {
    console.log("Hello");
    var d= document.getElementById('drawerleft');
    if(this.state.open){
        d.style.marginLeft = '-300px';
        this.setState({open:false});
        console.log(this.state);
    }else{  
        d.style.marginLeft = '0';
        this.setState({open:true});
        console.log(this.state);
    }


}

render (){
  return(
        <AppBar
        title="Keep Plugin"
        children={<HeaderMenu processing={this.props.processing} appContext={this.props.appContext}/>}
        onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} 
                />);
    }
}


export default Header;