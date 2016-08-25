import React, {Component, PropTypes} from 'react';
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

  render() {
    return (
      <div>
        <ul>
          {this.state.content.map(contentType => {
            return <li key={contentType.id}><a href={contentType.id +'/new'}>Add new {contentType.content.name}</a></li>;
          })}
        </ul>
      </div>
    )
  }
}

export default App;
