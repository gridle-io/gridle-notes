import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import NoteMenu from './NoteMenu';
import CheckListNote from '../Card/checkbox';
import axios from 'axios';


  
class Note extends Component{


constructor(props) {
    super(props);
    this.state = { 
      shadow: 1 ,
      notes:this.props.notes,
    }
    this.handleClick=this.handleClick.bind(this);
  }
 


  editNote(key){
   console.log(key);
   this.props.edit(key);
   
  }
  handleClick(props){

    console.log("from note");

    console.log(props);
    
    this.props.delete(props);
  }

  render(){
  
  // console.log(this.props.notes);
  return(
    <div className="note-list">

      {this.props.notes.map(note => (
        
            <Paper className="note-container" 
                    key={note.note_id}
                  
                    zDepth={this.state.shadow} 
                    children={
                        <div className="note" onClick={event=> {this.editNote(note.note_id)}}>
                          <div className="note-data" >
                            
                              {note.title=="Title" || note.title=="" ? '':
                                <h3 >{note.title}</h3>
                              }
                    
                              {note.checked  ?
                                  <div className="list"> 
                                    {note.data.map(checklist => (
                        
                                                <CheckListNote key={checklist.id} label={checklist.checkdata} checked={checklist.checked} />
                                            ))}
                                  </div>
                                  : //else
                                  <p>{note.data}</p>
                              } 
        
                          </div>
                          {/* <button onClick={this.handleClick.bind(this)}>Click me</button> */}
                          <NoteMenu delete={this.handleClick.bind(this)} id={note.note_id}/>
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

