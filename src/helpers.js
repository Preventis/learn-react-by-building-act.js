const isClass = e => {
  const isFunction = typeof e === 'function';
  const isClass = /^class\s/.test(e.toString());
  return isFunction && isClass;
};

const isEventListener = propName => {
  return /^on.*$/.test(propName);
};

const getEvent = propName => {
  return propName.substring(2).toLowerCase();
};

export { isClass, isEventListener, getEvent };

