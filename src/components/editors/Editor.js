import React, {Component, PropTypes} from 'react';
import TextEditor from './TextEditor';
import HTMLEditor from './HTMLEditor';

class Editor extends Component {
  _onChange = (value) => {
    this.props.onChange(this.props.fieldName, value)
  }

  _renderInput() {
    switch (this.props.type) {
      case "text":
        return <TextEditor value={this.props.value} onChange={this._onChange} />
      case "html":
        return <HTMLEditor value={this.props.value} onChange={this._onChange} />
      default:
        throw new Error('Unexpected type ' + this.props.type)
    }
  }
  render() {
    return (
      <div>
        <label>{this.props.fieldName}</label>
        {this._renderInput()}
      </div>
    )
  }
}

export default Editor;
