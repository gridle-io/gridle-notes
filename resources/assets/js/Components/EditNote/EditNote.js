import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenuAction from '../Card/IconMenu';
import NoteMenu from '../Note/NoteMenu';
import ContentEditable from 'react-contenteditable';
import CheckListNote from './checkbox';
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


export default class EditNote extends React.Component {
  
    constructor(props) {
      console.log("hi from e",props);
      
      super(props);
      this.state = {
          title: props.note.title,
          data: props.note.data,
          is_checklist:props.note.is_checklist,
          checklist:props.note.checklist,
          firstTimeFocus: false,
          note:props.note
      };

      this.handleClose=this.handleClose.bind(this);
      
    
      this.focus = this.focus.bind(this);
      this.handleDataChange=this.handleDataChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleTitleChange=this.handleTitleChange.bind(this);
      
  }



  focus() {
    this.input.focus();
}


handleSubmit(event){
  this.props.openEdit();

  console.log("called form edit note");
  let editedNote=this.state.note;
  editedNote.title=this.state.title;
  editedNote.data=this.state.data;
  editedNote.checklist=this.state.checklist;
  this.props.submitEditedNote(editedNote);
  


}


handleTitleChange(evt){
    this.setState({ title: evt.target.value });  
}

handleDataChange(evt){
    this.setState({ data: evt.target.value });
}

handleLabelChange(label,id){
  var checklist=this.state.checklist;
  checklist= checklist.map((checkbox)=>{
    if(checkbox.id==id){
      checkbox.label=label.label;
      return checkbox;
      console.log("cahnged" ,checkbox);
    }
    else {
      return checkbox;
    }});

    console.log("after change in checklist",checklist);
  console.log('label to be changed',label,id);
  // this.setState({ data: evt.target.value });
}

handleCheck(checkbox_id,note_id){
  
  console.log("checkbox ",checkbox_id);
  console.log("checkbox note ",note_id);
  this.props.handleCheck  (checkbox_id,note_id);

}
  handleClose(){
    console.log("called form edit note");
    this.props.openEdit();
  }

  componentWillReceiveProps(props) {
    this.setState({note: props.note});
    this.setState({
      title:props.note.title, 
      data:props.note.data ,
      is_checklist:props.note.is_checklist,
      checklist:props.note.checklist});
      
      
    }
    render() {
      // console.log('afeter',this.state.note.checklist);
    const focusUsernameInputField = input => {
      
      if (input && !this.props.click && !this.state.firstTimeFocus) {
          setTimeout(() => {
              input.focus();
              this.state.firstTimeFocus = true;
          }, 100);
      }
  };
    const actions = [
      <div className="create-note-bottom">
      
      <NoteMenu />
                   
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
      
                </div>
      
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
                      value={this.state.title!=="Title" ? this.state.title:""}
                      onChange={this.handleTitleChange.bind(this)}
                      onKeyPress={this._handleEnter}
                      underlineShow={false}
                      style={styles.textareaStyle}
                      hintStyle={styles.title}/> 
                        
          </h3>  


          {this.state.is_checklist ? 
            <div className="list"> 
            {this.state.note.checklist.map((checklist,i )=> (
                                                  
                          <CheckListNote 
                            key={i} 
                            id={checklist.id}
                            label={checklist.label}
                            note_id={checklist.note_id} 
                            is_checked={checklist.is_checked ? true :false} 
                            update={this.handleCheck.bind(this)} 
                            handleLabelChange={this.handleLabelChange.bind(this)}
                            />
                      ))}
            </div>
          
           :       
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
                hintStyle={styles.title}/> 
          </h3>                  
          }
         
                
        </Dialog>
      </div>
    );
  }
}