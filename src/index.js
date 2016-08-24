import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import request from 'then-request';
import { Router, Route, Link, browserHistory } from 'react-router';


class App extends Component {
  state = {value: '<p>My Page</p>',
            content:[]};

  componentDidMount () {
    request('GET', '/content-types').getBody('utf8').then(JSON.parse).done(
      items => {
        this.setState({
          content: items
        });
      },
      err => console.log(err)
    );
  }
  /*
  <pre>
    <code>
      {JSON.stringify(this.state, null, '  ')}
    </code>
  </pre>
  */

  render() {
    return (
      <div>
        <ul>
          {this.state.content.map(contentType => {
            return <li key={contentType.id}><a href={contentType.id}>{contentType.content.name}</a></li>;
          })}
        </ul>
      </div>
    )
  }
}

class ContentTypeList extends Component {
  state = {value: '<p>My Page</p>',
            content:[]};

  componentDidMount () {
    request('GET', '/content-types').getBody('utf8').then(JSON.parse).done(
      items => {
        this.setState({
          content: items
        });
      },
      err => console.log(err)
    );
  }
  /*
  <pre>
    <code>
      {JSON.stringify(this.state, null, '  ')}
    </code>
  </pre>
  */

  /*
  create new link for types contentType/new and addpage to router

  add components folder into src
  put each component in separate file
  export default *named variable* then import *component* from *relative path*


  */

  render() {
    return (
      <div>
        <h1>{this.props.params.contentType}</h1>
      </div>
    )
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:contentType" component={ContentTypeList} />
  </Router>
  ,
  container
);
