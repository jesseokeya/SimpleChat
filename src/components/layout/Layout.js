import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import {ChatAppBar, ChatCard} from '../common';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      invalid: true,
      open: true,
      socket: props.socket
    }
    this.registerUsername = this.registerUsername.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  updateUsername(e) {
    this.setState({username: e.target.value});
  }

  registerUsername() {
    (this.state.username !== '')
      ? this.setState({invalid: false})
      : this.setState({invalid: true});
  }

  render() {
    $(document).keypress(function(e) {
      if (e.which === 13) {
        $('#submitUsername').click();
      }
    });
    return (
      <div>
        <ChatAppBar title={'SimpleChat'}/>
        <br/> {(this.state.invalid)
          ? <div>
              {(!this.state.open)
                ? <div style={{
                    textAlign: 'center'
                  }}>
                    <p style={{
                      fontSize: '24px'
                    }}>
                      You Have To Register A Username To Chat
                    </p>
                    <RaisedButton id="submitUsername" label="Add Username" onClick={this.handleOpen} style={{
                      margin: '1%'
                    }}/>
                  </div>
                : ''}
              <Dialog modal={false} open={this.state.open} onRequestClose={this.handleClose}>

                <TextField floatingLabelText="SimpleChat" hintText="Enter A Username" fullWidth={true} onChange={this.updateUsername.bind(this)}/>
                <RaisedButton id="submitUsername" onClick={this.registerUsername} label="Submit" primary={true} style={{
                  marginTop: 12
                }}/>

              </Dialog>
            </div>
          : <ChatCard socket={this.state.socket} username={this.state.username}/>}
      </div>
    );
  }
}

export default Layout;
