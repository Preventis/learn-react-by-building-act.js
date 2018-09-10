// This will be our file to implement our own React.js — called Act.js
const root = document.querySelector('#mount');

const Act = {
  // TODO:
  // Rename argument 'content' to 'children', as we want to be
  // able to render not only one child and children of different type

  // HINT:
  // With the ES6 spread operator it's dead simple to get an argument
  // as an array - thus you don't have to implement any further argument parsing
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_operator
  createElement(element, content) {
    // Check if element is a functional component (a function)
    // and return the application of the function
    if (typeof element === 'function') {
      return element();
    } else {
      // else return the code below for the ability to create
      // default DOM node elements further on.
      const el = document.createElement(element);

      // TODO:
      // Iterate over children and check the element type of each:
      // Object (originated from Act.createElement) or String

      // TODO:
      // Distinguish between the child type and use .appendChild or
      // set .innerHTML of the above created element appropriate to the
      // child's type
      el.innerHTML = content;

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

