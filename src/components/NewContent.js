/*
On the new page, you want to load the details for the selected content type.
You can do this by making a request to the same API then looping through the array
to find the matching ID.  Then you can render a heading with the name of the
content type and a <form> element containing a <label> element for each of the fields
You can get a list of fields using Object.keys On the fields object
*/

import React, {Component, PropTypes} from 'react';
import request from 'then-request';

class NewContent extends Component {
  state = {contentType:null};

  componentDidMount () {
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

  render() {
    if (this.state.contentType === null) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <div>
        <ul>
            <li key={this.state.contentType.id}><a href={this.state.contentType.id}>{this.state.contentType.content.name}</a></li>
        </ul>
        <h1>{this.state.contentType.content.name}</h1>
        {Object.keys(this.state.contentType.content.fields)}
      </div>
    )
  }
}

export default NewContent;
