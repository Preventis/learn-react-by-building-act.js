// This will serve as a playground to test and try out our implementation
// of React.js
import { Act, ActDOM } from './act.js';

const root = document.querySelector('#mount');

// --- Exercise 11/Todo-App
const TodoItem = ({ text, index, onClick }) => {
  const textElement = Act.createElement(
    'h5',
    { className: 'columns six' },
    text
  );
  const removeButton = Act.createElement(
    'button',
    {
      className: 'columns two',
      onClick: onClick
    },
    'X'
  );
  return Act.createElement(
    'div',
    { className: 'row' },
    textElement,
    removeButton
  );
};

const TodoForm = ({ onClick }) => {
  const title = Act.createElement(
    'b',
    { className: 'columns two' },
    'New TODO: '
  );
  const inputForm = Act.createElement('input', { className: 'columns four' });
  const addButton = Act.createElement(
    'button',
    {
      className: 'columns two',
      onClick: onClick
    },
    'ADD'
  );
  return Act.createElement(
    'div',
    { className: 'row' },
    title,
    inputForm,
    addButton
  );
};

class TodoApp extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ text: 'Build react.js' }, { text: 'Finish this exercise' }]
    };
  }

  removeTodo(index) {
    console.log(index);
    const newTodos = this.state.todos.filter((t, i) => i != index);
    this.setState({ todos: newTodos });
  }

  addTodo(ev) {
    const target = ev.target;
    const inputText = target.parentNode.querySelector('input').value;
    const newTodos = this.state.todos.concat([{ text: inputText }]);
    this.setState({ todos: newTodos });
  }

  render() {
    const { todos } = this.state;
    const title = Act.createElement('h4', {}, 'Todos:');
    const todoElements = todos.map((todo, i) =>
      Act.createElement(
        TodoItem,
        { text: todo.text, onClick: this.removeTodo.bind(this, i) },
        ''
      )
    );
    const todoForm = Act.createElement(TodoForm, {
      onClick: this.addTodo.bind(this)
    });
    return Act.createElement(
      'div',
      { className: 'app' },
      title,
      todoForm,
      todoElements
    );
  }
}

ActDOM.render(Act.createElement(TodoApp), root);

