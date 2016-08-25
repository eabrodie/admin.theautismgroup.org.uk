import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import request from 'then-request';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './components/App';
import ContentTypeList from './components/ContentTypeList'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:contentType/new" component={ContentTypeList} />
  </Router>
  ,
  container
);
