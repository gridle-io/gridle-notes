import React ,{Component}from 'react';
import ReactDOM from 'react-dom';


import Card  from './Components/Card/Card';
import Note from './Components/Note/Note';

import EditNote from './Components/EditNote/EditNote';
import axios from 'axios';






class Dashboard extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
            notes:[],
            isopenEditpopup:false,          
    };
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.openEditPopup=this.openEditPopup.bind(this);
    
  }
  componentDidMount() {
    console.log("mounted");
    axios.get(`http://localhost/api/notes/`)
      .then(res => {
        console.log(res.data);
        this.setState({ notes:res.data });
      });
  }

  openEditPopup(){
    this.setState({isopenEditpopup:true});
    console.log(this.state.isopenEditpopup);
  }


  editNote(props){
   
    this.openEditPopup();
    // var notes=this.state.notes;
    
    // var note=notes.filter(function(item)
    // {
    //     if(item.note_id == props){
    //       { return item};
    //     }
    //   });
 
  }
  deleteNote(props){
    // var arr=this.state.notes;
    // arr = arr.filter(item => item.note_id !== props);
    // this.setState({notes:arr});
    // console.log(arr);
    console.log('delete this note -->>>>>>',props);
    
    var notes=this.state.notes;
    var note=notes.filter(function(item)
    {
      if(item.note_id == props){
        { return item};
      }
    });
    console.log('Note', note);
     
  }


  addnote(title,data,checked){
    var that=this;
    checked = checked || false;
    axios.post('http://localhost/api/notes/', {
     
      "title":title,
      "data":data,
      "is_checklist":1
    })
    .then(function (response) {
      console.log('resp',response.data);
      let notearrr =that.state.notes;
      console.log(notearrr);
      notearrr.push(response.data);
      // console.log(notearrr);
      that.setState({ notes:notearrr });
      // this.setState({notes:this.state.notes.push()})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render (){
    // console.log("dsdsd",this.state.notes);
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