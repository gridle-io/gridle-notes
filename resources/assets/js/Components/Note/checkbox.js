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
        marginRight:0,
        height:16,
        width:16
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
            is_checked: this.props.is_checked,
            label:this.props.label
          }
          this.updateLabel=this.updateLabel.bind(this);
      }
     updateCheck() {
      console.log('ids',this.props.id);
    //   console.log("props", this.props);
      // this.setState({is_checked: !this.state.is_checked});
      this.props.update(this.props.id ,this.props.note_id);
    }
    updateLabel(){
      this.props.updateLabel(this.props.id,this.props.note_id);
      console.log("clicked",this.props.id,this.props.note_id);
    }
    render() {
      return (
        <div className="create-checked">
          <Checkbox
             className="checkbox"
              checked={this.props.is_checked}
              onCheck={this.updateCheck.bind(this)}
              style={{
                width: '10%',
                margin: '0'
              }}
              iconStyle={styles.icon}/>
            <p style={{textDecoration:
                !this.props.is_checked ? "none" : "line-through"
              }} onClick={this.updateLabel.bind(this)}>{this.props.label}</p>

        </div>
        )
    }
}  

export default CheckListNote;