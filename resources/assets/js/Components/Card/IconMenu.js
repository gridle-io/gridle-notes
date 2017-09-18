import React, {Component} from 'react';
  import IconButton from 'material-ui/IconButton';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import List from 'material-ui/svg-icons/editor/format-list-numbered';
import EditText from 'material-ui/svg-icons/editor/mode-edit';

/**
 * Three controlled examples, the first allowing a single selection, the second multiple selections,
 * the third using internal state.
 */

class IconMenuAction extends Component{

  constructor(props){
    super(props);
    
    this.handleClick=this.handleClick.bind(this); 
  }


  handleClick(){
    console.log(this.props);
    this.props.handleChackedClick(); 
   }
  render(){


    return(
      <div className="add-menu">
        

        <IconButton tooltip="Check List" onClick={this.handleClick}>
          <List />
        </IconButton>

        <IconButton tooltip="New note with image">
      <InsertPhoto />
        </IconButton>

        <IconButton tooltip="New note with drawing">
      <EditText />
        </IconButton>
        </div>
    );
  }
}


export default IconMenuAction;
