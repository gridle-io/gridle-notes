import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import Card  from './Components/Card/Card';
import Note from './Components/Note/Note';
import EditNote from './Components/EditNote/EditNote';
import axios from 'axios';
import clone from 'clone';


class Dashboard extends React.Component{
  
  constructor(props) {
    
    super(props);
    
    this.state = {
            notes:[],
            user_id:localStorage.getItem("user_id"),
            isopenEditpopup:false,     
            editablenote: [],
            processing:false,
    };
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.openEditPopup=this.openEditPopup.bind(this);
    this.editNote=this.editNote.bind(this);
    this.submitEditedNote=this.submitEditedNote.bind(this);    
    this.handleCheck=this.handleCheck.bind(this);
  }
  componentDidMount() {
    axios.defaults.headers.common['jwt'] = localStorage.getItem("auth_token");
    let user_id= localStorage.getItem("user_id");
    console.log(user_id);
    console.log("token is therer", localStorage.getItem("auth_token"));
    console.log("mounted");
    this.setState({user_id:user_id});
    console.log(this.state.user_id);
      axios.get(`http://localhost/api/notes/`+this.state.user_id)
        .then(res => {

          console.log(res.status);
          this.setState({notes: res.data});
        }).catch(function (error) {
        let error_status=error.response.status;

        if(error_status==400){
          localStorage.clear();
          this.props.parentContext.reset();
          }

          console.log(error.response.status);
        });

  }


  addnote(title, data, checked, checklist) {
    var that = this;
    if (data != null || checklist.isnotEmpty()) {
      axios.post('http://localhost/api/notes/'+this.state.user_id, {
          "title": title,
          "data": data,
          "is_checklist": checked,
          "checklist": checklist,
          "user_id":that.state.user_id
        })
        .then(function (response) {
          console.log('resp', response.data);
          let notearr = that.state.notes;
          console.log(notearr);
          notearr.push(response.data);
          that.setState({
            notes: notearr
          });
      
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  openEditPopup(){
    this.setState({isopenEditpopup:!this.state.isopenEditpopup});
  }

  submitEditedNote(editedNote) {
    console.log("Edited notesss", editedNote);
    let notes = this.state.notes;
    notes = notes.map((note) => {
      if (note.id == editedNote.id) {
        return editedNote;
      } else {
        return note;
      }
    });

    this.setState({
      notes: notes
    });
    this.setState({
      processing: true
    })
    axios.put('http://localhost/api/notes/' + editedNote.id, editedNote).then(function (response) {
      if (response.status = 200) {
        console.log("done successs fullly");
      }
    });

  }
  editNote(props) {
      let notes = clone(this.state.notes);
      var note = notes.filter(function (item) {
        if (item.id == props) {
          {
            return item
          };
        }
      });


    this.setState({
      editablenote: Object.assign({}, note[0])
    });

    this.openEditPopup();
  }
  deleteNote(props){    
    var arr=this.state.notes;
    
    console.log("dashboqard",arr);
    arr = arr.filter(item => item.id !== props);
    this.setState({notes:arr});
    console.log(arr);

    axios.delete('http://localhost/api/notes/'+props );
     
  }

  handleCheck(checkbox_id, note_id) {
    console.log("props of handle check", checkbox_id, note_id);


    let notes = this.state.notes.map((note) => {
      if (note.id == note_id) {
        note.checklist = note.checklist.map((checkbox) => {
          if (checkbox.id == checkbox_id) {
            checkbox.is_checked = !checkbox.is_checked;
            return checkbox;
          } else {
            return checkbox;
          }
        });
        axios.put('http://localhost/api/notes/' + note.id, note).then(function (response) {
          if (response.status = 200) {
            console.log("done successs fullly");
          }
        });
        return note;
      } else {
        return note;

      }

    });
    this.setState({
      notes: notes
    });
  }

 
  render (){ 

    return(
      <div className="main-area">
        
        <EditNote  
            note={this.state.editablenote} 
            open={this.state.isopenEditpopup} 
            openEdit={this.openEditPopup.bind(this)}
            submitEditedNote={this.submitEditedNote.bind(this)}
            />
          <Card addnote={this.addnote.bind(this)}/>
          <Note 
            notes={this.state.notes} 
            delete={this.deleteNote.bind(this)} 
            edit={this.editNote.bind(this)}
            handleCheck={this.handleCheck.bind(this)}/>
        </div>


      );
    }
}


export default Dashboard;