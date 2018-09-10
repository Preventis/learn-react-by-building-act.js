// This will be our file to implement our own React.js — called Act.js
const root = document.querySelector('#mount');

const greet = () => {
  const rootFound =
    root === null
      ? "<div id='mount' /> is missing"
      : 'Nice - You setup everything!';
  console.log(`Hello from Act.js — ${rootFound}`);
};

export default () => greet();

