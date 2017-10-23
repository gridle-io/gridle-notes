import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import IconMenuAction from './IconMenu';
import CreateNote from './CreateNote';
import CreateCheckedNote from './CreateCheckedNote'

const style = {
  height: 50,
  width: 600
};
export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCreateNote: true,
      checked: true
    }

    this.ToggleCreateNote = this.ToggleCreateNote.bind(this);
    this.handleChackedClick = this.handleChackedClick.bind(this);
    this.ToggleCreateCheckedNote = this.ToggleCreateCheckedNote.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    this.setState({
      isCreateNote: !this.state.isCreateNote
    });
  }

  ToggleCreateNote(title, data) {


   
    console.log(data);
    if (data) {
      this.props.addnote(title, data,0,[]);
    }
    this.setState({
      isCreateNote: !this.state.isCreateNote
    });

  }
  ToggleCreateCheckedNote(title, checklist) {

    if (checklist.length) {
      
      console.log('checklist from card',checklist);
      this.props.addnote(title,'', 1, checklist);
    }
    this.setState({
      checked: !this.state.checked
    });
    // console.log('this here+++++++++++++++');

  }
  handleChackedClick() {
    console.log("Checked mode");
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {

    return (
      <div>

        <div className="add-note">
          <Paper
            style={style}
            zDepth={1}
            hidden={!this.state.isCreateNote || !this.state.checked}
            children={< div className = "add-note-data" > 
                          <h3 onClick={this.handleClick.bind(this)}>Take a note ...</h3> 
                          < IconMenuAction 
                          handleChackedClick = {this.handleChackedClick.bind(this)} />
                      </div>}
            />

          <CreateNote
            click={this.state.isCreateNote}
            ToggleCreateNote={this.ToggleCreateNote.bind(this)}/>

          <CreateCheckedNote
            click={this.state.checked}
            ToggleCreateCheckedNote={this.ToggleCreateCheckedNote.bind(this)}/>

        </div>

      </div>
    );
  }
}
