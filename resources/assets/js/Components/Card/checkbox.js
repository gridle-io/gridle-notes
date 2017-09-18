import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ContentEditable from 'react-contenteditable';



const styles = {
   
    checkbox: {
      marginBottom: 0,
    },icon  :{
        marginRight:8
        

    },label:{
        textDecoration : "none"
    },
    input:{
        marginLeft:10,
        
    }
}

  class CheckListNote extends React.Component {
      constructor(props){
        super(props)
        this.state = {
            checked: this.props.checked,
            label:this.props.label
          }
      }
    
    
    updateCheck() {
      // console.log(this.props.id);
      // this.setState({checked: !this.state.checked});
      this.props.update(this.props.id);
    }
  
    render() {
      return (
        <div className="create-checked">
        <Checkbox
            label={this.state.label}
            checked={this.props.checked}
            onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
            iconStyle={styles.icon}
            labelStyle={{textDecoration:
              !this.props.checked ? "none":"line-through"
            }}
          />

          </div>
        )
    }
}  

export default CheckListNote;