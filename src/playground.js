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
const firstElement = Act.createElement('div', 'Hello Act.js!');

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
  return Act.createElement('h1', 'A Stateless Title');
};
const title = Act.createElement(Title, null);
ActDOM.render(title, root);

// --- Exercise 03/Render children
// Functional stateless components can also be written using arrow functions:
const SendButton = () => Act.createElement('button', 'Send');

const ContactForm = () => {
  // Simple strings
  const message = 'Please contact us:';
  // Default DOM nodes as created by Act.js
  const nameInput = Act.createElement('input');
  const mailInput = Act.createElement('input');
  // Stateless components as created by Act.js
  const button = Act.createElement(SendButton);

  // Return a div that has several children of different type, as defined above
  return Act.createElement('div', message, nameInput, mailInput, button);
};
const contactForm = Act.createElement(ContactForm, null);
ActDOM.render(contactForm, root);

