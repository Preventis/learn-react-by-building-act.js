// This will be our file to implement our own React.js — called Act.js
import { isClass, isEventListener } from './helpers.js';

// NEW:
// The Component class is defined to ensure a predefined API
// for component class construction. Users can subclass it to
// create their own class-based components
class Component {
  // TODO: implement passing props to the constructor
  constructor(props) {
    this.props = props;
  }
}

const Act = {
  // The signature of createElement changed to three arguments
  // we now have properties passed in as the second one
  createElement(element, properties, ...children) {
    // Check if the element is a javascript class and if so,
    // invoke the constructor using 'new' and return the instance's
    // application of render()
    if (isClass(element)) {
      // Pass properties to the element constructor call
      const instance = new element(properties);
      return instance.render();
    } else if (typeof element === 'function') {
      // Check if element is a functional component (a function)
      // and return the application of the function
      // pass properties to the creation of stateless function components
      return element(properties);
    } else {
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

      // TODO:
      // Implement attribute resolution
      // 1. Check properties to be not null or undefined
      // 2. If properties is defined, check each property
      // 2a. If it's an event listener (HINT: use isEventListener helper)
      //     → Use .addEventListener on the element
      // 2b. If it's not an event listener
      //     → use .setAttribute on the element
      if (properties !== null && properties !== undefined) {
        // HINT:
        // Use Object.keys to loop over all property names
        // HINT:
        // Use isEventListener helper
      }

      return el;
    }
  },

  // We provide Act.Component from the class definition above ↑
  Component: Component
};

const ActDOM = {
  render(element, rootElement) {
    // Append element as a child to the rootElement
    rootElement.appendChild(element);
  }
};

export { Act, ActDOM };

