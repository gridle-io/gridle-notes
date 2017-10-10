import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List/List';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import ListView from 'material-ui/svg-icons/action/view-stream';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import ProfileMenu from './ProfileMenu';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import Apps from 'material-ui/svg-icons/navigation/apps';
import Notification from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';





export default class HeaderMenu extends Component {
    constructor(props){
        super(props);

        
    }

    render(){
        return(

            
                <div className="header-menu">
                <IconButton tooltip="Synchronized" >
                        <CloudDone />
                        </IconButton>
                <IconButton tooltip="Synchrinizng">
                        <CircularProgress size={25} thickness={3} color="#000"/>
                        </IconButton>
                    <IconButton tooltip="Refresh" >
                        <Refresh hoverColor='#fff'/>
                    </IconButton>

                    <IconButton tooltip="List view" >
                            <ListView hoverColor='#fff'/>
                    </IconButton>
                    <IconButton tooltip="Apps" >
                        <Apps hoverColor='#fff' />
                    </IconButton>


                    <Badge  badgeContent={""}
                            secondary={true}
                            className="notification"
                            badgeStyle={{top:10, right:10,width:10,height:10}}
                            >
                            <IconButton tooltip="Notifications">
                                <Notification hoverColor='#fff' />
                            </IconButton>
                    </Badge>
                    <div className="avtar">
                        <Avatar />
                    </div>
                </div>
            
)
}

}
 
