/*
On the new page, you want to load the details for the selected content type.
You can do this by making a request to the same API then looping through the array
to find the matching ID.  Then you can render a heading with the name of the
content type and a <form> element containing a <label> element for each of the fields
You can get a list of fields using Object.keys On the fields object
*/

import React, {Component, PropTypes} from 'react';
import request from 'then-request';
import Editor from './editors/Editor';

class NewContent extends Component {
  state = {contentType:null, fieldState:{}};

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

  _onChange = (name, value) => {
    this.setState({fieldState:{...this.state.fieldState, [name]:value}})
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
        <h1>{this.state.contentType.name}</h1>

        <form>
          {Object.keys(this.state.contentType.fields).map(key => {
            return (
              <Editor
                key={key}
                fieldName={key}
                type={this.state.contentType.fields[key]}
                value={this.state.fieldState[key]}
                onChange={this._onChange}
              />
            );
          })}
        </form>

      </div>
    )
  }
}

export default NewContent;
