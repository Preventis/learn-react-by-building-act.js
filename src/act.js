// This will be our file to implement our own React.js — called Act.js
const root = document.querySelector('#mount');

const Act = {
  createElement(element, content) {
    // TODO:
    // Check if element is a functional component (a function)
    // and return the application of the function

    // else return the code below for the ability to create
    // default DOM node elements further on.
    const el = document.createElement(element);
    el.innerHTML = content;
    return el;
  }
};

const ActDOM = {
  render(element, rootElement) {
    // Append element as a child to the rootElement
    rootElement.appendChild(element);
  }
};

export { Act, ActDOM };

