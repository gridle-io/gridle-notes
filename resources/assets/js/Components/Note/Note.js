import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import NoteMenu from './NoteMenu';
import CheckListNote from '../Card/checkbox';
import axios from 'axios';


  
class Note extends Component {


constructor(props) {
    super(props);
    this.state = { 
      shadow: 1 ,
      notes:this.props.notes,
    }
    this.handleDelete=this.handleDelete.bind(this);
  }
 
  EditNote(key){

   console.log(key);
   this.props.edit(key);
//   axios.update('http://localhost/api/notes/{id}'+props );
   
  }
  handleDelete(props){

    console.log("delete from note" ,props);

  
  
    this.props.delete(props);
  }

  handleCheck(){

  }
  render(){ 
  
  console.log('notes',this.props.notes);
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
                                <h3 >{note.title}</h3>
                              }
                    
                              {note.is_checklist  ?
                                  <div className="list"> 
                                    {note.checklist.map((checklist,i )=> (
                        
                                                <CheckListNote key={i} label={checklist.label} is_checked={checklist.is_checked ? true :false} handlecheck={this.handleCheck.bind(this)} />
                                            ))}
                                  </div>
                                  : //else
                                  <p>{note.data}</p>
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

