// This will serve as a playground to test and try out our implementation
// of React.js

// --- Exercise 01/DOM elements
// We separate Act.js into two modules:
// 1. Act:    Implements the basic creation of elements
// 2. ActDOM: Implements DOM manipulation logic
import { Act, ActDOM } from './act.js';

// We have to first find the root element
// Act.js uses this to render it's created DOM tree into.
const root = document.querySelector('#mount');

// Act should provide a function called 'createElement'
// this function should have two arguments:
// 1. element - A string that should represent default HTML tags (div, button h1)
// 2. children - A string that should act as the content of the element
const firstElement = Act.createElement('div', null, 'Hello Act.js!');

// ActDOM should provide a function called 'render' which takes an element
// created by Act (using the above createElement function) and a root DOM node
// which we queried above ↑
ActDOM.render(firstElement, root);

// --- Exercise 02/Stateless Components
// We also want to be able to create custom elements (aka. Web Components)
// at first without any kind of state or interactivity. In the React world
// these kind of components are also called 'Functional Components' because
// they are basically just a function that create some bundled elements:
const Title = function() {
  return Act.createElement('h1', null, 'A Stateless Title');
};
const title = Act.createElement(Title);
ActDOM.render(title, root);

// --- Exercise 03/Render children
// Functional stateless components can also be written using arrow functions:
const SendButton = () => Act.createElement('button', null, 'Send');

const ContactForm = () => {
  // Simple strings
  const message = 'Please contact us:';
  // Default DOM nodes as created by Act.js
  const nameInput = Act.createElement('input');
  const mailInput = Act.createElement('input');
  // Stateless components as created by Act.js
  const button = Act.createElement(SendButton);

  // Return a div that has several children of different type, as defined above
  return Act.createElement('div', null, message, nameInput, mailInput, button);
};
const contactForm = Act.createElement(ContactForm);
ActDOM.render(contactForm, root);

// --- Exercise 04/Class components
// As ES6 (Javascript) introduced the OO oriented concept of classes, React.js
// also supports components that are build using this concept.

// Act.js should also implement class components
// A class component should look as follows:

// It should inherit the Act.Component class
class Counter {
  // It should implement a render method
  // that uses Act.createElement
  render() {
    // We build a (not yet functional) structure to implement a counter
    const title = Act.createElement('h1', null, 'A Counter');
    const minusButton = Act.createElement('button', null, '-');
    const plusButton = Act.createElement('button', null, '+');
    const value = Act.createElement('h3', null, 0);
    return Act.createElement(
      'div',
      null,
      title,
      minusButton,
      value,
      plusButton
    );
  }
}
const firstCounter = Act.createElement(Counter);
ActDOM.render(firstCounter, root);

// --- Exercise 05/Properties
// React implements the concept of 'properties' (aka. props)

// Properties are a way to pass in additional
// like data, css classNames, eventHandlers
const ProppedTitle = ({ text }) => {
  return Act.createElement('h1', null, `A ${text} Title`);
};

// To have properties passed to Act, we extend the createElement signature
// with an additional parameter. Notice that we had to change all the other
// calls to Act.createElement above and pass in 'null' as props.
const niceTitle = Act.createElement(ProppedTitle, { text: 'nice' }, null);
ActDOM.render(niceTitle, root);

// Class components need to use the constructor to pass in properties.
// To ensure a predefined API, we will create a super class 'Act.Component'
class ProppedButton extends Act.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return Act.createElement('button', null, `Olà, Sr. ${name}`);
  }
}
const proppedButton = Act.createElement(ProppedButton, {
  name: 'Simon'
});
ActDOM.render(proppedButton, root);

// --- Exercise 06/Attributes
// As DOM nodes also may have attributes such as class names, event listeners
// and so on, Act (React does) should implement these concepts:
class WorkingButton extends Act.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, className, onClick } = this.props;
    return Act.createElement(
      'button',
      // Attributes are passed via props
      {
        className: className,
        onClick: onClick
      },
      `Working Button: ${text}`
    );
  }
}
const workingButton = Act.createElement(WorkingButton, {
  text: 'Click',
  className: 'button-primary',
  onClick: () => alert("It's working!")
});
ActDOM.render(workingButton, root);

// --- Exercise 07/State
// React components get data passed in via properties. The real power
// of react comes when using local state in components.
// Only Stateful Class Components are capable of using state:
class CountingCounter extends Act.Component {
  constructor(props) {
    super(props);
    // Define state as a simple object in your component class
    this.state = {
      value: 0
    };
  }

  decrement() {
    // TOOD:
    // Use your implementation of Act.Component's setState
    // function in order to update the state of this class component
    console.log(this.state.value);
    if (this.state.value !== 0)
      console.log('Success - checkout the next exercise!');
  }

  increment() {
    // TOOD:
    // Use your implementation of Act.Component's setState
    // function in order to update the state of this class component
    console.log(this.state.value);
    if (this.state.value !== 0)
      console.log('Success - checkout the next exercise!');
  }

  render() {
    // Destructure the classes state value
    const { value } = this.state;
    const title = Act.createElement('h1', null, 'A Working Counter');
    const subtractButton = Act.createElement(
      'button',
      {
        className: 'two columns',
        // Use .bind(this) on the event handlers of the class to
        // ensure a valid 'this' context. Otherwise we'd lose the 'this' context
        // of the class in the actual event handling function
        onClick: this.decrement.bind(this)
      },
      '-'
    );
    const valueText = Act.createElement(
      'h3',
      { className: 'three columns' },
      // Here we use the value from the state, as destructured above
      `Value: ${value}`
    );
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

