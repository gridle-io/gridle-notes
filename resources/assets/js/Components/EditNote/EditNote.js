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
import axios from 'axios';




const styles={
 dialogStyle:{
width:500,
 },
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
          note:props.note,
      };

      this.handleClose=this.handleClose.bind(this);
      
    
      this.focus = this.focus.bind(this);
      this.handleDataChange=this.handleDataChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleTitleChange=this.handleTitleChange.bind(this);
      this.deletecheckbox=this.deletecheckbox.bind(this);
      
  }
deletecheckbox(id){
  axios.delete('http://localhost/api/checkbox/'+id );  
  var arr=this.state.checklist;
  
  console.log("dashboqard",arr);
  arr = arr.filter(item => item.id !== id);
  this.setState({checklist:arr});
  console.log(arr);

   
}


  focus() {
    this.input.focus();
}


handleSubmit(event){
 

  console.log("called form edit note");
  let editedNote=this.state.note;
  editedNote.title=this.state.title;
  editedNote.data=this.state.data;
  editedNote.checklist=this.state.checklist;
  this.props.submitEditedNote(editedNote);
  this.props.openEdit();
  


}


handleTitleChange(evt){
    this.setState({ title: evt.target.value });  
}

handleDataChange(evt){
    this.setState({ data: evt.target.value });
}

handleLabelChange(label,id){
  
   var checklist= Object.assign([],this.state.checklist); 
   console.log("handle label",checklist);
   checklist=checklist.map((checkbox)=>{
    if(checkbox.id==id){
      checkbox.label=label.label;
      console.log("changed" ,checkbox);
      return checkbox;
    }
    else {
      return checkbox;
    }});
    this.setState({checklist:checklist});
    console.log("after change in checklist",checklist);
  console.log('label to be changed',label,id);

}

handleCheck(checkbox_id,note_id){
  
  console.log("checkbox ",checkbox_id);
  console.log("checkbox note ",note_id);
  console.log("qqqqq ",this.state);
  let checklist=Object.assign([],this.state.checklist);
  checklist=checklist.map((checkbox)=>{
    
    if(checkbox.id==checkbox_id){
      checkbox.is_checked=!checkbox.is_checked;
      return checkbox;
    }
    else {
      return checkbox;
    }
  });
  console.log("after change",checklist);
  console.log("asdasd",this.state);


 this.setState({checklist:checklist});
 

}
  handleClose(){

    
    console.log("called form edit note",this.state);
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
      
      {/* <NoteMenu /> */}
                   
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
          contentStyle={styles.dialogStyle}
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
            {this.state.checklist.map((checklist,i )=> (
                                                  
                          <CheckListNote 
                            key={i} 
                            delete={this.deletecheckbox.bind(this)}
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