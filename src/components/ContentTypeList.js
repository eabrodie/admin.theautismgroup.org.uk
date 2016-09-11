import React, {Component, PropTypes} from 'react';
import request from 'then-request';

class ContentTypeList extends Component {
  state = {
    existingFiles:null,
    contentType: null
  };

  componentDidMount () {
    request('GET', '/get-content/' + this.props.params.contentType).getBody('utf8').then(JSON.parse).done(
      existingFiles => {
        this.setState({
          existingFiles: existingFiles
        });
      },
      err => console.log(err)
    );
    request('GET', '/content-types').getBody('utf8').then(JSON.parse).done(
      contentTypes => {
        contentTypes.forEach(contentType => {
          if (contentType.id === this.props.params.contentType) {
            this.setState({
              contentType: contentType
            });
          }
        })
      },
      err => console.log(err)
    );
  }

  _renderListItems () {
    return this.state.existingFiles.map(file => {
      return <li key={file.id}><a href={'/' + this.props.params.contentType + '/' + file.id + '/edit'}>{file.id}</a></li>;
    })
  }


  render() {
    if (this.state.contentType === null || this.state.existingFiles === null) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <div>
        <h1>{this.props.params.contentType}</h1>
        {
          (this.state.contentType.canCreate === false)
          ? null
          : <a href={'/' + this.props.params.contentType + '/new'}>Add new {this.props.params.contentType}</a>
        }
        <ul>
          {this._renderListItems()}
        </ul>
      </div>
    )
  }
}

export default ContentTypeList;
