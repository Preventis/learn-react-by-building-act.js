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
  // Setup a tag that we can use to mark our class components
  // and check for them in the ActDOM render-method
  ACT_TAG: 'ACT_CLASS_COMPONENT',

  handleClass(className, props, children) {
    // Increment the class counter of ActDOM
    ActDOM.classCacheCounter++;
    // Check if there is a cached class at the current ActDOM.classCacheCounter
    // index in ActDOM and return it if it exists
    const componentFromCache = ActDOM.classCache[ActDOM.classCacheCounter];
    if (componentFromCache !== undefined) {
      const foundComponent = ActDOM.classCache[ActDOM.classCacheCounter];
      // TODO:
      // Update the cached component's properties
      // const propsChanged = foundComponent.props !== props;
      // if (propsChanged) {
      //   foundComponent.props = props;
      // }
      return foundComponent;
    }
    // If no cached class component has been found, create a new instance
    // Set it's children property
    // tag it with your 'ACT_TAG' (e.g. using instance.type)
    const instance = new className(props);
    instance.children = children;
    instance.type = this.ACT_TAG;
    // Update the ActDOM classCache array at the current cache counter index
    // using the freshly created instance
    ActDOM.classCache[ActDOM.classCacheCounter] = instance;
    // Do not return the application of the render function
    // but return the instance itself, we will use the render
    // function later on
    return instance;
  },

  resolveChild(element, child) {
    if (child.type === this.ACT_TAG) {
      // TODO 1:
      // Recursively resolve the child by calling child.render()
    } else if (Array.isArray(child)) {
      // TODO 2:
      // If child as an array, recursively resolve all the children
    } else if (typeof child === 'object') {
      // An object indicates a DOM node, we need to use 'appendChild'
      element.appendChild(child);
    } else {
      // Otherwise the child should be a simple string, we need
      // to append to the inner HTMl of the element
      element.innerHTML += child;
    }
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
      const statlessComponent = element(properties);
      statlessComponent.type = this.ACT_TAG;
      return statlessComponent;
    } else {
      // else return the code below for the ability to create
      // default DOM node elements further on.
      const el = document.createElement(element);

      // Iterate over children and check the element type of each:
      // Object (originated from Act.createElement) or String
      children.forEach(child => {
        // NEW:
        // Refactored to resolveChild method
        this.resolveChild(el, child);
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

    // TODO:
    // Reset the classCacheCounter
    this.classCacheCounter = 0;

    // Trigger the render function for rootActElement on the rootDOMElement
    // to re-render the element. We use setTimeout here to illustrate the
    // process of hot swapping the element
    this.render(this.rootActElement, this.rootDOMElement);
  },

  render(element, rootElement) {
    // Set rootActElement and rootDOMElement according to the arguments
    this.rootActElement = element;
    this.rootDOMElement = rootElement;

    // Check if the rootActElement is tagged with the
    // above implemented ACT_TAG
    const isActClass = this.rootActElement.type === Act.ACT_TAG;

    // Use the above isActClass and distinguish between elements
    // that need to re-render and others
    // If rootActElement is tagged, you should first call it's render
    // method before appending it to the rootDOMElement
    if (isActClass) {
      rootElement.appendChild(element.render());
    } else {
      rootElement.appendChild(element);
    }
  }
};

export { Act, ActDOM };

