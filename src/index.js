import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import request from 'then-request';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './components/App';
import ContentTypeList from './components/ContentTypeList';
import NewContent from './components/NewContent';
import EditContent from './components/EditContent';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:contentType" component={ContentTypeList} />
    <Route path="/:contentType/new" component={NewContent} />
    <Route path="/:contentType/:fileName/edit" component={EditContent} />
  </Router>
  ,
  container
);
