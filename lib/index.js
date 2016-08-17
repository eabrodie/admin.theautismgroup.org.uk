'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRteBrowserify = require('react-rte-browserify');

var _reactRteBrowserify2 = _interopRequireDefault(_reactRteBrowserify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
var container = document.getElementById('container');

var Clock = React.createClass({
  displayName: 'Clock',

  getInitialState: function () {
    return {
      now: (new Date()).toString()
    };
  },

  componentDidMount: function () {
    this._interval = setInterval(function () {
      this.setState({
        now: (new Date()).toString()
      });
    }.bind(this), 1000);
  },

  // componetWillMount is called when the component is about to be removed
  // from the DOM.
  //
  // It is important to dispose of anything that was created in
  // `componentDidMount`
  componentWillUnmount: function () {
    clearInterval(this._interval);
  },
  render: function () {
    return React.createElement(
      'p',
      {},
      'The time is: ',
      React.createElement(
        'b',
        {},
        this.state.now
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Clock, {}),
  container
);
*/

var MyStatefulEditor = function (_Component) {
  (0, _inherits3.default)(MyStatefulEditor, _Component);

  function MyStatefulEditor() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MyStatefulEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(MyStatefulEditor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      value: _reactRteBrowserify2.default.createEmptyValue()
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
      if (_this.props.onChange) {
        // Send the changes up to the parent component as an HTML string.
        // This is here to demonstrate using `.toString()` but in a real app it
        // would be better to avoid generating a string on each change.
        _this.props.onChange(value.toString('html'));
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MyStatefulEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactRteBrowserify2.default, {
        value: this.state.value,
        onChange: this.onChange
      });
    }
  }]);
  return MyStatefulEditor;
}(_react.Component);

MyStatefulEditor.propTypes = {
  onChange: _react.PropTypes.func
};
;

_reactDom2.default.render(_react2.default.createElement(MyStatefulEditor, {}), container);