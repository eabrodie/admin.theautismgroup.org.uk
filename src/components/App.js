import React, {Component, PropTypes} from 'react';
import request from 'then-request';
import {Link} from 'react-router';

class App extends Component {
  state = {contentTypes:[]};

  componentDidMount () {
    request('GET', '/content-types').getBody('utf8').then(JSON.parse).done(
      contentTypes => {
        this.setState({
          contentTypes: contentTypes
        });
      },
      err => console.log(err)
    );
  }

  render() {
    return (
      <div>
      Select a type of content to edit:
        <ul>
          {this.state.contentTypes.map(contentType => {
            return <li key={contentType.id}><Link to={contentType.id}>{contentType.name}</Link></li>;
          })}
        </ul>
      </div>
    )
  }
}

export default App;
