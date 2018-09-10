// This will be our file to implement our own React.js — called Act.js
const root = document.querySelector('#mount');

const Act = {
  createElement(element, content) {
    // Make use of document.createElement to create a DOM node
    // of the argument type 'element'.
    const el = document.createElement(element);

    // Add content to the above created node
    el.innerHTML = content;

    // Then return the above element
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

