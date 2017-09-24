import React, {Component} from 'react';
import {grey800} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import io from 'socket.io-client';
import Layout from './layout/Layout';


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800
  },
  appBar: {
    height: 50
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Layout socket={io}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
