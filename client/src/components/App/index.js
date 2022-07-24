import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


import Home from '../Home';
import Review from '../Review';
import Landing from '../Landing';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import Search from '../Search';
import Quiz from '../Quiz';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        <Route exact path="/" component={Landing}/>
	    </div>
      <div>
        <Route exact path="/review" component={Review}/>
	    </div>
      <div>
        <Route exact path="/search" component={Search}/>
	    </div>
      <div>
        <Route exact path="/quiz" component={Quiz}/>
	    </div>
	  </Router>
    );
  }
}

export default App;