// This will serve as a playground to test and try out our implementation
// of React.js

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

