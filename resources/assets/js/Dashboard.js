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
            editablenote: 'dsd',   
    };
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.openEditPopup=this.openEditPopup.bind(this);
    this.editNote=this.editNote.bind(this);
    
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
    this.setState({isopenEditpopup:!this.state.isopenEditpopup});
    console.log('opning,,,,edit',this.state.isopenEditpopup);
    this.forceUpdate();
  }


  editNote(props){
   
    
    var notes=this.state.notes;
    var note=notes.filter(function(item)
      {
        if(item.note_id == props){
          { return item};
        }
      });

      console.log("selected note",note[0]);
      console.log(this);

      this.setState({editablenote:note[0]});
      console.log("editable note",this.state.editablenote);
      
      this.openEditPopup();
 
  }
  deleteNote(props){
    var arr=this.state.notes;
    arr = arr.filter(item => item.note_id !== props);
    this.setState({notes:arr});
    console.log(arr);
    console.log('delete this note -->>>>>>',props);
    axios.delete('http://localhost/api/notes/'+props );
     
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
        
        <EditNote  note={this.state.editablenote} open={this.state.isopenEditpopup} openEdit={this.openEditPopup.bind(this)}/>
          <Card addnote={this.addnote.bind(this)}/>
          <Note notes={this.state.notes} delete={this.deleteNote.bind(this)} edit={(key)=>{this.editNote(key)}}/>
        </div>


      );
    }
}


export default Dashboard;