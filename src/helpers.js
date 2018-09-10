const isClass = e => {
  const isFunction = typeof e === 'function';
  const isClass = /^class\s/.test(e.toString());
  return isFunction && isClass;
};

export { isClass };

