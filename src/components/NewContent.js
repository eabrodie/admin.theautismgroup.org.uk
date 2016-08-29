import React, {Component, PropTypes} from 'react';
import request from 'then-request';
import Editor from './editors/Editor';
import {browserHistory} from 'react-router';

class NewContent extends Component {
  state = {contentType:null,
    fieldState:{contentType:this.props.params.contentType},
    submitState:null
  };

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

  _onSubmit = (e) => {
    e.preventDefault();
    if (this.state.fieldState.title) {
      this.setState({submitState:'Saving'});
      request('POST', '/create/', {
          json: this.state.fieldState
      }).getBody().then(JSON.parse).done(
        (res)=> {
          if (res.success) {
            browserHistory.push('/'+ this.props.params.contentType);
          } else {
            this.setState({submitState:res.message})
          }
        },
        ()=>this.setState({submitState:'Error: Something went wrong. File not saved'})
      );
    } else {
      this.setState({submitState:'Error: Title is required'})
    }
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

        <form onSubmit={this._onSubmit}>
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

          <button type='submit'>Save</button> {this.state.submitState}
        </form>

      </div>
    )
  }
}

export default NewContent;
