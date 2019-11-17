import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import docMatch from "./components/docMatching/docMatch";

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={docMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
