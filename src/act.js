// This will be our file to implement our own React.js — called Act.js
const root = document.querySelector('#mount');

const Act = {
  createElement(element, content) {
    console.log('Please implement the creation of elements');
    // TODO:
    // Make use of document.createElement to create a DOM node
    // of the argument type 'element'.

    // TODO:
    // Add content to the above created node

    // TODO:
    // Then return the above element
  }
};

const ActDOM = {
  render(element, rootElement) {
    console.log('Please implement the rendering');
    // TODO:
    // Append element as a child to the rootElement
  }
};

export { Act, ActDOM };

