import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import Delete  from 'material-ui/svg-icons/action/delete';

/**
 * Three controlled examples, the first allowing a single selection, the second multiple selections,
 * the third using internal state.
 */
export default class NoteManu extends Component {
  constructor(props) {
    super(props);
    this.state  = {
    valueSingle: '3',
    valueMultiple: ['3', '5'],
  };
  this.deleteNote=this.deleteNote.bind(this);
}


deleteNote(){
 console.log("called from note menu",this.props.id);
 this.props.delete(this.props.id);
}

  handleChangeSingle(event, value){
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple(event, value){
    this.setState({
      valueMultiple: value,
    });
  };

  handleOpenMenu(){
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value){
    this.setState({
      openMenu: value,
    });
  }

  render() {
    return (
      <div className="bottom-menu">
        <IconButton><Delete onClick={this.deleteNote.bind(this)}/></IconButton>
        
      </div>
    );
  }
}