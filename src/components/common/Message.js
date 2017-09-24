import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

function handleTouchTap() {
  alert('You clicked the Chip.');
}

/**
 * Examples of Chips, using an image [Avatar](/#/components/font-icon), [Font Icon](/#/components/font-icon) Avatar,
 * [SVG Icon](/#/components/svg-icon) Avatar, "Letter" (string) Avatar, and with custom colors.
 *
 * Chips with the `onRequestDelete` property defined will display a delete icon.
 */
class Message extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const username = (props.username && props.username.length > 0)
      ? props.username.substring(0, 2)
      : '';
    this.state = {
      currentMessage: props.message,
      username: username
    };

  }

  render() {
    const {chip, wrapper} = styles;
    return (
      <div style={wrapper}>

        <Chip backgroundColor={blue300} onRequestDelete={handleRequestDelete} onClick={handleTouchTap} style={chip}>
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>
            {this.state.username}
          </Avatar>
          {this.state.currentMessage}
        </Chip>
        {
        // <Chip style={chip}>
        //   4:50pm
        // </Chip>
        }
      </div>
    );
  }
}

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

export {Message};
