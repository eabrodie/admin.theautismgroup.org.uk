import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte-browserify';

class HTMLEditor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  constructor (props) {
    super(props);
    this.state = {
      richValue: RichTextEditor.createValueFromString(props.value, 'html'),
      htmlValue: props.value,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value != this.state.htmlValue) {
      this.setState({
        richValue: RichTextEditor.createValueFromString(newProps.value, 'html'),
        htmlValue: newProps.value,
      });
    }
  }

  onChange = (richValue) => {
    this.setState({richValue, htmlValue: richValue.toString('html')}, () => {
      this.props.onChange(this.state.htmlValue);
    });
  };




  render () {
    return (
      <RichTextEditor
        value={this.state.richValue}
        onChange={this.onChange}
      />
    );
  }
}

export default HTMLEditor;
