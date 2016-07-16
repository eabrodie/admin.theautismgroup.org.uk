import React from 'react';
import ReactDOM from 'react-dom';

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
