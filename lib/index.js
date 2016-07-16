'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementById('container');

var Clock = _react2.default.createClass({
  displayName: 'Clock',

  getInitialState: function getInitialState() {
    return {
      now: new Date().toString()
    };
  },

  componentDidMount: function componentDidMount() {
    this._interval = setInterval(function () {
      this.setState({
        now: new Date().toString()
      });
    }.bind(this), 1000);
  },

  // componetWillMount is called when the component is about to be removed
  // from the DOM.
  //
  // It is important to dispose of anything that was created in
  // `componentDidMount`
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this._interval);
  },
  render: function render() {
    return _react2.default.createElement('p', {}, 'The time is: ', _react2.default.createElement('b', {}, this.state.now));
  }
});

_reactDom2.default.render(_react2.default.createElement(Clock, {}), container);