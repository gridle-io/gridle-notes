import React ,{Component}from 'react';
import ReactDOM from 'react-dom';


import Card  from './Components/Card/Card';
import Note from './Components/Note/Note';




class Dashboard extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {notes:[]};
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
  }

  editNote(props){
    var notes=this.state.notes;
    var note=notes.filter(function(item) { return item});
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
      "id":id,
      "checked":checked,
      "title":title,
      "data":data
    }
    this.setState({ notes: this.state.notes.concat(newnote) })
  }
  render (){
    return(
      <div className="main-area">
          <Card addnote={this.addnote.bind(this)}/>
          <Note notes={this.state.notes} delete={this.deleteNote.bind(this)} edit={this.editNote.bind(this)}/>
        </div>
      );
    }
}


export default Dashboard;