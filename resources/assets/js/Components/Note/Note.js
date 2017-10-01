import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import NoteMenu from './NoteMenu';
import CheckListNote from './checkbox';
import axios from 'axios';


  
class Note extends Component {


constructor(props) {
    super(props);
    this.state = { 
      shadow: 1 ,
      notes:this.props.notes,
    }
    this.handleDelete=this.handleDelete.bind(this);
    this.handleCheck=this.handleCheck.bind(this);
    // this.editChecklist=this.editChecklist.bind(this); 
  }
 editTitle(key){
   this.props.edit(key,"title");
 }
  editNoteData(key){

   console.log(key);
   this.props.edit(key,"data");
//   axios.update('http://localhost/api/notes/{id}'+props );
   
  }
  handleDelete(props){

    console.log("delete from note" ,props);
    this.props.delete(props);
  }

  handleCheck(checkbox_id,note_id){
    
    console.log("checkbox ",checkbox_id);
    console.log("checkbox note ",note_id);
    this.props.handleCheck  (checkbox_id,note_id);
 
  }
  editChecklist(checkbox_id,note_id){
    console.log(checkbox_id,note_id);
    this.props.edit(note_id)
    console.log("this is editing of checked notes ")
  }

  
  render(){ 
  
 
  return(

    <div className="note-list">
      
      {this.props.notes.map((note,i) => (
        
            <Paper className="note-container" 
                    key={i}
                  
                    zDepth={this.state.shadow} 
                    children={
                        <div className="note" >
                          <div className="note-data" >
                             {note.title=="Title" || note.title=="" ? '':
                                <h3 onClick={event=> {this.editTitle(note.id)}}>{note.title}</h3>
                              }
                    
                              {note.is_checklist  ?
                                  <div className="list"> 
                                 {console.log('from note js ',  note.checklist)}
                                    {note.checklist.map((checklist,i )=> (
                                                  
                                                <CheckListNote 
                                                  key={i} 
                                                  id={checklist.id}
                                                  label={checklist.label}
                                                  note_id={checklist.note_id} 
                                                  is_checked={checklist.is_checked ? true :false} 
                                                  update={this.handleCheck.bind(this)} 
                                                  updateLabel={this.editChecklist.bind(this)}/>
                                            ))}
                                  </div>
                                  : //else
                                  <p onClick={event=> {this.editNoteData(note.id)}}>{note.data}</p>
                              } 
        
                          </div>
                          {/* <button onClick={this.handleClick.bind(this)}>Click me</button> */}
                          <NoteMenu delete={this.handleDelete.bind(this)} id={note.id}/>
                        </div>
                    }
              />
          ))
      }
    </div>
  );
}
}
  export default Note;

