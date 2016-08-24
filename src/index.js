import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import request from 'then-request';


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

  /*
use arrow functions
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

ReactDOM.render(
  <App />,
  container
);
