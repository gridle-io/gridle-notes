import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Apps from 'material-ui/svg-icons/navigation/apps';
import Notification from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';

// const styles = theme => ({
//     badge: {
//       margin: `0 ${theme.spacing.unit * 2}px`,
//     },
//   });
export default class ProfileMenu extends Component {
    

  
        render(){
            return(
               <div className="profile-menu ">
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
                  </div>


            );
        
        
        }
    
    }