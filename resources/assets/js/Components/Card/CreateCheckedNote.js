import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import IconMenuAction from './IconMenu';
import NoteMenu from './NoteMenu';
import RaisedButton from 'material-ui/RaisedButton';
import ContentEditable from 'react-contenteditable';
import CheckListNote from './checkbox';
import Add from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {White,red500,grey300,grey200,grey500,Black}
from 'material-ui/styles/colors';

const styles={
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

class CreateNote extends Component {


    constructor(props) {
        super(props)
        this.state = {
            title:'',
            data: 'Write a note',
            done:this.props.click,
            checkdata:"",
            checklist:[]
                }   
    
                this.handleSubmit=this.handleSubmit.bind(this);
                this._handleEnter=this._handleEnter.bind(this);
                this.editingText=this.editingText.bind(this);
                this.handleTitleChange=this.handleTitleChange.bind(this);
                this.updateCheckStatus=this.updateCheckStatus.bind(this);
                

                
    }



    updateCheckStatus(key){
        console.log('key' ,key);
       
// key=1;
        console.log(this.state.checklist[key].is_checked);
        this.state.checklist[key].is_checked=!this.state.checklist[key].is_checked;
      this.forceUpdate();
        console.log(this.state.checklist[key]);
    }

    handleSubmit(event){    
        this.props.ToggleCreateCheckedNote(this.state.title,this.state.checklist);
        this.setState({title:"",data:"Write a note"});
        this.setState({checklist:[],checkdata:""});

        this.setState({done: !this.state.done});
        console.log(this.state);
    }

    
    handleTitleChange(evt){
        this.setState({ title: evt.target.value });
            
    }

      editingText(event){
        this.setState({
          checkdata: event.target.value,
        });
        console.log(this.state.checkdata);  
      }



      _handleEnter(e){
        if (e.key === 'Enter' && e.target.value != '')  {
             var data={
                  "label":e.target.value,
                  "is_checked":false
              }
            this.state.checklist.push(data);
            console.log(data);
            console.log("check box validation");
            console.log(this.state.checklist);
            this.setState({checkdata: ''});
            console.log('do validate');
        }
      }

    render(){

        const cardstyle = {
            width: 600,
         };
        
        return (
            <Paper style={cardstyle} zDepth={1} hidden={this.props.click}
                children={<div className="create-note">

                    <h3>
                        <TextField
                                hintText="Title"
                                fullWidth={true}
                                className="add-checkbox-data"
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                                underlineShow={false}
                                style={styles.textareaStyle}
                                hintStyle={styles.title}
                        
                         /> 
                       
                    </h3>
                                       
                        <Divider />
                        <div className="add-checkbox">
                        <Add color={red500}/>
                        <TextField
                            hintText="Add Checkbox"
                            fullWidth={true}
                            className="add-checkbox-data"
                            value={this.state.checkdata}
                            onChange={this.editingText.bind(this)}
                            onKeyPress={this._handleEnter.bind(this)}
                            underlineShow={false}
                           style={styles.textareaStyle}
                           hintStyle={styles.hintStyle}
                           



                         />
                        </div>
                        {this.state.checklist.map((data,i) => (
    
                            <CheckListNote key={i} id={i} 
                                            label={data.label} 
                                            is_checked={data.is_checked} 
                                            update={this.updateCheckStatus.bind(this)}/>
                        ))}
                    
            


                    <div className="create-note-bottom">

                        <NoteMenu />
                        <RaisedButton label="Done" style={styles.buttonstyle} onClick={this.handleSubmit.bind(this)} />
                    </div>

                </div>}

            />
        );
    }

}



export default CreateNote;