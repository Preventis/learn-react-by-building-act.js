// This will be our file to implement our own React.js — called Act.js
import { isClass, isEventListener, getEvent } from './helpers.js';

class Component {
  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.state = newState;
    ActDOM.reRender();
  }
}

const Act = {
  // TODO 1:
  // Setup a tag that we can use to mark our class components
  // and check for them in the ActDOM render-method
  ACT_TAG: undefined,

  handleClass(className, props, children) {
    // TODO 2:
    // Increment the class counter of ActDOM

    // TODO 3:
    // Check if there is a cached class at the current ActDOM.classCacheCounter
    // index in ActDOM and return it if it exists

    // TODO 4:
    // If no cached class component has been found, create a new instance
    // Set it's children property
    // tag it with your 'ACT_TAG' (e.g. using instance.type)
    const instance = new className(props);

    // TODO 5:
    // Update the ActDOM classCache array at the current cache counter index
    // using the freshly created instance

    // TODO 6:
    // Do not return the application of the render function
    // but return the instance itself, we will use the render
    // function later on
    return instance.render();
  },

  // The signature of createElement changed to three arguments
  // we now have properties passed in as the second one
  createElement(element, properties, ...children) {
    // Check if the element is a javascript class and if so,
    // invoke the constructor using 'new' and return the instance's
    // application of render()
    if (isClass(element)) {
      // Pass properties to the element constructor call
      // NEW:
      // We refactored the creation of class components
      // to the handleClass function
      return this.handleClass(element, properties, children);
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

      // Implement attribute resolution
      // 1. Check properties to be not null or undefined
      // 2. If properties is defined, check each property
      // 2a. If it's an event listener (HINT: use isEventListener helper)
      //     → Use .addEventListener on the element
      // 2b. If it's not an event listener
      //     → use .setAttribute on the element
      if (properties !== null && properties !== undefined) {
        Object.keys(properties).forEach(propName => {
          if (isEventListener(propName)) {
            const handler = properties[propName];
            el.addEventListener(getEvent(propName), handler);
          } else {
            const attributeValue = properties[propName];
            const fixedPropName = propName === 'className' ? 'class' : propName;
            el.setAttribute(fixedPropName, attributeValue);
          }
        });
      }

      return el;
    }
  },

  // We provide Act.Component from the class definition above ↑
  Component: Component
};

const ActDOM = {
  rootActElement: undefined,
  rootDOMElement: undefined,
  classCache: [],
  classCacheCounter: 0,

  reRender() {
    // As long as the global var rootDOMElement has child nodes
    // remove the last child
    while (this.rootDOMElement.hasChildNodes()) {
      const lastChild = this.rootDOMElement.lastChild;
      this.rootDOMElement.removeChild(lastChild);
    }

    // Reset the classCacheCounter
    this.classCacheCounter = 0;

    // Trigger the render function for rootActElement on the rootDOMElement
    // to re-render the element. We use setTimeout here to illustrate the
    // process of hot swapping the element
    setTimeout(() => {
      this.render(this.rootActElement, this.rootDOMElement);
    }, 200);
  },

  render(element, rootElement) {
    // Set rootActElement and rootDOMElement according to the arguments
    this.rootActElement = element;
    this.rootDOMElement = rootElement;

    // TODO 7:
    // Check if the rootActElement is tagged with the
    // above implemented ACT_TAG
    const isActClass = false;

    // TODO 8:
    // Use the above isActClass and distinguish between elements
    // that need to re-render and others
    // If rootActElement is tagged, you should first call it's render
    // method before appending it to the rootDOMElement
    rootElement.appendChild(element);
  }
};

export { Act, ActDOM };

