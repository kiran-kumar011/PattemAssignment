import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './Main';


class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Main />
        </Switch>
      </Router>
    );
  }
}

export default App;
