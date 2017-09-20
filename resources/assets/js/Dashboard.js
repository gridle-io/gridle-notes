import React ,{Component}from 'react';
import ReactDOM from 'react-dom';


import Card  from './Components/Card/Card';
import Note from './Components/Note/Note';

import EditNote from './Components/EditNote/EditNote';






class Dashboard extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
            notes:[],
            isopenEditpopup:true,          
    };
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.openEditPopup=this.openEditPopup.bind(this);
  }

  openEditPopup(){
    this.setState({isopenEditpopup:!this.state.isopenEditpopup});
    console.log(this.state.isopenEditpopup);
  }
  editNote(props){
    this.openEditPopup();
    var notes=this.state.notes;
    console.log(props);
    var note=notes.filter(function(item)
    
    {
        if(item.note_id == props){
          { return item};

        }

      });
    console.log(note);
  }
  deleteNote(props){
    var arr=this.state.notes;
    arr = arr.filter(item => item.id !== props);
    this.setState({notes:arr});
    // console.log(arr);

  }


  addnote(title,data,checked){
    checked = checked || false;
    var id=this.state.notes.length + 1;
    var newnote={
      "note_id":id,
      "checked":checked,
      "title":title,
      "data":data
    }
    this.setState({ notes: this.state.notes.concat(newnote) })
  }
  render (){
    return(
      <div className="main-area">
        <EditNote open={this.state.isopenEditpopup}/>
          <Card addnote={this.addnote.bind(this)}/>
          <Note notes={this.state.notes} delete={this.deleteNote.bind(this)} edit={this.editNote.bind(this)}/>
        </div>


      );
    }
}


export default Dashboard;