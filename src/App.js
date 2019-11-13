import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing components.
import Main from './Main';



class App extends Component {
  
  state={
    seconds: 0,
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  resetTimer = () => {

  }


  render() {
    console.log(this.state.seconds, 'seconds');
    return (
      <Router>
        <Switch>
          <Main 
            seconds={ this.state.seconds }
            resetMethod={ this.resetTimer }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
