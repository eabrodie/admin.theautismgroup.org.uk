import React, {Component, PropTypes} from 'react';
import request from 'then-request';

class ContentTypeList extends Component {
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
        <h1>{this.props.params.contentType}</h1>
        <a href={'/' + this.props.params.contentType + '/new'}>Add new {this.props.params.contentType}</a>
      </div>
    )
  }
}

export default ContentTypeList;
