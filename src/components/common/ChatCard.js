import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import People from 'material-ui/svg-icons/social/people';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {ChatBadge, Message} from './';

class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      socket: props.socket.connect(process.env.SOCKET_URL || window.location.hostname),
      newMessages: 0,
      chatMessage: '',
      chatMessages: [],
      users: {},
      isTyping: null,
      allUsers: []
    }
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }

  componentWillMount() {
    this.state.socket.emit('newUser', {username: this.state.username});
    this.state.socket.on('getAllChats', (data) => {
      this.setState({chatMessages: data});
      console.log(this.state.chatMessages);
    });
    this.state.socket.on('newMessages', (data) => {
      this.setState({newMessages: data});
    });
  }

  componentDidMount() {
    this.state.socket.on('users', (data) => {
      this.setState({users: data});
      this.setState({allUsers: data.allUsers});
      console.log(data);
    });
  }

  getValue(e) {
    var elem = document.getElementById('chatWindow');
    elem.scrollTop = elem.scrollHeight;
    this.state.socket.emit('typing', {username: this.state.username});
    this.state.socket.on('typing', (data) => {
      this.setState({isTyping: data.username})
    });
    if (e.target.value !== '') {
      this.setState({chatMessage: e.target.value});
    } else {
      this.state.socket.emit('typing', {username: null});
    }
  }

  sendChatMessage(e) {
    var elem = document.getElementById('chatWindow');
    elem.scrollTop = elem.scrollHeight;
    if (this.state.chatMessage) {
      const structure = {
        user: this.state.username,
        message: this.state.chatMessage
      }
      this.state.socket.emit('message', structure);
      this.state.chatMessages.push(structure);
      this.setState({chatMessage: ''});
      $('#text-field-default').val('');
    }
  }

  clearNotifications() {
    this.setState({newMessages: 0});
  }

  render() {
    $(document).keypress(function(e) {
      if (e.which === 13) {
        $('#submitChatMessage').click();
      }
    });
    if ($('#text-field-default').val() === '') {
      $('#chip').hide();
    } else {
      $('#chip').show();
    }
    return (
      <Card style={{
        backgroundColor: 'white',
        color: 'black',
        overflow: 'auto'
      }}>
        <CardHeader title="ChatRoom" subtitle={this.state.username} showExpandableButton={false}/>
        <div style={{
          display: 'inline-block'
        }}>
          <IconMenu iconButtonElement={<IconButton> <MoreVertIcon/> </IconButton>} anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom'
          }} targetOrigin={{
            horizontal: 'left',
            vertical: 'bottom'
          }}>
            <div style={{
              textAlign: 'top',
              marginLeft: '30px',
              marginBottom: '20px'
            }} onClick={this.clearNotifications}>
              <ChatBadge newMessages={this.state.newMessages}/>
            </div>
          </IconMenu>
          <IconMenu iconButtonElement={<IconButton> <People/> </IconButton>} anchorOrigin={{
            horizontal: 'left',
            vertical: 'top'
          }} targetOrigin={{
            horizontal: 'left',
            vertical: 'top'
          }} maxHeight={200}>
            {this.state.allUsers.map((user, index) => {
              return (<MenuItem key={index} primaryText={user}/>);
            })
}
          </IconMenu>
        </div>
        <CardText id="chatWindow" style={{
          overflow: 'auto',
          maxHeight: '36vh'
        }}>
          {this.state.chatMessages.map((item, index) => {
            return (
              <div key={index}>
                <Message message={item.message} username={item.user}/>
                <br/>
              </div>
            );
          })
}
          {(this.state.isTyping !== null)
            ? <Chip id="chip" style={{
                margin: 4
              }}>
                {`  ${this.state.isTyping} is typing...  `}
              </Chip>
            : ''}
        </CardText>
        <CardActions>
          <TextField hintText="Message Field" floatingLabelText="Send Message" multiLine={false} rows={2} fullWidth={true} id="text-field-default" onChange={this.getValue.bind(this)} hintStyle={{
            color: '#566573'
          }}/>

          <RaisedButton id="submitChatMessage" onClick={this.sendChatMessage} label="Send" primary={true} style={{
            margin: 12
          }}/>
        </CardActions>
      </Card>
    );
  }
}

export {ChatCard};
