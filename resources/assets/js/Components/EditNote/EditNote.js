import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenuAction from '../Card/IconMenu';
import NoteMenu from '../Note/NoteMenu';
import ContentEditable from 'react-contenteditable';
import CheckListNote from '../Card/checkbox';
import Add from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {White,red500,grey300,grey200,grey500,Black}
from 'material-ui/styles/colors';




const styles={
  buttonstyle :{
      margin: 12,
  },
  textareaStyle:{
      
      height:30,
   },
    hintStyle:{
      
  bottom:0
   },
   title:{
      color:Black,
      bottom:0
   }
}


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class EditNote extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
          title: this.props.note.title,
          data: this.props.note.data,
          firstTimeFocus: false,
          note:this.props.note
      }   
      this.handleClose=this.handleClose.bind(this);
      this.handleOpen=this.handleOpen.bind(this);
    
      this.focus = this.focus.bind(this);
      this.handleDataChange=this.handleDataChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleTitleChange=this.handleTitleChange.bind(this);
      
  }



  focus() {
    this.input.focus();
}


handleSubmit(event){
             
                    this.props.ToggleCreateNote(this.state.title,this.state.data);
                    this.setState({title:"Title",data:""})
                    this.setState({done: true})
                    this.setState({firstTimeFocus: false})
                    console.log(this.state);


}


handleTitleChange(evt){
    this.setState({ title: evt.target.value });  
}

handleDataChange(evt){
    this.setState({ data: evt.target.value });
}

  handleOpen(){
   this.props.openEdit();
  };

  handleClose(){
    this.props.openEdit();
  };

  render() {
    
    console.log('state of edit text',this.state);
    console.log('props of edit text',this.props);
    const focusUsernameInputField = input => {
      
      if (input && !this.props.click && !this.state.firstTimeFocus) {
          setTimeout(() => {
              input.focus();
              this.state.firstTimeFocus = true;
          }, 100);
      }
  };
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>

        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
        <h3>
                        <TextField
                                ref='title'
                                hintText={this.state.title}
                                fullWidth={true}
                                className="add-checkbox-data"
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                                onKeyPress={this._handleEnter}
                                underlineShow={false}
                                style={styles.textareaStyle}
                                hintStyle={styles.title}
                        /> 
                       
                    </h3>           
                    <h3>
                        <TextField

                                
                        ref={focusUsernameInputField}
                                hintText={this.state.data}
                                fullWidth={true}
                                className="add-checkbox-data"
                                value={this.state.data}
                                onChange={this.handleDataChange.bind(this)}
                                onKeyPress={this._handleEnter}
                                underlineShow={false}
                                style={styles.textareaStyle}
                                hintStyle={styles.title}
                        
                         /> 
                       
                    </h3>                  
                    <div className="create-note-bottom">

                        <NoteMenu />

                    </div>

                
        </Dialog>
      </div>
    );
  }
}