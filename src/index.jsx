import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './index.css';

import Cards from './Whether/Cards/Cards';
import Header from "./Header/Header";
import Home from "./Home/Home";
import Board from "./Retrospective/Board/Board";
import Todos from "./Todos/TodoList/Todos";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Header />
          <Switch>
              <Route path="/whether">
                  <Cards />
              </Route>
              <Route path="/retro">
                  <Board />
              </Route>
              <Route path="/todo">
                  <Todos />
              </Route>
              <Route path="/">
                  <Home />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.querySelector('#root')
)

