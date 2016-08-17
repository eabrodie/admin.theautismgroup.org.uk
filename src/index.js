import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from 'react-rte-browserify';

class HTMLEditor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
};

class App extends Component {
  state = {value: '<p>My Page</p>'};

  _onChange = (value) => {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <HTMLEditor value={this.state.value} onChange={this._onChange} />
        <textarea
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            marginTop: 8,
          }}
          value={this.state.value}
          onChange={e => this._onChange(e.target.value)}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  container
);
