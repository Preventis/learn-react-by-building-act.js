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
    const heading = Act.createElement('h1', null, 'A Counter');
    const minusButton = Act.createElement('button', null, '-');
    const plusButton = Act.createElement('button', null, '+');
    const value = Act.createElement('h3', null, 0);
    return Act.createElement('div', null, minusButton, value, plusButton);
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
const styledButton = Act.createElement(ProppedButton, {
  name: 'Simon'
});
ActDOM.render(styledButton, root);

