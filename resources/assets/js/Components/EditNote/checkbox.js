import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import InlineEdit from 'react-edit-inline';



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
          this.editLabel=this.editLabel.bind(this);
          this.dataChanged = this.dataChanged.bind(this);
      }

      dataChanged(label ) {
        // data = { description: "New validated text comes here" } 
        // Update your model from here 
        console.log(label)
        this.setState({...label})
        this.props.handleLabelChange(label, this.props.id);
    }
     updateCheck() {
      console.log('ids',this.props.id);
      this.props.update(this.props.id ,this.props.note_id);
    }
    
    editLabel(){
      // this.props.updateLabel(this.props.id,this.props.note_id);
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
                width: '5%',
                margin: '0'
              }}
              iconStyle={styles.icon}/>
            {/* <p style={{textDecoration:
                !this.props.is_checked ? "none" : "line-through"
              }} onClick={this.editLabel.bind(this)}>{this.props.label}</p> */}
              <InlineEdit
             
              activeClassName="editing"
              text={this.state.label}
              paramName="label"
              change={this.dataChanged}
              style={{
               
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
              style={{textDecoration:
                !this.props.is_checked ? "none" : "line-through"
              }}
            />
              

        </div>
        )
    }
}  

export default CheckListNote;