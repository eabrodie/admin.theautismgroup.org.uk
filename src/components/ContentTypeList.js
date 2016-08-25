import React, {Component, PropTypes} from 'react';
import request from 'then-request';

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

  render() {
    return (
      <div>
        <h1>{this.props.params.contentType}</h1>
        <h2>{this.state.content}</h2>//???
      </div>
    )
  }
}

export default ContentTypeList;
