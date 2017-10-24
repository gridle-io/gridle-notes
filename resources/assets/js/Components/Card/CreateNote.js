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
        super(props);
        this.state = {
            title:"",
            data: "",
            done:this.props.click,
            firstTimeFocus: false
        }   
        this.focus = this.focus.bind(this);
        this.handleDataChange=this.handleDataChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        
    }


    focus() {
        this.input.focus();
    }
    

    handleSubmit(event){
                 
                        this.props.ToggleCreateNote(this.state.title,this.state.data);
                        this.setState({title:"",data:""})
                        this.setState({done: true})
                        this.setState({firstTimeFocus: false})
                        console.log(this.state);

    
    }

    
    handleTitleChange(evt){
        this.setState({ title: evt.target.value });  
    }

    handleDataChange(evt){
        this.setState({ data: evt.target.value });
    }

    render() {

        const cardstyle = {
            width: 600,
         };
        
        const focusUsernameInputField = input => {
            
            if (input && !this.props.click && !this.state.firstTimeFocus) {
                setTimeout(() => {
                    input.focus();
                    this.state.firstTimeFocus = true;
                }, 100);
            }
        };
        return (
            <Paper style={cardstyle} zDepth={1} hidden={this.props.click}
                children={<div className="create-note">

                    
                    <h3>
                        <TextField
                                ref='title'
                                hintText="Title"
                                fullWidth={true}
                                className="add-checkbox-data"
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                                onKeyPress={this._handleEnter}
                                underlineShow={false}
                                style={styles.textareaStyle}
                                hintStyle={styles.title}
                        /> 
                       
                    </h3>           
                    <h3>
                        <TextField

                                
                        ref={focusUsernameInputField}
                                hintText="Write a note"
                                fullWidth={true}
                                className="add-checkbox-data"
                                value={this.state.data}
                                onChange={this.handleDataChange.bind(this)}
                                onKeyPress={this._handleEnter}
                                underlineShow={false}
                                style={styles.textareaStyle}
                                hintStyle={styles.title}
                        
                         /> 
                       
                    </h3>                  
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