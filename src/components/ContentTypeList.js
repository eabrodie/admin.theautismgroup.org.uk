import React, {Component, PropTypes} from 'react';
import request from 'then-request';

class ContentTypeList extends Component {
  state = {existingFiles:[]};

  componentDidMount () {
    request('GET', '/get-content/' + this.props.params.contentType).getBody('utf8').then(JSON.parse).done(
      existingFiles => {
        this.setState({
          existingFiles: existingFiles
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
        <ul>
          {this.state.existingFiles.map(file => {
            return <li key={file.id}><a href={'/' + this.props.params.contentType + '/' + file.id + '/edit'}>{file.title}</a></li>;
          })}
        </ul>
      </div>
    )
  }
}

export default ContentTypeList;
