import React, {Component, PropTypes} from 'react';
import request from 'then-request';

class TextEditor extends Component {
  _onChange = e => {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input value={this.props.value} onChange={this._onChange} type="text" />
    )
  }
}

export default TextEditor;
