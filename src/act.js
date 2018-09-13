// This will be our file to implement our own React.js — called Act.js
import { isClass } from './helpers.js';

const Act = {
  createElement(element, ...children) {
    // Check if element is a functional component (a function)
    // and return the application of the function

    // TODO:
    // Additionally check if the element is a javascript class and if so,
    // invoke the constructor using 'new' and return the instance's
    // application of render()
    // HINT:
    // You can use isClass from the helpers.js module to check for classes
    if (typeof element === 'function') {
      return element();
    } else if (typeof element === 'string') {
      // else return the code below for the ability to create
      // default DOM node elements further on.
      const el = document.createElement(element);

      // Iterate over children and check the element type of each:
      // Object (originated from Act.createElement) or String
      children.forEach(child => {
        if (typeof child === 'object') {
          // An object indicates a DOM node, we need to use 'appendChild'
          el.appendChild(child);
        } else {
          // Otherwise the child should be a simple string, we need
          // to append to the inner HTMl of the element
          el.innerHTML += child;
        }
      });
      return el;
    }
  }
};

const ActDOM = {
  render(element, rootElement) {
    // Append element as a child to the rootElement
    rootElement.appendChild(element);
  }
};

export { Act, ActDOM };

