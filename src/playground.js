// This will serve as a playground to test and try out our implementation
// of React.js
import { Act, ActDOM } from './act.js';

const root = document.querySelector('#mount');

// --- Exercise 08/Rerender-Part1
// As you may have noticed the updated state is set correctly but doesn't
// get propagated into the DOM and the webpage is not updated properly.
// The CountingCounter doesn't yet re-render when it's state or passed data
// changes.

// This is due to we haven't yet implemented one of React's core principles:
// Diffing the DOM structure.

// Currently we are only swapping the class component in act.js
// But we also have to check if the component should re-render

// You can now switch to act.js for implementing this feature
class ValueField extends Act.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;
    console.log(value);
    return Act.createElement(
      'h3',
      { className: 'three columns' },
      `Value: ${value}`
    );
  }
}

class CountingCounter extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  decrement() {
    this.setState({ value: this.state.value - 1 });
  }

  increment() {
    this.setState({ value: this.state.value + 1 });
  }

  render() {
    const { value } = this.state;
    const title = Act.createElement('h1', null, 'A Working Counter');
    const subtractButton = Act.createElement(
      'button',
      {
        className: 'two columns',
        onClick: this.decrement.bind(this)
      },
      '-'
    );
    const valueText = Act.createElement(ValueField, {
      value: value
    });
    const addButton = Act.createElement(
      'button',
      {
        className: 'two columns',
        onClick: this.increment.bind(this)
      },
      '+'
    );
    return Act.createElement(
      'div',
      { className: 'row' },
      title,
      subtractButton,
      valueText,
      addButton
    );
  }
}

const workingCounter = Act.createElement(CountingCounter);
ActDOM.render(workingCounter, root);

