import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import ListView from 'material-ui/svg-icons/action/view-stream';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import ProfileMenu from './ProfileMenu';
import CircularProgress from 'material-ui/CircularProgress';

const CircularProgressExampleSimple = () => (
  <div>
    <CircularProgress />
    <CircularProgress size={60} thickness={7} />
    <CircularProgress size={80} thickness={5} />
  </div>
);




export default class HeaderMenu extends Component {

    render(){
        return(

            <div>
                <div className="header-menu">
                <IconButton tooltip="Synchronized" >
                        <CloudDone />
                        </IconButton>
                <IconButton tooltip="Synchrinizng" >
                        <CircularProgress size={25} thickness={3} color="#000"/>
                        </IconButton>
                    <IconButton tooltip="Refresh" >
                        <Refresh hoverColor='#fff'/>
                    </IconButton>

                    <IconButton tooltip="List view" >
                            <ListView hoverColor='#fff'/>
                    </IconButton>
                </div>
                <ProfileMenu className="profile-menu"/>
            </div>
)
}

}
 
