import React, {Component, PropTypes} from 'react';
import request from 'then-request';

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
            return <li key={contentType.id}><a href={contentType.id}>{contentType.name}</a></li>;
          })}
        </ul>
      </div>
    )
  }
}

export default App;
