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
            editablenote: [],   
    };
    this.addnote=this.addnote.bind(this);
    this.deleteNote=this.deleteNote.bind(this);
    this.openEditPopup=this.openEditPopup.bind(this);
    this.EditNote=this.EditNote.bind(this);
    
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
 
  }


  EditNote(props){
   
    console.log("dsds",props);
    var notes=this.state.notes;
    var note=notes.filter(function(item)
      {
        if(item.id == props){
          { return item};
        }
      });

      console.log("selected note",note);
      console.log(this);

      this.setState({editablenote:note[0]});
      console.log("editable note",this.state.editablenote);
      
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


  addnote(title,data,checked,checklist){
    var that=this;
  if(data||checklist){
    axios.post('http://localhost/api/notes/', {
      "title":title,
      "data":data,
      "is_checklist":checked, 
      "checklist":checklist
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
    });}
  }
  render (){ //or ReactDOM.render()

    return(
      <div className="main-area">
        
        <EditNote  note={this.state.editablenote} open={this.state.isopenEditpopup} openEdit={this.openEditPopup.bind(this)}/>
          <Card addnote={this.addnote.bind(this)}/>
          <Note notes={this.state.notes} delete={this.deleteNote.bind(this)} edit={this.EditNote.bind(this)}/>
        </div>


      );
    }
}


export default Dashboard;